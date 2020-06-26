import React, { useCallback, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { Button, Confirm, Segment, Sidebar } from 'semantic-ui-react'
import routes from '../routes'
import { RootState } from '../store'
import { boundLogout, boundSetUser, boundSoftLogout } from '../store/auth/actions'
import { boundSetLang, boundSetLoading, boundSetTheme } from '../store/system/actions'
import useActions from '../hooks/useActions'
import { auth as fetchAuth } from '../api/auth'
import SidebarNavigation from './SidebarNavigation'
import NavigationBar from './NavigationBar'
import SettingsModal from './SettingsModal'
import StatisticsPage from './StatisticsPage'
import ProductsPage from './ProductsPage'
import EatingPage from './EatingPage'
import i18n from '../localization/i18n'

type ApplicationProps = {
  mobile: boolean
}

export type ConfirmData = {
  message: string
  onConfirm: () => void
} | null

const Application: React.FC<ApplicationProps> = ({ mobile }: ApplicationProps) => {
  const system = useSelector((state: RootState) => state.system, shallowEqual)
  const auth = useSelector((state: RootState) => state.auth, shallowEqual)
  const [logout, softLogout, setLang, setTheme, setUser, setLoading] = useActions([
    boundLogout,
    boundSoftLogout,
    boundSetLang,
    boundSetTheme,
    boundSetUser,
    boundSetLoading
  ])
  
  if (!auth.user || !auth.refreshToken || !auth.accessToken) {
    throw new Error('Application component requires logged-in user to work properly.')
  }

  const [sidebarVisible, setSidebarVisible] = useState(!mobile)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<ConfirmData>(null)

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true)

    try {
      const authResponse = await fetchAuth()
      const { user } = authResponse.data.data

      setUser(user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [setLoading, setUser])

  useEffect(() => {
    fetchCurrentUser()
    setSidebarVisible(!mobile)
  }, [mobile, fetchCurrentUser])
  
  const getContentStyles = () => {
    const styles: any = {
      paddingBottom: '5rem'
    }
    
    if (!mobile) {
      styles.paddingLeft = 'calc(150px + 1em)'
    }
    
    return styles
  }

  return (
    <React.Fragment>
      <Sidebar.Pushable style={{ transform: 'none' }}>
        <SidebarNavigation theme={system.theme}
          mobile={mobile}
          visible={sidebarVisible}
          setVisible={setSidebarVisible}
        />

        <Sidebar.Pusher dimmed={mobile && sidebarVisible}
          style={{ minHeight: '100vh' }}
        >
          <NavigationBar sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
            mobile={mobile}
            user={auth.user}
            logout={logout}
            theme={system.theme}
            setSettingsModalOpen={setSettingsModalOpen}
          />

          <Segment basic
            style={getContentStyles()}
          >
            <Route path={routes.app.index}
              exact
            >
              <StatisticsPage />
            </Route>
            <Route path={routes.app.products}>
              <ProductsPage lang={system.lang}
                theme={system.theme}
                user={auth.user}
                mobile={mobile}
                setLoading={setLoading}
                setConfirmData={setConfirmData}
              />
            </Route>
            <Route path={routes.app.eating}>
              <EatingPage />
            </Route>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      
      <SettingsModal theme={system.theme}
        lang={system.lang}
        user={auth.user}
        refreshToken={auth.refreshToken}
        open={settingsModalOpen}
        closeModal={() => setSettingsModalOpen(false)}
        setLang={setLang}
        setTheme={setTheme}
        setUser={setUser}
        softLogout={softLogout}
        setConfirmData={setConfirmData}
      />
  
      <Confirm open={Boolean(confirmData)}
        content={confirmData?.message}
        onConfirm={confirmData?.onConfirm}
        onCancel={() => setConfirmData(null)}
        confirmButton={<Button color='blue'>{i18n.t('Submit')}</Button>}
        cancelButton={<Button color='red'>{i18n.t('Cancel')}</Button>}
      />
    </React.Fragment>
  )
}

export default Application