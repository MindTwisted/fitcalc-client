import React, { ChangeEvent, useState } from 'react';
import { Form, Input, Accordion, Button, InputOnChangeData } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { User } from '../store/auth/types';
import { boundSetUser } from '../store/auth/actions';
import EditableInput from '../common/EditableInput';
import { updateCurrentUser, updateCurrentUserEmail } from '../api/users';
import { getViolationsFromAxiosError } from '../api/utils';
import { verifyPassword } from '../api/auth';
import PasswordInput from '../common/PasswordInput';

type ProfileFormProps = {
  user: User,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  setUser: typeof boundSetUser
};

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user ,
  loading,
  setLoading,
  setUser
}: ProfileFormProps) => {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const initialCurrentPasswordData = { currentPassword: '', verified: false };
  const [currentPasswordData, setCurrentPasswordData] = useState(initialCurrentPasswordData);
    
  const handleChangeName = async (value: string): Promise<void> => {
    setLoading(true);

    try {
      await updateCurrentUser({ name: value });

      setUser({ ...user, name: value });

      setNameError('');
      setLoading(false);
    } catch (error) {
      const violations = getViolationsFromAxiosError(error);

      setNameError(violations.name);
      setLoading(false);

      throw error;
    }
  };

  const handleChangeEmail = async (value: string): Promise<{changeValue: boolean}> => {
    setLoading(true);

    try {
      await updateCurrentUserEmail({ currentPassword: currentPasswordData.currentPassword, email: value });

      setEmailError('');
      setLoading(false);
      
      return { changeValue: false };
    } catch (error) {
      const violations = getViolationsFromAxiosError(error);

      setEmailError(violations.email);
      setLoading(false);

      throw error;
    }
  };
  
  const handleChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData): void => {
    setCurrentPasswordData({
      ...currentPasswordData,
      currentPassword: value
    });
  };
  
  const handleVerifyPassword = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await verifyPassword(currentPasswordData.currentPassword);
      
      setCurrentPasswordData({
        ...currentPasswordData,
        verified: true
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
    
  return (
    <Form loading={loading}>
      
      {!currentPasswordData.verified && (
        <React.Fragment>
          <Form.Field control={PasswordInput}
            autoFocus
            label={i18n.t('Current password')}
            placeholder={i18n.t('Current password')}
            value={currentPasswordData.currentPassword}
            onChange={handleChangeCurrentPassword}
          />

          {currentPasswordData.currentPassword && (
            <Button primary
              type='submit'
              onClick={handleVerifyPassword}
            >
              {i18n.t('Submit')}
            </Button>
          )}
        </React.Fragment>
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
                    <Form.Field control={Input}
                      placeholder={i18n.t('Password')}
                    />
                  )
                }
              }
            ]}
          />
        </React.Fragment>
      )}
      
    </Form>
  );
};

export default ProfileForm;