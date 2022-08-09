import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));
const Calender = React.lazy(() => import('./pages/calender'));
const Gallery = React.lazy(() => import('./pages/gallery'));
const Voicemail = React.lazy(() => import('./pages/voicemail'));
const Community = React.lazy(() => import('./pages/community'));
const Ranking = React.lazy(() => import('./pages/ranking'));

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedules" element={<Calender />} />
        <Route path="/galleries" element={<Gallery />} />
        <Route path="/voice-mails" element={<Voicemail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/rankings" element={<Ranking />} />
      </Routes>
    </>
  );
};

export default App;
