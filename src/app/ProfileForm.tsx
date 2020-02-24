import React, { useState } from 'react';
import { Form, Input, Accordion } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { User } from '../store/auth/types';
import { boundSetUser } from '../store/auth/actions';
import EditableInput from '../common/EditableInput';
import { updateCurrentUser } from '../api/users';
import { getViolationsFromAxiosError } from '../api/utils';

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
    
  return (
    <Form loading={loading}>

      <Form.Field label={{ children: i18n.t('Name') }} 
        control={EditableInput}
        defaultValue={user.name}
        onSubmitInput={handleChangeName}
        onCancelEditing={() => setNameError('')}
        error={nameError ? { content: nameError } : null}
      />

      <Form.Field label={{ children: i18n.t('Email') }}
        control={Input}
        defaultValue={user.email}
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
      
    </Form>
  );
};

export default ProfileForm;