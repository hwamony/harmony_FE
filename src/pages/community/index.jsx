import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import api from '../../api/AxiosManager';

import PageTitle from '../../components/common/PageTitle';
import {
  CommunityColor,
  CommunityContainer,
  Space,
  Category,
  Order,
} from './style';
import ShortCard from '../../components/community/ShortCard';
import Header from '../../components/common/Header';
import BtnAdd from '../../components/common/BtnAdd';
import { communityRoles } from '../../utils/data';
import Loading from '../../components/common/Loading';

const Community = () => {
  const navigate = useNavigate();
  // const [category, setCategory] = useState();
  const { ref, inView } = useInView();

  const getCommunityPosts = async (pageParam = 0) => {
    // FIXME: 카테고리 수정하기
    const res = await api.get(`/posts?category=전체&page=${pageParam}&size=10`);
    const data = res.data.data.content;
    const last = res.data.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['communityPosts'],
    ({ pageParam = 0 }) => getCommunityPosts(pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      onSuccess: (data) => console.log(data),
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <PageTitle title="커뮤니티" />
      <BtnAdd link={'posts'} text="게시글 작성" community={true} />
      <CommunityColor>
        <CommunityContainer>
          <Header title="커뮤니티" link="/community" />
          <Category>
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

        {postList &&
          postList.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((post) => (
                <ShortCard key={post.postId} post={post} />
              ))}
            </React.Fragment>
          ))}
      </CommunityColor>
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </>
  );
};

export default Community;
