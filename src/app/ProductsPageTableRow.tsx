import React from 'react';
import { addProductToFavourites, removeProductFromFavourites } from '../api/products';
import { Checkbox, Table } from 'semantic-ui-react';
import { Product } from '../types/models';
import { boundSetLoading } from '../store/system/actions';

type ProductsPageTableRowProps = {
  product: Product,
  setLoading: typeof boundSetLoading,
  updateProduct: (product: Product) => void
};

const ProductsPageTableRow: React.FC<ProductsPageTableRowProps> = ({ 
  product ,
  setLoading,
  updateProduct
}: ProductsPageTableRowProps) => {
  const handleAddProductToFavourites = async (product: Product) => {
    setLoading(true);
    
    try {
      await addProductToFavourites(product.id);
      
      updateProduct({
        ...product,
        inFavourites: true
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleRemoveProductFromFavourites = async (product: Product) => {
    setLoading(true);
    
    try {
      await removeProductFromFavourites(product.id);
      
      updateProduct({
        ...product,
        inFavourites: false
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
            () => handleRemoveProductFromFavourites(product) :
            () => handleAddProductToFavourites(product)}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductsPageTableRow;