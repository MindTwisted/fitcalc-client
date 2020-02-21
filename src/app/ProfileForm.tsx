import React, { useState } from 'react';
import { Form, Input, Accordion } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { User } from '../store/auth/types';
import { boundSetUser } from '../store/auth/actions';
import EditableInput from '../common/EditableInput';
import { updateCurrentUser } from '../api/users';

type ProfileFormProps = {
  user: User,
  setOuterLoading: (loading: boolean) => void,
  setUser: typeof boundSetUser
};

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user ,
  setOuterLoading,
  setUser
}: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);

  const handleChangeName = async (value: string): Promise<void> => {
    setOuterLoading(true);
    setLoading(true);

    try {
      await updateCurrentUser({ name: value });

      setUser({ ...user, name: value });
      setOuterLoading(false);
      setLoading(false);
    } catch (error) {
      setOuterLoading(false);
      setLoading(false);
    }
  };
    
  return (
    <Form loading={loading}>

      <Form.Field label={{ children: i18n.t('Name') }} 
        control={EditableInput}
        defaultValue={user?.name}
        onSubmitInput={handleChangeName}
      />

      <Form.Field label={{ children: i18n.t('Email') }}
        control={Input}
        defaultValue={user?.email}
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