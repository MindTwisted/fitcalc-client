import React, { ChangeEvent, useState } from 'react';
import { Button, Form, InputOnChangeData, Modal, TransitionablePortal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { auth, login } from '../api/auth';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';

type LoginModalProps = {
  open: boolean,
  lang: string,
  closeModal(): void,
  setAccessToken: typeof boundSetAccessToken,
  setRefreshToken: typeof boundSetRefreshToken,
  setUser: typeof boundSetUser
}

const LoginModal: React.FC<LoginModalProps> = ({ open, lang, closeModal, setAccessToken, setRefreshToken, setUser }: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const initialFormData = { email: '', password: '' };
  const [formData, setFormData] = useState(initialFormData);

  const handleClose = () => {
    setFormData(initialFormData);

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
      const loginResponse = await login(formData);
      const loginData = loginResponse.data.data;

      setAccessToken(loginData.access_token);
      setRefreshToken(loginData.refresh_token);
      
      const authResponse = await auth();
      const authData = authResponse.data.data;

      setUser(authData.user);
      
      setLoading(false);
      handleClose();
    } catch(error) {
      setLoading(false);
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
        <Modal.Header>{i18n.t('Log In', { lng: lang })}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}
              loading={loading}
            >
              <Form.Input fluid
                autoFocus
                name='email'
                label={i18n.t('Email', { lng: lang })}
                placeholder={i18n.t('Email', { lng: lang })}
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Input fluid
                name='password'
                label={i18n.t('Password', { lng: lang })}
                placeholder={i18n.t('Password', { lng: lang })}
                type='password'
                value={formData.password}
                onChange={handleChange}
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

export default LoginModal;