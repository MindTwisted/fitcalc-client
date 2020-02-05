import React, { ChangeEvent, useState } from 'react';
import { Button, Form, InputOnChangeData, Modal, TransitionablePortal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { register } from '../api/auth';

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
      const violations = error.response.data.data?.violations || {};

      setLoading(false);
      setFormError({
        name: violations.name,
        email: violations.email,
        password: violations.plainPassword
      });
    }
  };
  
  return (
    <TransitionablePortal open={open}
      transition={{ animation: 'drop', duration: 500 }}
      closeOnEscape={!loading}
    >
      <Modal open={open}
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
                type='password'
                value={formData.password}
                onChange={handleChange}
                error={formError.password ? { content: formError.password } : null}
              />
              <Button type='submit'>
                {i18n.t('Submit', { lng: lang })}
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
};

export default RegisterModal;