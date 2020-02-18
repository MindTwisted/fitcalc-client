import React, { SyntheticEvent } from 'react';
import { Form, Select } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang } from '../store/system/actions';

type GeneralSettingsFormProps = {
    lang: string,
    setLang: typeof boundSetLang
};

const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({ 
  lang ,
  setLang
}: GeneralSettingsFormProps) => {
  return (
    <Form>
      <Form.Field label={{ children: i18n.t('Language', { lng: lang }) }}
        defaultValue={lang}
        control={Select}
        onChange={(e: SyntheticEvent<HTMLElement>, { value }: {value: string}) => setLang(value)}
        options={[
          {
            text: i18n.t('English', { lng: lang }),
            value: 'en'
          },
          {
            text: i18n.t('Russian', { lng: lang }),
            value: 'ru'
          }
        ]}
      />
    </Form>
  );
};

export default GeneralSettingsForm;