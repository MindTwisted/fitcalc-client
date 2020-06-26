import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, InputOnChangeData } from 'semantic-ui-react'
import { Product } from '../types/models'
import i18n from '../localization/i18n'
import { getViolationsFromAxiosError } from '../api/utils'

type EditProductFormProps = {
  product?: Product | null
  loading: boolean
  onSubmit: (product: Product) => void
}

const emptyProduct: Product = {
  name: '',
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
  fiber: 0,
  calories: 0,
  inFavourites: false
}

const productErrorsInitialState = {
  name: '',
  proteins: '',
  fats: '',
  carbohydrates: '',
  fiber: '',
  calories: ''
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  onSubmit,
  loading,
  product
}: EditProductFormProps) => {
  const [productState, setProductState] = useState<Product>(product || emptyProduct)
  const [productErrors, setProductErrors] = useState({ ...productErrorsInitialState })
  
  useEffect(() => {
    setProductState(product || emptyProduct)
  }, [product])
  
  const handleSubmit = async () => {
    try {
      await onSubmit(productState)
    } catch (error) {
      const violations = getViolationsFromAxiosError(error)
      
      setProductErrors(violations)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>, { value, name }: InputOnChangeData) => {
    if (name === 'name') {
      setProductState(current => ({ ...current, name: value }))
      
      return
    }
  
    setProductState(current => ({ ...current, [name]: Number(value) || 0 }))
  }
  
  return (
    <Form onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Field>
        <label htmlFor='productNameInput'>{i18n.t('Name')}</label>
        <Form.Input fluid
          id='productNameInput'
          autoFocus
          name='name'
          placeholder={i18n.t('Name')}
          value={productState.name}
          onChange={handleChange}
          error={productErrors.name ? { content: productErrors.name } : null}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor='productProteinsInput'>{i18n.t('Proteins')}</label>
        <Form.Input fluid
          id='productProteinsInput'
          type='number'
          name='proteins'
          placeholder={i18n.t('Proteins')}
          value={productState.proteins}
          onChange={handleChange}
          error={productErrors.proteins ? { content: productErrors.proteins } : null}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor='productFatsInput'>{i18n.t('Fats')}</label>
        <Form.Input fluid
          id='productFatsInput'
          type='number'
          name='fats'
          placeholder={i18n.t('Fats')}
          value={productState.fats}
          onChange={handleChange}
          error={productErrors.fats ? { content: productErrors.fats } : null}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor='productCarbohydratesInput'>{i18n.t('Carbohydrates')}</label>
        <Form.Input fluid
          id='productCarbohydratesInput'
          type='number'
          name='carbohydrates'
          placeholder={i18n.t('Carbohydrates')}
          value={productState.carbohydrates}
          onChange={handleChange}
          error={productErrors.carbohydrates ? { content: productErrors.carbohydrates } : null}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor='productFiberInput'>{i18n.t('Fiber')}</label>
        <Form.Input fluid
          id='productFiberInput'
          type='number'
          name='fiber'
          placeholder={i18n.t('Fiber')}
          value={productState.fiber}
          onChange={handleChange}
          error={productErrors.fiber ? { content: productErrors.fiber } : null}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor='productCaloriesInput'>{i18n.t('Calories')}</label>
        <Form.Input fluid
          id='productCaloriesInput'
          type='number'
          name='calories'
          placeholder={i18n.t('Calories')}
          value={productState.calories}
          onChange={handleChange}
          error={productErrors.calories ? { content: productErrors.calories } : null}
        />
      </Form.Field>
      <Button primary
        type='submit'
      >
        {i18n.t('Submit')}
      </Button>
    </Form>
  )
}

export default EditProductForm