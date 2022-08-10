import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">홈</NavLink>
        </li>
        <li>
          <NavLink to="/galleries">갤러리</NavLink>
        </li>
        <li>
          <NavLink to="/voice-mails">소리샘</NavLink>
        </li>
        <li>
          <NavLink to="/community">커뮤니티</NavLink>
        </li>
        <li>
          <NavLink to="/settings">설정</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
