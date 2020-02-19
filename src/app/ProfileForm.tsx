import React from 'react';
import { Form, Input, Accordion } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { User } from '../store/auth/types';

type ProfileFormProps = {
    user: User | null
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user 
}: ProfileFormProps) => {
  return (
    <Form>

      <Form.Field label={{ children: i18n.t('Name') }} 
        control={Input}
        defaultValue={user?.name}
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