import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));
const Calendar = React.lazy(() => import('./pages/calendar'));
const Gallery = React.lazy(() => import('./pages/gallery'));
const Voicemail = React.lazy(() => import('./pages/voicemail'));
const Community = React.lazy(() => import('./pages/community'));
const Setting = React.lazy(() => import('./pages/setting'));
const Ranking = React.lazy(() => import('./pages/ranking'));

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedules" element={<Calendar />} />
        <Route path="/galleries" element={<Gallery />} />
        <Route path="/voice-mails" element={<Voicemail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/rankings" element={<Ranking />} />
      </Routes>
    </>
  );
};

export default App;
