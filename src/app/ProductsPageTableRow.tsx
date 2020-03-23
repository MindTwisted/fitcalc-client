import React from 'react';
import { addProductToFavourites, removeProductFromFavourites } from '../api/products';
import { Checkbox, Table } from 'semantic-ui-react';
import { Product } from '../types/models';
import { boundSetLoading } from '../store/system/actions';

type ProductsPageTableRowProps = {
  product: Product,
  setLoading: typeof boundSetLoading,
  setProducts: (products: Array<Product> | ((products: Array<Product>) => Array<Product>)) => void
};

const ProductsPageTableRow: React.FC<ProductsPageTableRowProps> = ({ 
  product ,
  setLoading,
  setProducts
}: ProductsPageTableRowProps) => {
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
  
  return (
    <Table.Row>
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
  );
};

export default ProductsPageTableRow;