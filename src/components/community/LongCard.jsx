import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa'
import {
  CardContainer, CardTitle, Profile, Photo, Info
} from './ShortCard';


const LongCard = () => {
  const [like, setLike] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <CardContainer>
        <LongInventory>
          <CardTitle>
            <Profile>
              <Photo>프사</Photo>
              <Info>
                <h5>화목화목</h5>
                <p>12시간 전</p>
                </Info>
            </Profile>
            <p>. . .</p>
          </CardTitle>
          <LongContent>
              <h1>제목입니다</h1>
            <WideImage>
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus quis sapien non blandit. Ut vitae augue egestas, luctus est id, malesuada risus. Maecenas sed nisi vel quam gravida tristique sit amet sed ligula. Vivamus leo sem, aliquet ac lorem at, suscipit sollicitudin diam. Suspendisse aliquet neque nec mi iaculis, sed porttitor nisi posuere. Mauris est augue, pulvinar in eros eu, luctus iaculis lacus.</h3>
              <div/>
            </WideImage>
            <LongTag>
              <h3>#일상</h3>
              <h3>#고민</h3>
              <h3>#아무말</h3>
              <h3>#이거왜검색할때마다달라</h3>
            </LongTag>
          </LongContent>
          <LongGood>
            <LongCount>
              <p>좋아요 {like}개</p>
              <p>﹒</p>
              <p>댓글 1개</p>
            </LongCount>
            <h5 onClick={()=> {setLike(like + 1)} } ><FaRegThumbsUp/> 좋아요</h5>
          </LongGood>
        </LongInventory>
    </CardContainer>
    </>
  )
}
export default LongCard;

const LongInventory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 380px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
`

const LongContent = styled.div`
  border-top: 0.01px solid #D9D9D9;
  width: 660px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: left;
    h1 {
    padding-left: 20px;
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
  };
  h3 {
    margin: 2px 10px;
    text-align: left;
  };
`
const WideImage = styled.div`
  width: 610px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3{
    width: 635px;
    margin: 2px auto;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  div{
    background-image: url('https://t1.daumcdn.net/cfile/blog/21150B4654FFDC532D');
    width: 620px;
    height: 70px;
    margin-left: 50px;
    margin-bottom: 15px;
  }
`

const LongTag = styled.div`
  width: 690px;
  height: 20px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  h3{
    margin: 0 5px;
    padding: 2px 10px;
    border-radius: 10px;
    background-color: #E7E7E7;
    color: gray;
    font-size: 13px;
    text-align: left;
  }
`

const LongCount = styled.div`
  width: 200px;
  height: 3vh;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  p{
    color: #9E9E9E;
    padding-right: 10px;
    font-size: 13px;
  }
`

const LongGood = styled.div`
  border-top: 0.01px solid #D9D9D9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 15px;
  h5{
    padding: 0 135px;
    color: #3EC192;
      :hover{
      cursor: pointer;
    }
  }
`