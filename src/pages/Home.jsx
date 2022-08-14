import React from 'react';
import Calendar from '../components/calendar/Calendar';
import PageTitle from '../components/common/PageTitle';

const Home = () => {
  return (
    <>
      <PageTitle title="캘린더 홈" />
      <Calendar />
    </>
  );
};

export default Home;
