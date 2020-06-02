import React, { useCallback, useEffect } from 'react'
import { Table, Icon, Input, Visibility, Button, Grid } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { boundSetLoading } from '../store/system/actions'
import { Languages, Product, Themes } from '../types/models'
import { getAllProducts, GetAllProductsParams } from '../api/products'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input'
import useDebounce from '../hooks/useDebounce'
import useProductsPageState from '../hooks/useProductsPageState'
import ProductsPageTableRow from './ProductsPageTableRow'
import AddProductModal from './AddProductModal'

type ProductsPageProps = {
  lang: Languages
  theme: Themes
  setLoading: typeof boundSetLoading
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  theme,
  setLoading
}: ProductsPageProps) => {
  const {
    state: {
      products,
      offset,
      search,
      actions: {
        addProductModalOpen
      }
    },
    actionCreators: {
      setOffsetDone,
      appendProducts,
      prependProducts,
      setProducts,
      updateProduct,
      resetOffset,
      setSearch,
      resetSearch,
      setOffsetValue,
      setAddProductModalOpen
    } 
  } = useProductsPageState()
  
  const fetchProducts = async (
    { name, offset }: GetAllProductsParams = { name: '', offset: 0 },
    append: boolean = false
  ) => {
    setLoading(true)
  
    try {
      const productsResponse = await getAllProducts({ name, offset })
      const { products } = productsResponse.data.data
      
      if (products.length < 50) {
        setOffsetDone(true)
      }
    
      if (append) {
        appendProducts(products)
      } else {
        setProducts(products)
      }
    
      setLoading(false)
    } catch (error) {
      setLoading(false)
      
      throw error
    }
  }
  const fetchProductsDependencies = [setLoading, setOffsetDone, appendProducts, setProducts]
  const fetchProductsDebounced = useDebounce(fetchProducts, 500, fetchProductsDependencies)
  const fetchProductsCallback = useCallback(fetchProducts, fetchProductsDependencies)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    resetOffset()
    setSearch(data.value)
    fetchProductsDebounced({ name: data.value })
  }
  const handleClearSearch = () => {
    resetOffset()
    resetSearch()
    fetchProductsCallback()
  }
  const handleScrollBottom = async () => {
    if (offset.done) {
      return
    }
    
    const oldOffset = offset.value
    const newOffset = oldOffset + 50
  
    setOffsetValue(newOffset)
  
    try {
      await fetchProductsCallback({ name: search, offset: newOffset }, true)
    } catch (error) {
      setOffsetValue(oldOffset)
    }
  }
  
  useEffect(() => {
    fetchProductsCallback()
    
    return () => {
      resetSearch()
      resetOffset()
    }
  }, [fetchProductsCallback, lang, resetSearch, resetOffset])
  
  return (
    <Visibility once={false}
      onBottomVisible={handleScrollBottom}
    >
      <h1>{i18n.t('Products')}</h1>
  
      <Grid columns={2}>
        <Grid.Column>
          <Input onChange={handleSearch}
            placeholder={i18n.t('Search')}
            icon={search ?
              (<Icon name='close'
                link
                onClick={handleClearSearch}
              />) : 'search'}
            value={search}
          />
        </Grid.Column>
  
        <Grid.Column>
          <Button icon
            circular
            primary
            size='large'
            floated='right'
            onClick={() => setAddProductModalOpen(true)}
          >
            <Icon name='plus' />
          </Button>
        </Grid.Column>
      </Grid>
      
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{i18n.t('Name')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Proteins')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Fats')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Carbohydrates')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Fiber')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Calories')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('In Favourites')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
        <Table.Body>
    
          {products.length ? (
            products.map(product => (
              <ProductsPageTableRow key={product.id}
                product={product}
                setLoading={setLoading}
                updateProduct={updateProduct}
              />
            ))
          ) : (
            <Table.Row>
              <Table.Cell>
                {i18n.t('No products')}
              </Table.Cell>
            </Table.Row>
          )}
  
        </Table.Body>
      </Table>
      
      <AddProductModal theme={theme}
        open={addProductModalOpen}
        onAddProduct={(product: Product) => prependProducts(product)}
        closeModal={() => setAddProductModalOpen(false)}
      />
    </Visibility>
  )
}

export default ProductsPage