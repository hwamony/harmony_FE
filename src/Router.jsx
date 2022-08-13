import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));
const Calendar = React.lazy(() => import('./pages/calendar'));
const Gallery = React.lazy(() => import('./pages/gallery'));
const Voicemail = React.lazy(() => import('./pages/voicemail'));
const Community = React.lazy(() => import('./pages/community'));
const Setting = React.lazy(() => import('./pages/setting'));
const Ranking = React.lazy(() => import('./pages/ranking'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/galleries" element={<Gallery />} />
      <Route path="/voice-mails" element={<Voicemail />} />
      <Route path="/community" element={<Community />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/rankings" element={<Ranking />} />
    </Routes>
  );
};

export default Router;
