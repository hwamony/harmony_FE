import React from 'react';
import styled from 'styled-components';
import { useFamilyData } from '../../../hooks/useData';
import HeaderMid from '../../../components/common/HeaderMid';
import PageTitle from '../../../components/common/PageTitle';

const FamilyInfo = () => {
  const { data: familyInfo } = useFamilyData();

  return (
    <>
      <PageTitle title="가족구성원" />
      <HeaderMid text="가족구성원" />
      <MemberList>
        {familyInfo.members.map(
          (member) =>
            member.role !== '미설정' && (
              <li key={member.userId}>
                <div>{member.role}</div>
                <p>{member.name}</p>
              </li>
            ),
        )}
      </MemberList>
    </>
  );
};

export default FamilyInfo;

const MemberList = styled.ul`
  padding: 5px 0 64px;
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin: 19px 11px 15px 22px;
      border-radius: 50%;
      background: #ededed;
    }
    p {
      font-weight: 700;
    }
  }
`;
