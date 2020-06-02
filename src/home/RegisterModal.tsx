import React, { ChangeEvent } from 'react'
import { Button, Form, InputOnChangeData, Modal } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { register } from '../api/auth'
import { getViolationsFromAxiosError } from '../api/utils'
import PasswordInput from '../common/PasswordInput'
import useRegisterModalState from '../hooks/useRegisterModalState'

type RegisterModalProps = {
  open: boolean
  closeModal(): void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  open,
  closeModal 
}: RegisterModalProps) => {
  const {
    state: {
      loading,
      form
    },
    actionCreators: {
      setLoading,
      setNameValue,
      setNameError,
      setEmailValue,
      setEmailError,
      setPasswordValue,
      setPasswordError,
      resetForm
    }
  } = useRegisterModalState()
  
  const handleClose = () => {
    resetForm()

    closeModal()
  }
  
  const handleSubmit = async () => {
    setLoading(true)

    try {
      await register({ name: form.name.value, email: form.email.value, password: form.password.value })

      setLoading(false)
      handleClose()
    } catch(error) {
      const violations = getViolationsFromAxiosError(error)

      setLoading(false)
      setNameError(violations.name)
      setEmailError(violations.email)
      setPasswordError(violations.plainPassword)
    }
  }
  
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
              value={form.name.value}
              onChange={(e: ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => setNameValue(value)}
              error={form.name.error ? { content: form.name.error } : null}
            />
            <Form.Input fluid
              name='email'
              type='email'
              label={i18n.t('Email')}
              placeholder={i18n.t('Email')}
              value={form.email.value}
              onChange={(e: ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => setEmailValue(value)}
              error={form.email.error ? { content: form.email.error } : null}
            />
            <Form.Field control={PasswordInput}
              fluid
              name='password'
              label={i18n.t('Password')}
              placeholder={i18n.t('Password')}
              value={form.password.value}
              onChange={(e: ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => setPasswordValue(value)}
              error={form.password.error ? { content: form.password.error } : null}
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
  )
}

export default RegisterModal