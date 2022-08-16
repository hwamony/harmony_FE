import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {FaRegComment, FaRegThumbsUp} from 'react-icons/fa'


const shortCard = () => {
  const [like, setLike] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <CardContainer>
        <Inventory>
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
          <CardContent>
            <H1>
              <h1>제목입니다</h1>
              <H3>
                <p> <FaRegThumbsUp /> {like}</p>
                <p> <FaRegComment /> 322</p>
              </H3>
            </H1>
            <H1>
              <Image>
                <div/>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quam risus, convallis sit amet justo in, venenatis lacinia dui. Suspendisse potenti. Vivamus quis risus eleifend, eleifend augue in, ultricies nisl. Phasellus at fermentum nibh. Cras fin
                  <span >... 더 보기</span>
                </h3>
              </Image>
            </H1>
            <Tag>
              <h3>#일상</h3>
              <h3>#고민</h3>
              <h3>#아무말</h3>
              <h3>#이거왜검색할때마다달라</h3>
            </Tag>
          </CardContent>
          <CardGood>
            <h5 onClick={()=> {setLike(like + 1)} } ><FaRegThumbsUp/> 좋아요</h5>
            <h5 onClick={() => navigate('/posts/comments')}><FaRegComment/> 댓글달기</h5>
          </CardGood>
        </Inventory>
    </CardContainer>
    </>
  )
}
export default shortCard;

export const CardContainer = styled.div`
  padding-top: 3vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Inventory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 270px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
`

export const CardTitle = styled.div`
  border-bottom: 0.01px solid #D9D9D9;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  width: 670px;
  p{
    color: gray;
    font-size: 13px;
    font-weight: bolder;
    :hover{
      cursor: pointer;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

export const Photo = styled.p`
margin: 0 15px;
padding: 15px 13px;
background-color: #D9D9D9;
border-radius: 100%;
`

export const Info = styled.div`
  flex-direction: column;
`

export const CardContent = styled.div`
  width: 660px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: left;
  h3 {
    margin: 5px 10px;
    text-align: left;
  };
  span{
    color: gray;
    font-size: 13px;
    :hover{
      cursor: pointer;
    }
  };
`
export const H1 = styled.div`
  width: 690px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0.7em 0;
    padding-left: 20px;
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
  };
  h3{
    width: 550px;
  }
`

export const H3 = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  p{
    padding-right: 50px;
    // color: #3EC192;
  }
`

export const Image = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 7.5px;
  div{
    background-image: url('https://t1.daumcdn.net/cfile/blog/21150B4654FFDC532D');
    width: 90px;
    height: 75px;
    margin-left: 25px;
  }
`

export const Tag = styled.div`
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
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #E7E7E7;
    color: gray;
    font-size: 13px;
    text-align: left;
  }
`

export const GoodCount = styled.div`
  width: 100vw;
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

export const CardGood = styled.div`
  border-top: 0.01px solid #D9D9D9;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 15px;
  h5{
    padding: 0 135px;
      :hover{
      cursor: pointer;
    }
  }
`