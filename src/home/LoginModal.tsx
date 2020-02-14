import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Icon, InputOnChangeData, Modal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundLogin } from '../store/auth/actions';
import PasswordRecoveryModal from './PasswordRecoveryModal';

type LoginModalProps = {
  open: boolean,
  lang: string,
  closeModal(): void,
  login: typeof boundLogin
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  open, 
  lang, 
  closeModal,
  login
}: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const initialFormData = { email: '', password: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRecoveryModalOpen, setPasswordRecoveryModalOpen] = useState(false);

  const handleClose = () => {
    setFormData(initialFormData);
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
      await login(formData);
      
      setLoading(false);

      handleClose();
    } catch(error) {
      setLoading(false);
    }
  };

  return (
    <Modal closeIcon={!loading} 
      open={open}
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
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              icon={(
                <Icon link
                  name={showPassword ? 'eye slash' : 'eye'}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            />
            <Form.Field>
              <Button primary
                type='submit'
              >
                {i18n.t('Submit', { lng: lang })}
              </Button>
              <Button basic
                type='button'
                onClick={() => setPasswordRecoveryModalOpen(true)}
              >
                {i18n.t('Forgot password?', { lng: lang })}
              </Button>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>

      <PasswordRecoveryModal open={passwordRecoveryModalOpen}
        lang={lang}
        closeModal={() => setPasswordRecoveryModalOpen(false)}
      />
    </Modal>
  )
};

export default LoginModal;