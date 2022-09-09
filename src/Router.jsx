import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/login'));
const Kakao = React.lazy(() => import('./pages/login/kakao'));
const Signup = React.lazy(() => import('./pages/signup'));
const SignupKakao = React.lazy(() => import('./pages/signup/kakao'));
const SignupComplete = React.lazy(() => import('./pages/signup/complete'));
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
const EditPassword = React.lazy(() => import('./pages/setting/editpassword'));
const EditProfile = React.lazy(() => import('./pages/setting/editprofile'));
const Familycode = React.lazy(() => import('./pages/familycode'));
const Role = React.lazy(() => import('./pages/role'));
const Notice = React.lazy(() => import('./pages/notice'));
const FamilyScore = React.lazy(() => import('./pages/family'));
const FamilyInfo = React.lazy(() => import('./pages/family/info'));
const FamilyRanking = React.lazy(() => import('./pages/family/ranking'));
const NotFound = React.lazy(() => import('./pages/notfound'));

const Router = () => {
  const hasToken = !!localStorage.getItem('TOKEN');
  
  return (
    <>
      {hasToken ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedules/*" element={<Schedule />} />
            <Route path="/galleries" element={<Gallery />} />
            <Route path="/galleries/:scheduleId" element={<AlbumLayout />}>
              <Route index element={<Albums />} />
              <Route path="/galleries/:scheduleId/:galleryId" element={<Album />} />
            </Route>
            <Route path="/galleries/posts" element={<PostAlbum />} />
            <Route path="/galleries/posts/:galleryId" element={<PostAlbum />} />
            <Route path="/galleries/posts/:scheduleId/:galleryId/edit" element={<EditAlbum />}
            />
            <Route path="/voice-mails" element={<Voicemail />} />
            <Route path="/voice-recorder" element={<Voicercorder />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/posts" element={<Post />} />
            <Route path="/community/posts/:postId" element={<PostDetail />} />
            <Route path="/community/posts/:postId/edit" element={<Post />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/mypage/editpassword" element={<EditPassword />} />
            <Route path="/mypage/editprofile" element={<EditProfile />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/family" element={<FamilyScore />} />
            <Route path="/family/info" element={<FamilyInfo />} />
            <Route path="/family/rankings" element={<FamilyRanking />} />
            <Route path="/signup/kakao" element={<SignupKakao />} />
            <Route path="/familycode" element={<Familycode />} />
            <Route path="/role" element={<Role />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/oauth2/kakao" element={<Kakao />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/complete" element={<SignupComplete />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
