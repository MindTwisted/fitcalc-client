import React, { useCallback, useEffect, useState } from 'react';
import { Table, Checkbox, Icon, Input } from 'semantic-ui-react';
import { debounce } from 'lodash';
import i18n from '../localization/i18n';
import { boundSetLoading } from '../store/system/actions';
import { Languages } from '../store/system/types';
import { getAllProducts, GetAllProductsParams, ProductsResponse } from '../api/products';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

type ProductsPageProps = {
  lang: Languages,
  setLoading: typeof boundSetLoading
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  setLoading
}: ProductsPageProps) => {
  const [products, setProducts] = useState<Array<ProductsResponse>>([]);
  const [search, setSearch] = useState('');
  
  const fetchProducts = useCallback(
    debounce(
      async ({ name, offset }: GetAllProductsParams = { name: '', offset: 0 }, appendProducts: boolean = false) => {
        setLoading(true);
  
        try {
          const productsResponse = await getAllProducts({ name, offset });
          const { products } = productsResponse.data.data;
    
          if (appendProducts) {
            setProducts(currentProducts => [...currentProducts, ...products]);
          } else {
            setProducts(products);
          }
          
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }, 
      500
    ), 
    [setLoading, setProducts]
  );
  
  useEffect(() => {
    fetchProducts();
    
    return () => {
      setSearch('');
    };
  }, [fetchProducts, lang]);
  
  useEffect(() => {
    fetchProducts({ name: search });
  }, [fetchProducts, search]);
  
  return (
    <React.Fragment>
      <h1>{i18n.t('Products')}</h1>
  
      <Input onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setSearch(data.value)}
        placeholder={i18n.t('Search')}
        icon={search ?
          (<Icon name='close'
            link
            onClick={() => setSearch('')}
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
    </React.Fragment>
  );
};

export default ProductsPage;