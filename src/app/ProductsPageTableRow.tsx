import React from 'react'
import { Checkbox, Table, Button, Icon } from 'semantic-ui-react'
import { Product, User } from '../types/models'

type ProductsPageTableRowProps = {
  product: Product
  user: User
  handleAddProductToFavourites: (product: Product) => Promise<void>
  handleRemoveProductFromFavourites: (product: Product) => Promise<void>
  handleConfirmDeleteProduct: (product: Product) => void
}

const ProductsPageTableRow: React.FC<ProductsPageTableRowProps> = ({ 
  product ,
  user,
  handleAddProductToFavourites,
  handleRemoveProductFromFavourites,
  handleConfirmDeleteProduct
}: ProductsPageTableRowProps) => {
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
      <Table.Cell textAlign='center'>
        {product.user && user.id === product.user.id && (
          <React.Fragment>
            <Button icon
              primary
              size='small'
            >
              <Icon name='edit' />
            </Button>
            <Button icon
              color='red'
              size='small'
              onClick={() => handleConfirmDeleteProduct(product)}
            >
              <Icon name='trash alternate' />
            </Button>
          </React.Fragment>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default ProductsPageTableRow