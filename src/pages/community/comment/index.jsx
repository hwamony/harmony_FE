import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../../components/common/PageTitle';
import LongCard from '../../../components/community/LongCard';
import { IoIosArrowBack } from 'react-icons/io';
import { GiFlowerTwirl } from 'react-icons/gi'
import { RiPlantLine } from 'react-icons/ri';
import { FaHeart } from 'react-icons/fa'

const Comment = () => {
  const navigate = useNavigate();
  const [userName] = useState('');
  const [comment, setComment] = useState('');
  const [feedComments, setFeedComments] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const post = e => {
    const copyFeedComments = [...feedComments];
    copyFeedComments.push(comment);
    setFeedComments(copyFeedComments);
    setComment('');

    {feedComments.map((comment, i) => {
      return (
        <CommentList
        userName={userName}
        userComment={Comment}
        key={i}
        />
      );
    })}

    const CommentList = props => {
      return (
        <div className='userCommentBox'>
          <p className="userName">{props.userName}</p>
          <div className='userComment'></div>
          <p className='userHeart'><FaHeart /></p>
        </div>
      )
    }
  };

  return (
    <>
      <PageTitle title="댓글" />
        <Pagecolor>
          <TitleC>
            <Arrow>
              <p onClick={() => navigate('/community')}><IoIosArrowBack /></p>
              <h1>커뮤니티</h1>
            </Arrow>
            <LongCard />
          </TitleC>
          <Repl>
              <h3>댓글 1</h3>
                <div>
                  <h5><RiPlantLine /> <span> nick1</span></h5>
                  <p>댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요.</p>
                  </div>
                  <div>
                    <h5><GiFlowerTwirl /> <span> nick2</span></h5>
                    <p>댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요. 댓글을 입력해주세요.</p>
                </div>
          </Repl>
          <CommentBar>
            <CommentP>
              <input
              type='text'
              className='inputComment'
              placeholder='댓글을 입력하세요.'
              onChange={e => {
                setComment(e.target.value)
              }}
              onKeyUp={e => {
                e.target.value.length > 0
                ? setIsValid(true)
                : setIsValid(false);
              }}
              value={comment}
              />
              <button
              type="button"
              className={
                comment.length > 0
                ? 'submitCommentActive'
                : 'submitCommentInactive'
              }
              onClick={post}
              disabled={isValid ? false : true}
              >입력</button>
            </CommentP>
          </CommentBar>
        </Pagecolor>
    </>
  )
}

export default Comment;

const Pagecolor = styled.article`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background-color: #f2f2f2;
  h1 {
    margin: 0.7em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`

const TitleC = styled.div`
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  text-align: center;
  background-color: white;
`

const Arrow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: #3EC192;
  p{
    padding-left: 5vw;
    padding-right: 40vw;
    font-size: 25px;
    height: 30px;
    :hover{
        cursor: pointer;
    }
  }
  h1{
    text-align: center;
    height: 30px;
  }
`

const Repl = styled.div`
  width: 670px;
  height: 150px;
  margin: 545px auto 0 auto;
  background-color: white;
  border-radius: 5px;
  h3{
    text-align: left;
    padding-top: 20px;
    padding-left: 20px;
    font-weight: bolder;
  }
  p, h5{
    text-align: left;
    padding-left: 20px;
    padding-top: 10px;
  }
  p{
    font-size: 14px;
  }
  h5{
    width: 120px;
    color: #3EC192;
    font-size: 20px;
    font-weight: bolder;
  }
  span{
    color: black;
    font-size: 16px;
  }
  div{
    width: 600px;
    display: flex;
    align-items: center;
  }
`

const CommentBar = styled.div`
  border-top: 2px solid white;
  padding-bottom: 5px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  color: #868686;
  font-size: 12px;
  z-index: 100;
`

const CommentP = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  input{
    width: 85vw;
    max-width: 600px;
    height: 43px;
    font-size: 17px;
    background-color: white;
    border: 1px solid #3EC192;
    border-radius: 5px;
    padding-left: 15px;
    ::placeholder{
        color: #3EC192;
        font-size: 15px;
    };
  };
  button{
    width: 60px;
    height: 43px;
    border: 1px solid #3EC192;
    background-color: white;
    color: #3EC192;
    font-size: 15px;
    border-radius: 5px;
    :hover{
        background-color: #3EC192;
        color: white;
    }
  }
`