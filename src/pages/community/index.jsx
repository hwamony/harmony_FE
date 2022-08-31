import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import {
    CommunityColor, CommunityContainer, TitleContainer,
    ToolContainer, Space, Category, Order
} from './style';
import ShortCard from '../../components/community/ShortCard';
import { BiSearch, BiPencil } from 'react-icons/bi'

const Community = () => {
    const navigate = useNavigate();
  return (
    <>
        <PageTitle title="커뮤니티" />
          <CommunityColor>
              <CommunityContainer>
                  <TitleContainer>
                      <h1>커뮤니티</h1>
                      <ToolContainer>
                          <BiSearch />
                          <Space />
                          <BiPencil onClick={() => navigate('/posts')}/>
                      </ToolContainer>
                  </TitleContainer>
                  <Category>
                    {/* arr.filter((elm => elm.category === '카테고리명')) */}
                      <h3>아빠</h3>
                      <h3>엄마</h3>
                      <h3>외동</h3>
                      <h3>첫째</h3>
                      <h3>N째</h3>
                      <h3>막내</h3>
                      <h3>동거인</h3>
                  </Category>
              </CommunityContainer>
              <Order>
                  <h5>최신순</h5>
                  <Space/>
                  <h5>인기순</h5>
              </Order>
              <ShortCard />
              <ShortCard />
        </CommunityColor>
    </>
  );
};
export default Community;