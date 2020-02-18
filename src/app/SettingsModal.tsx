import React, { useState } from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang } from '../store/system/actions';
import GeneralSettingsForm from './GeneralSettingsForm';

type SettingsModalProps = {
  lang: string,
  open: boolean,
  closeModal: () => void, 
  setLang: typeof boundSetLang
};

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  lang, 
  open ,
  closeModal,
  setLang
}: SettingsModalProps) => {
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
    >
      <Modal.Content style={{ paddingTop: 0 }}>
        <Tab menu={{ secondary: true, pointing: true, size: 'massive' }}
          panes={[
            {
              menuItem: i18n.t('General', { lng: lang }),
              // eslint-disable-next-line react/display-name
              render: () => (
                <Tab.Pane as='div'>
                  <GeneralSettingsForm lang={lang}
                    setLang={setLang}
                  />
                </Tab.Pane>
              )
            },
            {
              menuItem: i18n.t('Profile', { lng: lang }),
              // eslint-disable-next-line react/display-name
              render: () => <Tab.Pane as='div'>Profile</Tab.Pane>
            },
            {
              menuItem: i18n.t('Sessions', { lng: lang }),
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