import React from 'react'
import { Table, Button, Icon, Rating } from 'semantic-ui-react'
import { Product, User } from '../types/models'
import i18n from '../localization/i18n'

type ProductsPageTableRowProps = {
  product: Product
  user: User
  mobile: boolean
  handleAddProductToFavourites: (product: Product) => Promise<void>
  handleRemoveProductFromFavourites: (product: Product) => Promise<void>
  handleConfirmDeleteProduct: (product: Product) => void
  setProductUnderEdit: (product: Product) => void
  setProductUnderViewing: (product: Product) => void
}

const ProductsPageTableRow: React.FC<ProductsPageTableRowProps> = ({ 
  product ,
  user,
  mobile,
  handleAddProductToFavourites,
  handleRemoveProductFromFavourites,
  handleConfirmDeleteProduct,
  setProductUnderEdit,
  setProductUnderViewing
}: ProductsPageTableRowProps) => {
  return (
    <Table.Row>
      <Table.Cell>
        {mobile && (
          <Button icon='info'
            compact={true}
            secondary={true}
            size='mini'
            circular={true}
            onClick={() => setProductUnderViewing(product)}
            aria-label={i18n.t('Product info')}
          />
        )}
        {product.name}
      </Table.Cell>
      {!mobile && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      <Table.Cell>
        {product.calories}
      </Table.Cell>
      <Table.Cell>
        <Rating size='massive'
          icon='star'
          rating={product.inFavourites ? 1 : 0}
          onRate={product.inFavourites ?
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
              onClick={() => setProductUnderEdit(product)}
              aria-label={i18n.t('Edit product')}
            >
              <Icon name='edit' />
            </Button>
            <Button icon
              color='red'
              size='small'
              onClick={() => handleConfirmDeleteProduct(product)}
              aria-label={i18n.t('Delete product')}
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