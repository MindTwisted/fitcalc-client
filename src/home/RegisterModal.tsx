import React from 'react';
import { Button, Form, Modal, TransitionablePortal } from 'semantic-ui-react';
import i18n from '../localization/i18n';

type RegisterModalProps = {
  open: boolean,
  lang: string,
  onClose(event: React.MouseEvent<HTMLElement>): void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, lang, onClose }: RegisterModalProps) => {
  return (
    <TransitionablePortal open={open}
      transition={{ animation: 'drop', duration: 500 }}
    >
      <Modal closeIcon
        onClose={onClose}
        open={open}
      >
        <Modal.Header>{i18n.t('Sign Up', { lng: lang })}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Input fluid
                label={i18n.t('Name', { lng: lang })}
                placeholder={i18n.t('Name', { lng: lang })}
              />
              <Form.Input fluid
                label={i18n.t('Email', { lng: lang })}
                placeholder={i18n.t('Email', { lng: lang })}
              />
              <Form.Input fluid
                label={i18n.t('Password', { lng: lang })}
                placeholder={i18n.t('Password', { lng: lang })}
                type='password'
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