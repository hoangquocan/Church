import * as firebaseAuth from '@firebase/auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.scss'
import './Variables.scss'
import { ContextProvider } from './components/Context/Context/Context'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const firebaseApp = ((config) => {
  const apps = getApps()
  if (!apps.length) {
    initializeApp(config)
  }
  return getApp()
})(firebaseConfig)

export const firebaseClient = {
  firebaseAuth,
  firebaseApp, // optional
}
export const storage = getStorage(firebaseApp)
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={firebaseClient} type="firebase">
        <MantineProvider
          withCSSVariables
          theme={{ fontFamily: 'Roboto Serif, serif' }}
        >
          <NotificationsProvider position="top-center" zIndex={2077}>
            <ModalsProvider>
              <RedwoodApolloProvider>
                <ContextProvider>
                <Routes />
                </ContextProvider>
              </RedwoodApolloProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
