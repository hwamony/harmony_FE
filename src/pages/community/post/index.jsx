import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../../components/common/PageTitle';

const Post = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="포스팅" />
      <div>Post</div>
    </>
  )
}

export default Post;