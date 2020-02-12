import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Icon, InputOnChangeData, Modal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { register } from '../api/auth';
import { getViolationsFromAxiosError } from '../api/utils';

type RegisterModalProps = {
  open: boolean,
  lang: string,
  closeModal(): void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, lang, closeModal }: RegisterModalProps) => {
  const [loading, setLoading] = useState(false);
  const initialFormData = { name: '', email: '', password: '' };
  const initialFormError = { name: null, email: null, password: null };
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setFormData(initialFormData);
    setFormError(initialFormError);
    setShowPassword(false);

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
      <Modal.Header>{i18n.t('Sign Up', { lng: lang })}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}
            loading={loading}
          >
            <Form.Input fluid
              autoFocus
              name='name'
              label={i18n.t('Name', { lng: lang })}
              placeholder={i18n.t('Name', { lng: lang })}
              value={formData.name}
              onChange={handleChange}
              error={formError.name ? { content: formError.name } : null}
            />
            <Form.Input fluid
              name='email'
              label={i18n.t('Email', { lng: lang })}
              placeholder={i18n.t('Email', { lng: lang })}
              value={formData.email}
              onChange={handleChange}
              error={formError.email ? { content: formError.email } : null}
            />
            <Form.Input fluid
              name='password'
              label={i18n.t('Password', { lng: lang })}
              placeholder={i18n.t('Password', { lng: lang })}
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              error={formError.password ? { content: formError.password } : null}
              icon={(
                <Icon link
                  name={showPassword ? 'eye slash' : 'eye'}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            />
            <Button primary
              type='submit'
            >
              {i18n.t('Submit', { lng: lang })}
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};

export default RegisterModal;