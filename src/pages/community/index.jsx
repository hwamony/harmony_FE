import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import api from '../../api/AxiosManager';

import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import BtnAdd from '../../components/common/BtnAdd';
import ShortCard from '../../components/community/ShortCard';
import Loading from '../../components/common/Loading';
import { communityRoles } from '../../utils/data';
import {
  Main,
  CommunityNav,
  Category,
  ContentWrap,
  CategoryItem,
  CommunityContent,
} from './style';

const Community = () => {
  const [category, setCategory] = useState('전체');
  const { ref, inView } = useInView();

  const getCommunityPosts = async (pageParam = 0) => {
    const res = await api.get(
      `/posts?category=${category}&page=${pageParam}&size=5`,
    );
    const data = res.data.data.content;
    const last = res.data.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['communityPosts', category],
    ({ pageParam = 0 }) => getCommunityPosts(pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const onClickCategory = (name) => {
    window.scrollTo(0, 0);
    setCategory(name);
  };

  return (
    <>
      <PageTitle title="커뮤니티" />
      <Header title="커뮤니티" link="/community" />

      <Main>
        <>
          <BtnAdd link={'posts'} text="게시글 작성" community={true} />
          <CommunityNav>
            <Category>
              {communityRoles.map((v, i) => (
                <CategoryItem
                  key={v}
                  active={category === communityRoles[i]}
                  onClick={() => onClickCategory(communityRoles[i])}
                  tabIndex="0"
                >
                  {v}
                </CategoryItem>
              ))}
            </Category>
          </CommunityNav>
        </>

        <ContentWrap>
          <CommunityContent>
            {postList &&
              postList.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.map((post) => (
                    <ShortCard key={post.postId} post={post} />
                  ))}
                </React.Fragment>
              ))}
          </CommunityContent>
        </ContentWrap>

        {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
      </Main>
    </>
  );
};

export default Community;
