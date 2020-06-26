import React from 'react'
import { Product, Themes } from '../types/models'
import { Modal, List } from 'semantic-ui-react'
import i18n from '../localization/i18n'

type ProductInfoModalProps = {
  product: Product | null
  open: boolean
  theme: Themes
  closeModal: () => void
}

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ 
  product,
  open,
  theme,
  closeModal
}: ProductInfoModalProps) => {
  return (
    <Modal open={open}
      closeIcon={true}
      closeOnEscape={true}
      closeOnDimmerClick={true}
      onClose={closeModal}
      dimmer={theme === Themes.Light ? 'inverted' : true}
    >
      <Modal.Header>{i18n.t('Product info')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <List celled={true}>
            <List.Item><strong>{i18n.t('Name')}</strong>: {product?.name}</List.Item>
            <List.Item><strong>{i18n.t('Proteins')}</strong>: {product?.proteins}</List.Item>
            <List.Item><strong>{i18n.t('Fats')}</strong>: {product?.fats}</List.Item>
            <List.Item><strong>{i18n.t('Carbohydrates')}</strong>: {product?.carbohydrates}</List.Item>
            <List.Item><strong>{i18n.t('Fiber')}</strong>: {product?.fiber}</List.Item>
            <List.Item><strong>{i18n.t('Calories')}</strong>: {product?.calories}</List.Item>
          </List>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ProductInfoModal