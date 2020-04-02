import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, InputOnChangeData } from 'semantic-ui-react';
import { Product } from '../types/models';
import i18n from '../localization/i18n';
import { getViolationsFromAxiosError } from '../api/utils';

type EditProductFormProps = {
  product?: Product;
  loading: boolean;
  onSubmit: (product: Product) => void;
};

const emptyProduct: Product = {
  name: '',
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
  fiber: 0,
  calories: 0,
  inFavourites: false
};

const productErrorsInitialState = {
  name: '',
  proteins: '',
  fats: '',
  carbohydrates: '',
  fiber: '',
  calories: ''
};

const EditProductForm: React.FC<EditProductFormProps> = ({
  onSubmit,
  loading,
  product
}: EditProductFormProps) => {
  const [productState, setProductState] = useState<Product>(product || emptyProduct);
  const [productErrors, setProductErrors] = useState({ ...productErrorsInitialState });
  
  useEffect(() => {
    setProductState(product || emptyProduct);
  }, [product]);
  
  const handleSubmit = async () => {
    try {
      await onSubmit(productState);
    } catch (error) {
      const violations = getViolationsFromAxiosError(error);
      
      setProductErrors(violations);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, { value, name }: InputOnChangeData) => {
    if (name === 'name') {
      setProductState(current => ({ ...current, name: value }));
      
      return;
    }
  
    setProductState(current => ({ ...current, [name]: Number(value) || 0 }));
  };
  
  return (
    <Form onSubmit={handleSubmit}
      loading={loading}
    >
      <Form.Input fluid
        autoFocus
        name='name'
        label={i18n.t('Name')}
        placeholder={i18n.t('Name')}
        value={productState.name}
        onChange={handleChange}
        error={productErrors.name ? { content: productErrors.name } : null}
      />
      <Form.Input fluid
        type='number'
        name='proteins'
        label={i18n.t('Proteins')}
        placeholder={i18n.t('Proteins')}
        value={productState.proteins}
        onChange={handleChange}
        error={productErrors.proteins ? { content: productErrors.proteins } : null}
      />
      <Form.Input fluid
        type='number'
        name='fats'
        label={i18n.t('Fats')}
        placeholder={i18n.t('Fats')}
        value={productState.fats}
        onChange={handleChange}
        error={productErrors.fats ? { content: productErrors.fats } : null}
      />
      <Form.Input fluid
        type='number'
        name='carbohydrates'
        label={i18n.t('Carbohydrates')}
        placeholder={i18n.t('Carbohydrates')}
        value={productState.carbohydrates}
        onChange={handleChange}
        error={productErrors.carbohydrates ? { content: productErrors.carbohydrates } : null}
      />
      <Form.Input fluid
        type='number'
        name='fiber'
        label={i18n.t('Fiber')}
        placeholder={i18n.t('Fiber')}
        value={productState.fiber}
        onChange={handleChange}
        error={productErrors.fiber ? { content: productErrors.fiber } : null}
      />
      <Form.Input fluid
        type='number'
        name='calories'
        label={i18n.t('Calories')}
        placeholder={i18n.t('Calories')}
        value={productState.calories}
        onChange={handleChange}
        error={productErrors.calories ? { content: productErrors.calories } : null}
      />
      <Button primary
        type='submit'
      >
        {i18n.t('Submit')}
      </Button>
    </Form>
  );
};

export default EditProductForm;