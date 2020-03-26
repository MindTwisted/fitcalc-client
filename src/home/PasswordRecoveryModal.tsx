import React, { useState } from 'react';
import { Modal, Step, Button, Icon, Form, Loader, Dimmer } from 'semantic-ui-react';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import i18n from '../localization/i18n';
import { initiatePasswordRecovery, confirmPasswordRecovery } from '../api/users';
import { getViolationsFromAxiosError } from '../api/utils';

type PasswordRecoveryModalProps = {
  open: boolean;
  closeModal(): void;
};

const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({
  open,
  closeModal 
}: PasswordRecoveryModalProps) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    if (step === 2 && !code) {
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleInitiatePasswordRecovery = async () => {
    setLoading(true);

    try {
      await initiatePasswordRecovery(email);

      setLoading(false);
      setEmailError('');

      handleNextStep();
    } catch (error) {
      const violations = getViolationsFromAxiosError(error);

      setLoading(false);
      setEmailError(violations['children[email].data']);
    }
  };

  const handleConfirmPasswordRecovery = async () => {
    setLoading(true);

    try {
      await confirmPasswordRecovery({ token: code, password: password });

      setLoading(false);
      setPasswordError('');

      handleClose();
    } catch (error) {
      const violations = getViolationsFromAxiosError(error);

      setLoading(false);
      setPasswordError(violations.plainPassword);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setCode('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setShowPassword(false);

    closeModal();
  };

  return (
    <Modal closeIcon={!loading}
      open={open}
      onClose={handleClose}
      closeOnEscape={!loading}
      closeOnDimmerClick={!loading}
    >
      <Modal.Header>
        {i18n.t('Password recovery')}
      </Modal.Header>
      <Modal.Content>
        
        <Step.Group ordered
          widths={3}
        >
          <Step completed={step > 1}
            active={step === 1}
          >
            <Step.Content>
              <Step.Title>{i18n.t('Enter email')}</Step.Title>
              <Step.Description>{i18n.t('You will get a password recovery token')}</Step.Description>
            </Step.Content>
          </Step>

          <Step completed={step > 2}
            active={step === 2}
          >
            <Step.Content>
              <Step.Title>{i18n.t('Enter password recovery token')}</Step.Title>
              <Step.Description>{i18n.t('The one that was sent to you by email')}</Step.Description>
            </Step.Content>
          </Step>

          <Step active={step === 3}>
            <Step.Content>
              <Step.Title>{i18n.t('Change password')}</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        
        {(step === 1) && (
          <Form onSubmit={handleInitiatePasswordRecovery}>
            <Form.Input fluid
              autoFocus
              name='email'
              type='email'
              label={i18n.t('Email')}
              placeholder={i18n.t('Email')}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setEmail(data.value)}
              error={emailError ? { content: emailError } : null}
            />
            <Button primary
              type='submit'
            >
              {i18n.t('Submit')}
            </Button>
          </Form>
        )}

        {(step === 2) && (
          <Form>
            <Form.Input fluid
              autoFocus
              name='passwordRecoveryToken'
              label={i18n.t('Password recovery token')}
              placeholder={i18n.t('Password recovery token')}
              value={code}
              onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setCode(data.value)}
            />
          </Form>
        )}

        {(step === 3) && (
          <Form onSubmit={handleConfirmPasswordRecovery}>
            <Form.Input fluid
              autoFocus
              name='newPassword'
              label={i18n.t('New password')}
              placeholder={i18n.t('New password')}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setPassword(data.value)}
              type={showPassword ? 'text' : 'password'}
              error={passwordError ? { content: passwordError } : null}
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
              {i18n.t('Submit')}
            </Button>
          </Form>
        )}

        <Dimmer active={loading}>
          <Loader />
        </Dimmer>

      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button onClick={handlePrevStep}
            disabled={step === 1}
          >
            <Icon size='large'
              name='chevron left'
            />
          </Button>
          <Button onClick={handleNextStep}
            disabled={step === 3 || (step === 2 && !code)}
          >
            <Icon size='large'
              name='chevron right'
            />
          </Button>
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
};

export default PasswordRecoveryModal;