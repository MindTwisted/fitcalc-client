import React, { ChangeEvent, useState } from 'react';
import { Button, Form, InputOnChangeData, Modal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { register } from '../api/auth';
import { getViolationsFromAxiosError } from '../api/utils';
import PasswordInput from '../common/PasswordInput';

type RegisterModalProps = {
  open: boolean,
  closeModal(): void
};

const initialFormData = { name: '', email: '', password: '' };
const initialFormError = { name: null, email: null, password: null };

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  open,
  closeModal 
}: RegisterModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);

  const handleClose = () => {
    setFormData(initialFormData);
    setFormError(initialFormError);

    closeModal();
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>, { name, value }: InputOnChangeData) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await register(formData);

      setLoading(false);
      handleClose();
    } catch(error) {
      const violations = getViolationsFromAxiosError(error);

      setLoading(false);
      setFormError({
        name: violations.name,
        email: violations.email,
        password: violations.plainPassword
      });
    }
  };
  
  return (
    <Modal closeIcon={!loading}
      open={open}
      onClose={handleClose}
      closeOnEscape={!loading}
      closeOnDimmerClick={!loading}
    >
      <Modal.Header>{i18n.t('Sign Up')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}
            loading={loading}
          >
            <Form.Input fluid
              autoFocus
              name='name'
              label={i18n.t('Name')}
              placeholder={i18n.t('Name')}
              value={formData.name}
              onChange={handleChange}
              error={formError.name ? { content: formError.name } : null}
            />
            <Form.Input fluid
              name='email'
              type='email'
              label={i18n.t('Email')}
              placeholder={i18n.t('Email')}
              value={formData.email}
              onChange={handleChange}
              error={formError.email ? { content: formError.email } : null}
            />
            <Form.Field control={PasswordInput}
              fluid
              name='password'
              label={i18n.t('Password')}
              placeholder={i18n.t('Password')}
              value={formData.password}
              onChange={handleChange}
              error={formError.password ? { content: formError.password } : null}
            />
            <Button primary
              type='submit'
            >
              {i18n.t('Submit')}
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;