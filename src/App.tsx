import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { isAppUserSelector, isLoggedInSelector } from './store/auth/selectors'
import loadable from '@loadable/component'
import routes from './routes'
import Home from './home/Home'
import Loading from './common/Loading'
import Notification from './common/Notification'
import ProtectedRoute from './common/ProtectedRoute'

const Application = loadable(() => import('./app/Application'), {
  fallback: <Loading active={true} />
})

const App: React.FC = () => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const isAppUser = useSelector(isAppUserSelector)
  const loading = useSelector((state: RootState) => state.system.loading)
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  
  const handleResize = () => {
    setMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
    
  return (
    <main className='App'>
      <Router>
        <Switch>
          <Route exact
            path={routes.home.index}
          >
            <Home mobile={mobile} />
          </Route>
          <ProtectedRoute isAllowed={isLoggedIn && isAppUser}
            redirect={routes.home.index}
            path={routes.app.index}
          >
            <Application mobile={mobile} />
          </ProtectedRoute>
        </Switch>
      </Router>

      <Notification />
      <Loading active={loading} />
    </main>
  )
}

export default App
