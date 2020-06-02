import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { Product, Themes } from '../types/models'
import { addProduct } from '../api/products'
import EditProductForm from './EditProductForm'

type AddProductModalProps = {
  theme: Themes
  open: boolean
  onAddProduct: (product: Product) => void
  closeModal: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  theme,
  open ,
  onAddProduct,
  closeModal
}: AddProductModalProps) => {
  const [loading, setLoading] = useState(false)
  
  const handleAddProduct = async (product: Product) => {
    setLoading(true)
    
    try {
      const addProductResponse = await addProduct(product)
      
      onAddProduct(addProductResponse.data.data.product)
      setLoading(false)
      closeModal()
      
      return addProductResponse
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
      <Modal.Header>{i18n.t('Add product')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <EditProductForm onSubmit={handleAddProduct}
            loading={loading}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddProductModal