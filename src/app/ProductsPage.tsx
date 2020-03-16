import React, { useCallback, useEffect, useState } from 'react';
import { Table, Checkbox, Input } from 'semantic-ui-react';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import i18n from '../localization/i18n';
import { debounce } from 'lodash';
import { boundSetLoading } from '../store/system/actions';
import { Languages } from '../store/system/types';
import { getAllProducts, GetAllProductsParams, ProductsResponse } from '../api/products';

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
  const [offset, setOffset] = useState(0);
  
  const debouncedSetSearch = debounce(setSearch, 500);
  const fetchProducts = useCallback(async ({ name, offset }: GetAllProductsParams = { name: '', offset: 0 }) => {
    setLoading(true);
  
    try {
      const productsResponse = await getAllProducts({ name, offset });
      const { products } = productsResponse.data.data;
    
      setProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading, setProducts]);
  
  useEffect(() => {
    fetchProducts({ name: search, offset });
  }, [fetchProducts, lang, search, offset]);
  
  return (
    <React.Fragment>
      <h1>{i18n.t('Products')}</h1>
      
      <Input icon='search'
        placeholder={i18n.t('Search')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => debouncedSetSearch(data.value)}
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