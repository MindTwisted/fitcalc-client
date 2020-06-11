import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { Product, Themes } from '../types/models'
import { updateProduct } from '../api/products'
import EditProductForm from './EditProductForm'

type EditProductModalProps = {
  theme: Themes
  open: boolean
  product: Product | null
  onEditProduct: (product: Product) => void
  closeModal: () => void
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  theme,
  open ,
  product,
  onEditProduct,
  closeModal
}: EditProductModalProps) => {
  const [loading, setLoading] = useState(false)
  
  const handleEditProduct = async (product: Product) => {
    setLoading(true)
    
    try {
      const editProductResponse = await updateProduct(product)
  
      onEditProduct(editProductResponse.data.data.product)
      setLoading(false)
      closeModal()
      
      return editProductResponse
    } catch (error) {
      setLoading(false)
      
      throw error
    }
  }
  
  return (
    <Modal open={open}
      closeIcon={!loading}
      closeOnEscape={!loading}
      closeOnDimmerClick={!loading}
      onClose={closeModal}
      dimmer={theme === Themes.Light ? 'inverted' : true}
    >
      <Modal.Header>{i18n.t('Edit product')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <EditProductForm onSubmit={handleEditProduct}
            loading={loading}
            product={product}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default EditProductModal