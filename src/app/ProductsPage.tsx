import React, { useCallback, useEffect, useState } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLoading } from '../store/system/actions';
import { Languages } from '../store/system/types';
import { getAllProducts, ProductsResponse } from '../api/products';

type ProductsPageProps = {
  lang: Languages,
  setLoading: typeof boundSetLoading
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  setLoading
}: ProductsPageProps) => {
  const [products, setProducts] = useState<Array<ProductsResponse>>([]);
  
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    
    try {
      const productsResponse = await getAllProducts();
      const { products } = productsResponse.data.data;
      
      setProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading, setProducts]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, lang]);
  
  return (
    <React.Fragment>
      <h1>{i18n.t('Products')}</h1>
      
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
    
          {products.map(product => (
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
          ))}
  
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default ProductsPage;