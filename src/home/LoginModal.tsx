import React, { ChangeEvent, useState } from 'react';
import { Button, Form, InputOnChangeData, Modal } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundLogin } from '../store/auth/actions';
import PasswordRecoveryModal from './PasswordRecoveryModal';
import PasswordInput from '../common/PasswordInput';

type LoginModalProps = {
  open: boolean;
  closeModal(): void;
  login: typeof boundLogin;
};

const initialFormData = { email: '', password: '' };

const LoginModal: React.FC<LoginModalProps> = ({ 
  open,
  closeModal,
  login
}: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [passwordRecoveryModalOpen, setPasswordRecoveryModalOpen] = useState(false);

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
      <Modal.Header>{i18n.t('Log In')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}
            loading={loading}
          >
            <Form.Input fluid
              autoFocus
              name='email'
              type='email'
              label={i18n.t('Email')}
              placeholder={i18n.t('Email')}
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Field control={PasswordInput}
              fluid
              name='password'
              label={i18n.t('Password')}
              placeholder={i18n.t('Password')}
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Field>
              <Button primary
                type='submit'
              >
                {i18n.t('Submit')}
              </Button>
              <Button basic
                type='button'
                onClick={() => setPasswordRecoveryModalOpen(true)}
              >
                {i18n.t('Forgot password?')}
              </Button>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>

      <PasswordRecoveryModal open={passwordRecoveryModalOpen}
        closeModal={() => setPasswordRecoveryModalOpen(false)}
      />
    </Modal>
  );
};

export default LoginModal;