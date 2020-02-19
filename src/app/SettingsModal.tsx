import React, { useState } from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import { SystemState, Themes } from '../store/system/types';
import GeneralSettingsForm from './GeneralSettingsForm';

type SettingsModalProps = {
  system: SystemState,
  open: boolean,
  closeModal: () => void, 
  setLang: typeof boundSetLang,
  setTheme: typeof boundSetTheme
};

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  system, 
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
              render: () => <Tab.Pane as='div'>Profile</Tab.Pane>
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