import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import {
  CommunityColor,
  CommunityContainer,
  Space,
  Category,
  Order,
} from './style';
import { communityRoles } from '../../utils/data';
import ShortCard from '../../components/community/ShortCard';
import Header from '../../components/common/Header';

const Community = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="커뮤니티" />
      <CommunityColor>
        <CommunityContainer>
          <Header title="커뮤니티" link="/community" />
          <Category>
            {/* arr.filter((elm => elm.category === '카테고리명')) */}
            <h3>전체</h3>
            {communityRoles.map((v) => (
              <h3 key={v}>{v}</h3>
            ))}
          </Category>
        </CommunityContainer>

        <Order>
          <h5>최신순</h5>
          <Space />
          <h5>인기순</h5>
        </Order>

        <ShortCard />
        <ShortCard />
      </CommunityColor>
    </>
  );
};
export default Community;
