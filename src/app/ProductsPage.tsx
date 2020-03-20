import React, { useCallback, useEffect, useState } from 'react';
import { Table, Checkbox, Icon, Input, Visibility } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLoading } from '../store/system/actions';
import { Languages } from '../store/system/types';
import {
  addProductToFavourites,
  getAllProducts,
  GetAllProductsParams,
  ProductsResponse,
  removeProductFromFavourites
} from '../api/products';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import useDebounce from '../hooks/useDebounce';

type ProductsPageProps = {
  lang: Languages,
  setLoading: typeof boundSetLoading
};

const initialOffset = { value: 0, done: false };

const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  setLoading
}: ProductsPageProps) => {
  const [products, setProducts] = useState<Array<ProductsResponse>>([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  
  const fetchProducts = async (
    { name, offset }: GetAllProductsParams = { name: '', offset: 0 },
    appendProducts: boolean = false
  ) => {
    setLoading(true);
  
    try {
      const productsResponse = await getAllProducts({ name, offset });
      const { products } = productsResponse.data.data;
      
      if (products.length < 50) {
        setOffset(currentOffset => ({ ...currentOffset, done: true }));
      }
    
      if (appendProducts) {
        setProducts(currentProducts => [...currentProducts, ...products]);
      } else {
        setProducts(products);
      }
    
      setLoading(false);
    } catch (error) {
      setLoading(false);
      
      throw error;
    }
  };
  const fetchProductsDebounced = useDebounce(fetchProducts, 500, [setLoading, setProducts, setOffset]);
  const fetchProductsCallback = useCallback(fetchProducts, [setLoading, setProducts, setOffset]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setOffset(initialOffset);
    setSearch(data.value);
    fetchProductsDebounced({ name: data.value });
  };
  const handleClearSearch = () => {
    setOffset(initialOffset);
    setSearch('');
    fetchProductsCallback();
  };
  const handleScrollBottom = async () => {
    if (offset.done) {
      return;
    }
    
    const oldOffset = offset.value;
    const newOffset = oldOffset + 50;
  
    setOffset(currentOffset => ({ ...currentOffset, value: newOffset }));
  
    try {
      await fetchProductsCallback({ name: search, offset: newOffset }, true);
    } catch (error) {
      setOffset(currentOffset => ({ ...currentOffset, value: oldOffset }));
    }
  };
  const handleAddProductToFavourites = async (id: number) => {
    setLoading(true);
    
    try {
      await addProductToFavourites(id);
      
      setProducts(currentProducts => {
        return currentProducts.map(product => {
          const localProduct = { ...product };
          
          if (localProduct.id === id) {
            localProduct.inFavourites = true;
          }
          
          return localProduct;
        });
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleRemoveProductFromFavourites = async (id: number) => {
    setLoading(true);
  
    try {
      await removeProductFromFavourites(id);
    
      setProducts(currentProducts => {
        return currentProducts.map(product => {
          const localProduct = { ...product };
        
          if (localProduct.id === id) {
            localProduct.inFavourites = false;
          }
        
          return localProduct;
        });
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductsCallback();
    
    return () => {
      setSearch('');
      setOffset(initialOffset);
    };
  }, [fetchProductsCallback, lang]);
  
  return (
    <Visibility once={false}
      onBottomVisible={handleScrollBottom}
    >
      <h1>{i18n.t('Products')}</h1>
  
      <Input onChange={handleSearch}
        placeholder={i18n.t('Search')}
        icon={search ?
          (<Icon name='close'
            link
            onClick={handleClearSearch}
          />) : 'search'}
        value={search}
      />
      
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
              <Table.Row key={product.id}>
                <Table.Cell>
                  {product.name}
                </Table.Cell>
                <Table.Cell>
                  {product.proteins}
                </Table.Cell>
                <Table.Cell>
                  {product.fats}
                </Table.Cell>
                <Table.Cell>
                  {product.carbohydrates}
                </Table.Cell>
                <Table.Cell>
                  {product.fiber}
                </Table.Cell>
                <Table.Cell>
                  {product.calories}
                </Table.Cell>
                <Table.Cell>
                  <Checkbox toggle
                    checked={product.inFavourites}
                    onChange={product.inFavourites ?
                      () => handleRemoveProductFromFavourites(product.id) :
                      () => handleAddProductToFavourites(product.id)}
                  />
                </Table.Cell>
              </Table.Row>
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
    </Visibility>
  );
};

export default ProductsPage;