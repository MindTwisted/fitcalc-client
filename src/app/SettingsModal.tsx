import React, { useState } from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import { SystemState, Themes } from '../store/system/types';
import { User } from '../store/auth/types';
import GeneralSettingsForm from './GeneralSettingsForm';
import ProfileForm from './ProfileForm';

type SettingsModalProps = {
  system: SystemState,
  user: User | null,
  open: boolean,
  closeModal: () => void, 
  setLang: typeof boundSetLang,
  setTheme: typeof boundSetTheme
};

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  system, 
  user,
  open ,
  closeModal,
  setLang,
  setTheme
}: SettingsModalProps) => {
  const { lang, theme } = system;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal open={open}
      closeIcon={!loading}
      closeOnEscape={!loading}
      closeOnDimmerClick={!loading}
      onClose={handleClose}
      dimmer={theme === Themes.Light ? 'blurring' : true}
    >
      <Modal.Content style={{ paddingTop: 0 }}>
        <Tab menu={{ secondary: true, pointing: true, size: 'massive' }}
          panes={[
            {
              menuItem: i18n.t('General'),
              // eslint-disable-next-line react/display-name
              render: () => (
                <Tab.Pane as='div'>
                  <GeneralSettingsForm lang={lang}
                    setLang={setLang}
                    theme={theme}
                    setTheme={setTheme}
                  />
                </Tab.Pane>
              )
            },
            {
              menuItem: i18n.t('Profile'),
              // eslint-disable-next-line react/display-name
              render: () => <Tab.Pane as='div'>
                <ProfileForm user={user} />
              </Tab.Pane>
            },
            {
              menuItem: i18n.t('Sessions'),
              // eslint-disable-next-line react/display-name
              render: () => <Tab.Pane as='div'>Sessions</Tab.Pane>
            }
          ]}
        />
      </Modal.Content>
    </Modal>
  );
};

export default SettingsModal;