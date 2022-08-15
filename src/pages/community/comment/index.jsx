import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../../components/common/PageTitle';

const Comment = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="댓글" />
      <div>댓글</div>
    </>
  )
}

export default Comment;