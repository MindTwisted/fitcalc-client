import React, { useCallback, useEffect, useState } from 'react';
import { Table, Icon, Input, Visibility } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLoading } from '../store/system/actions';
import { Languages } from '../store/system/types';
import { getAllProducts, GetAllProductsParams, ProductsResponse } from '../api/products';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import useDebounce from '../hooks/useDebounce';
import ProductsPageTableRow from './ProductsPageTableRow';

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
              <ProductsPageTableRow key={product.id}
                product={product}
                setLoading={setLoading}
                setProducts={setProducts}
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
    </Visibility>
  );
};

export default ProductsPage;