import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './components/common/Loading';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/GlobalStyle';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HelmetProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </Suspense>,
);
