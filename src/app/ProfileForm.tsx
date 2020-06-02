import React, { useState } from 'react'
import { Form, Accordion } from 'semantic-ui-react'
import i18n from '../localization/i18n'
import { User } from '../types/models'
import { boundSetUser } from '../store/auth/actions'
import EditableInput from '../common/EditableInput'
import { updateCurrentUser, updateCurrentUserEmail, updateCurrentUserPassword } from '../api/users'
import { getViolationsFromAxiosError } from '../api/utils'
import { verifyPassword } from '../api/auth'
import PasswordInput from '../common/PasswordInput'
import SubmittableInput from '../common/SubmittableInput'

type ProfileFormProps = {
  user: User
  loading: boolean
  setLoading: (loading: boolean) => void
  setUser: typeof boundSetUser
}

const initialCurrentPasswordData = { currentPassword: '', verified: false }

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user ,
  loading,
  setLoading,
  setUser
}: ProfileFormProps) => {
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [currentPasswordData, setCurrentPasswordData] = useState(initialCurrentPasswordData)
    
  const handleChangeName = async (value: string): Promise<void> => {
    setLoading(true)

    try {
      await updateCurrentUser({ name: value })

      setUser({ ...user, name: value })

      setNameError('')
      setLoading(false)
    } catch (error) {
      const violations = getViolationsFromAxiosError(error)

      setNameError(violations.name)
      setLoading(false)

      throw error
    }
  }

  const handleChangeEmail = async (value: string): Promise<{changeValue: boolean}> => {
    setLoading(true)

    try {
      await updateCurrentUserEmail({ currentPassword: currentPasswordData.currentPassword, email: value })

      setEmailError('')
      setLoading(false)
      
      return { changeValue: false }
    } catch (error) {
      const violations = getViolationsFromAxiosError(error)

      setEmailError(violations.email)
      setLoading(false)

      throw error
    }
  }
  
  const handleVerifyPassword = async (value: string): Promise<void> => {
    setLoading(true)

    try {
      await verifyPassword(value)

      setCurrentPasswordData({
        currentPassword: value,
        verified: true
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)

      throw error
    }
  }
  
  const handleChangePassword = async (value: string): Promise<{clearValue: boolean}> => {
    setLoading(true)
    
    try {
      await updateCurrentUserPassword({ currentPassword: currentPasswordData.currentPassword, newPassword: value })

      setPasswordError('')
      setLoading(false)
      
      return { clearValue: true }
    } catch (error) {
      const violations = getViolationsFromAxiosError(error)

      setPasswordError(violations.plainPassword)
      setLoading(false)

      throw error
    }
  }
    
  return (
    <Form loading={loading}>
      
      {!currentPasswordData.verified && (
        <Form.Field label={i18n.t('Current password')}
          placeholder={i18n.t('Current password')}
          autoFocus
          control={SubmittableInput}
          inputEl={PasswordInput}
          onSubmitInput={handleVerifyPassword}
        />
      )}

      {(currentPasswordData.currentPassword && currentPasswordData.verified) && (
        <React.Fragment>
          <Form.Field label={{ children: i18n.t('Name') }}
            control={EditableInput}
            defaultValue={user.name}
            onSubmitInput={handleChangeName}
            onCancelEditing={() => setNameError('')}
            error={nameError ? { content: nameError } : null}
          />

          <Form.Field label={{ children: i18n.t('Email') }}
            type='email'
            control={EditableInput}
            defaultValue={user.email}
            onSubmitInput={handleChangeEmail}
            onCancelEditing={() => setEmailError('')}
            error={emailError ? { content: emailError } : null}
          />

          <Accordion as={Form.Field}
            panels={[
              {
                key: 'password',
                title: i18n.t('Password'),
                content: {
                  content: (
                    <Form.Field control={SubmittableInput}
                      inputEl={PasswordInput}
                      placeholder={i18n.t('Password')}
                      onSubmitInput={handleChangePassword}
                      error={passwordError ? { content: passwordError } : null}
                    />
                  )
                }
              }
            ]}
          />
        </React.Fragment>
      )}
      
    </Form>
  )
}

export default ProfileForm