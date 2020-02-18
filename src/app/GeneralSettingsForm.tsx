import React, { SyntheticEvent } from 'react';
import { Form, Select } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import { Themes } from '../store/system/types';

type GeneralSettingsFormProps = {
    lang: string,
    setLang: typeof boundSetLang,
    theme: Themes,
    setTheme: typeof boundSetTheme
};

const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({ 
  lang ,
  setLang,
  theme,
  setTheme
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
      <Form.Field label={{ children: i18n.t('Theme', { lng: lang }) }}
        defaultValue={theme}
        control={Select}
        onChange={(e: SyntheticEvent<HTMLElement>, { value }: {value: Themes}) => setTheme(value)}
        options={[
          {
            text: i18n.t('Light', { lng: lang }),
            value: Themes.Light
          },
          {
            text: i18n.t('Dark', { lng: lang }),
            value: Themes.Dark
          }
        ]}
      />

    </Form>
  );
};

export default GeneralSettingsForm;