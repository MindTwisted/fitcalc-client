import React, { SyntheticEvent } from 'react';
import { Form, Select } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import { Languages, Themes } from '../types/models';

type GeneralSettingsFormProps = {
  lang: Languages,
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

      <Form.Field label={{ children: i18n.t('Language') }}
        defaultValue={lang}
        control={Select}
        onChange={(e: SyntheticEvent<HTMLElement>, { value }: {value: Languages}) => setLang(value)}
        options={[
          {
            text: i18n.t('English'),
            value: Languages.English
          },
          {
            text: i18n.t('Russian'),
            value: Languages.Russian
          }
        ]}
      />
      <Form.Field label={{ children: i18n.t('Theme') }}
        defaultValue={theme}
        control={Select}
        onChange={(e: SyntheticEvent<HTMLElement>, { value }: {value: Themes}) => setTheme(value)}
        options={[
          {
            text: i18n.t('Light'),
            value: Themes.Light
          },
          {
            text: i18n.t('Dark'),
            value: Themes.Dark
          }
        ]}
      />

    </Form>
  );
};

export default GeneralSettingsForm;