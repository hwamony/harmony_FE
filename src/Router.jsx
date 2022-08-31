import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));
const Schedule = React.lazy(() => import('./pages/calendar/Schedule'));
const Gallery = React.lazy(() => import('./pages/gallery'));
const AlbumLayout = React.lazy(() => import('./pages/gallery/AlbumLayout'));
const Albums = React.lazy(() => import('./pages/gallery/Albums'));
const Album = React.lazy(() => import('./pages/gallery/Album'));
const EditAlbum = React.lazy(() => import('./pages/gallery/EditAlbum'));
const PostAlbum = React.lazy(() => import('./pages/gallery/PostAlbum'));
const Voicemail = React.lazy(() => import('./pages/voicemail'));
const Voicercorder = React.lazy(() => import('./pages/voicerecorder'));
const Community = React.lazy(() => import('./pages/community'));
const Post = React.lazy(() => import('./pages/community/posts'));
const PostDetail = React.lazy(() => import('./pages/community/detail'));
const Setting = React.lazy(() => import('./pages/setting'));
const Ranking = React.lazy(() => import('./pages/ranking'));
const SignupComplete = React.lazy(() => import('./pages/signupcomplete'));
const Familycode = React.lazy(() => import('./pages/familycode'));
const Role = React.lazy(() => import('./pages/role'));
const Notice = React.lazy(() => import('./pages/notice'));


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/schedules/*" element={<Schedule />} />
      <Route path="/galleries" element={<Gallery />} />
      <Route path="/galleries/:scheduleId" element={<AlbumLayout />}>
        <Route index element={<Albums />} />
        <Route path="/galleries/:scheduleId/:galleryId" element={<Album />} />
      </Route>
      <Route path="/galleries/posts" element={<PostAlbum />} />
      <Route path="/galleries/posts/:galleryId" element={<PostAlbum />} />
      <Route path="/galleries/posts/:scheduleId/:galleryId/edit" element={<EditAlbum />} />
      <Route path="/voice-mails" element={<Voicemail />} />
      <Route path="/voice-recorder" element={<Voicercorder />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/posts" element={<Post />} />
      <Route path="/community/posts/:postId" element={<PostDetail />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/rankings" element={<Ranking />} />
      <Route path="/signupcomplete" element={<SignupComplete />} />
      <Route path="/familycode" element={<Familycode />} />
      <Route path="/role" element={<Role />} />
      <Route path="/notice" element={<Notice />} />

    </Routes>
  );
};

export default Router;
