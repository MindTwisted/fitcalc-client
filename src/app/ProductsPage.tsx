import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { Table, Icon, Input, Visibility, Button, Grid } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { boundSetLoading } from '../store/system/actions'
import { Languages, Product, Themes, User } from '../types/models'
import {
  getAllProducts,
  deleteProduct as deleteProductRequest,
  addProductToFavourites,
  removeProductFromFavourites
} from '../api/products'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input'
import useDebounce from '../hooks/useDebounce'
import useProductsPageState from '../hooks/useProductsPageState'
import ProductsPageTableRow from './ProductsPageTableRow'
import AddProductModal from './AddProductModal'
import { ConfirmData } from './Application'
import EditProductModal from './EditProductModal'
import ProductInfoModal from './ProductInfoModal'

type ProductsPageProps = {
  lang: Languages
  theme: Themes
  user: User
  mobile: boolean
  setLoading: typeof boundSetLoading
  setConfirmData: Dispatch<SetStateAction<ConfirmData>>
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  theme,
  user,
  mobile,
  setLoading,
  setConfirmData
}: ProductsPageProps) => {
  const {
    state: {
      products,
      productUnderEdit,
      productUnderViewing,
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
      setProductUnderEdit,
      setProductUnderViewing,
      updateProduct,
      deleteProduct,
      resetOffset,
      setSearch,
      resetSearch,
      setOffsetValue,
      setAddProductModalOpen
    } 
  } = useProductsPageState()
  
  const fetchProducts = async ({ name = '', offset = 0 } = {}, append: boolean = false) => {
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
  const handleDeleteProduct = async (product: Product) => {
    setConfirmData(null)
    setLoading(true)

    try {
      await deleteProductRequest(product)

      deleteProduct(product)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleConfirmDeleteProduct = (product: Product) => {
    setConfirmData({
      message: `${i18n.t('Delete product')} ${product.name} ?`,
      onConfirm: () => handleDeleteProduct(product)
    })
  }
  const handleAddProductToFavourites = async (product: Product) => {
    if (!product.id) {
      return
    }
    
    setLoading(true)
    
    try {
      await addProductToFavourites(product.id)
      
      updateProduct({
        ...product,
        inFavourites: true
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleRemoveProductFromFavourites = async (product: Product) => {
    if (!product.id) {
      return
    }
    
    setLoading(true)
    
    try {
      await removeProductFromFavourites(product.id)
      
      updateProduct({
        ...product,
        inFavourites: false
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
        <Grid.Column width={12}>
          <Input onChange={handleSearch}
            placeholder={i18n.t('Search')}
            icon={search ?
              (<Icon name='close'
                link
                onClick={handleClearSearch}
              />) : 'search'}
            value={search}
            fluid={mobile}
            aria-label={i18n.t('Search')}
          />
        </Grid.Column>
  
        <Grid.Column width={4}>
          <Button icon
            circular
            primary
            size='large'
            floated='right'
            onClick={() => setAddProductModalOpen(true)}
            aria-label={i18n.t('Add product')}
          >
            <Icon name='plus' />
          </Button>
        </Grid.Column>
      </Grid>
      
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{i18n.t('Name')}</Table.HeaderCell>
            {!mobile && (
              <React.Fragment>
                <Table.HeaderCell>{i18n.t('Proteins')}</Table.HeaderCell>
                <Table.HeaderCell>{i18n.t('Fats')}</Table.HeaderCell>
                <Table.HeaderCell>{i18n.t('Carbohydrates')}</Table.HeaderCell>
                <Table.HeaderCell>{i18n.t('Fiber')}</Table.HeaderCell>
              </React.Fragment>
            )}
            <Table.HeaderCell>{i18n.t('Calories')}</Table.HeaderCell>
            <Table.HeaderCell>
              <span style={{ display: 'none' }}>
                {i18n.t('In Favourites')}
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <span style={{ display: 'none' }}>
                {i18n.t('Actions')}
              </span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
        <Table.Body>
    
          {products.length ? (
            products.map(product => (
              <ProductsPageTableRow key={product.id}
                product={product}
                user={user}
                mobile={mobile}
                handleAddProductToFavourites={handleAddProductToFavourites}
                handleRemoveProductFromFavourites={handleRemoveProductFromFavourites}
                handleConfirmDeleteProduct={handleConfirmDeleteProduct}
                setProductUnderEdit={setProductUnderEdit}
                setProductUnderViewing={setProductUnderViewing}
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
  
      <EditProductModal theme={theme}
        open={Boolean(productUnderEdit)}
        product={productUnderEdit}
        onEditProduct={(product: Product) => updateProduct(product)}
        closeModal={() => setProductUnderEdit(null)}
      />

      <ProductInfoModal product={productUnderViewing}
        open={Boolean(productUnderViewing)}
        theme={theme}
        closeModal={() => setProductUnderViewing(null)}
      />
    </Visibility>
  )
}

export default ProductsPage