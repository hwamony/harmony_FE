import React from 'react';
import styled from 'styled-components'
import HeaderMid from '../../components/common/HeaderMid';
import PageTitle from '../../components/common/PageTitle';
import BtnAdd from '../../components/common/BtnAdd';
import AlbumItem from '../../components/gallery/AlbumItem';

const dummyData = {
  scheduleId: 1,
  name: '강릉여행',
  albums: [
    {
      albumId: 20220802,
      name: '첫째날',
      date: '2022-08-02',
      images: [
        'https://source.unsplash.com/random/?spring',
        'https://source.unsplash.com/random/?summer',
        'https://source.unsplash.com/random/?fall',
        'https://source.unsplash.com/random/?winter',
        'https://source.unsplash.com/random/?season',
      ],
      comments: [
        {
          commentId: 124123,
          author: '아빠',
          content: '또 가고싶구나',
          createdAt: '2022-08-02',
        },
        {
          commentId: 124124,
          author: '딸',
          content:
            '저두요 룰루랄라 긴 댓글 이거슨 긴 댓글 12345678910 하나둘셋',
          createdAt: '2022-08-03',
        },
      ],
    },
    {
      albumId: 20220803,
      name: '둘째날',
      date: '2022-08-03',
      images: [
        'https://source.unsplash.com/random/?spring',
        'https://source.unsplash.com/random/?summer',
        'https://source.unsplash.com/random/?fall',
        'https://source.unsplash.com/random/?winter',
        'https://source.unsplash.com/random/?season',
      ],
      comments: [
        {
          commentId: 124125,
          author: '엄마',
          content: '사진 잘나왔네',
          createdAt: '2022-08-04',
        },
      ],
    },
  ],
};

const Albums = () => {
  return (
    <>
      <PageTitle title={`${dummyData.name} - 갤러리`} />
      <HeaderMid text={dummyData.name} />
      <BtnAdd link="/galleries/posts" text="앨범 추가" />
      <AlbumsSection>
        {dummyData.albums.map((album) => (
          <AlbumItem key={album.albumId} album={album} data={dummyData} />
        ))}
      </AlbumsSection>
    </>
  );
};

export default Albums;

const AlbumsSection = styled.section`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 55px - 65px);
  margin-top: 55px;
  padding: 23px 20px 20px;
`;