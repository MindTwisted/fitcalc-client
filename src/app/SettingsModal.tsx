import React, { useState } from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import { boundSetUser } from '../store/auth/actions';
import { Languages, Themes } from '../store/system/types';
import { User } from '../store/auth/types';
import GeneralSettingsForm from './GeneralSettingsForm';
import ProfileForm from './ProfileForm';
import { TabProps } from 'semantic-ui-react/dist/commonjs/modules/Tab/Tab';

type SettingsModalProps = {
  theme: Themes,
  lang: Languages,
  user: User,
  open: boolean,
  closeModal: () => void, 
  setLang: typeof boundSetLang,
  setTheme: typeof boundSetTheme,
  setUser: typeof boundSetUser
};

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  theme,
  lang,
  user,
  open ,
  closeModal,
  setLang,
  setTheme,
  setUser
}: SettingsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleClose = () => {
    setActiveTab(0);

    closeModal();
  };
  
  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    if (loading) {
      return;
    }

    setActiveTab(data.activeIndex as number);
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
        <Tab activeIndex={activeTab}
          onTabChange={handleTabChange}
          menu={{ secondary: true, pointing: true, size: 'massive' }}
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
                <ProfileForm user={user}
                  setOuterLoading={setLoading}
                  setUser={setUser}
                />
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