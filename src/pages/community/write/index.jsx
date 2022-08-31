import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../../components/common/PageTitle';
import TagBox from '../../../components/community/TagBox';
import { IoIosArrowBack } from 'react-icons/io';

const Post = () => {
  const navigate = useNavigate();

  const titleInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    category: '',
    title: '',
    content: '',
    tags: [],
    photo: '',
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // if(state.category.)
    
    if(state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    
    if(state.content.length < 5){
      contentInput.current.focus();
    }
    alert('포스팅성공!')
    setState({

    })
  }

  return (
    <>
      <PageTitle title='포스팅' />
      <PageColor>
          <Header>
            <ArrowP>
              <p onClick={() => navigate('/community')}><IoIosArrowBack/></p>
              <h1>글쓰기</h1>
            </ArrowP>
          </Header>
          <BoxP>
            <form>
              <PostCategory>
                <span>카테고리</span>
                <label><input value={state.category.dad} type='radio' name='category' onChange={handleChangeState} /> 아빠</label>
                <label><input value={state.category.mom} type='radio' name='category' onChange={handleChangeState} /> 엄마</label>
                <label><input value={state.category.only} type='radio' name='category' onChange={handleChangeState} /> 외동</label>
                <label><input value={state.category.first} type='radio' name='category' onChange={handleChangeState} /> 첫째</label>
                <label><input value={state.category.nth} type='radio' name='category' onChange={handleChangeState} /> N째</label>
                <label><input value={state.category.last} type='radio' name='category' onChange={handleChangeState} /> 막내</label>
                <label><input value={state.category.mate} type='radio' name='category' onChange={handleChangeState} /> 동거인</label>
              </PostCategory>
              <PostTitle>
                <input
                  name='title'
                  value={state.title}
                  onChange={handleChangeState}
                  type='text'
                  placeholder='제목을 입력해주세요'
                />
              </PostTitle>
              <PostContent>
                <textarea
                  name='content'
                  value={state.content}
                  onChange={handleChangeState}
                  type='text'
                  placeholder='내용을 입력해주세요'
                />
            </PostContent>
            <PostTitle>
              {/* <input type='text' placeholder='#해시태그, #최대5개, #쉼표필수' /> */}
              <TagBox
                name='tags'
                value={state.tags}
              />
            </PostTitle>
            <AddPhoto>
              <input
                name='photo'
                value={state.photo}
                onChange={handleChangeState}
                type='file'
                placeholder='사진등록'
              />
            </AddPhoto>
            </form>
          </BoxP>
          <PostBar>
            <WriteBtn>
              <button type='submit' onClick={handleSubmit}></button>
            </WriteBtn>
          </PostBar>
        </PageColor>
    </>
  )
}

export default Post;

const PageColor = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f2f2f2;
  h1 {
    margin: 0.7em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`

const Header = styled.div`
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  text-align: center;
  background-color: white;
`

const ArrowP = styled.div`
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

const BoxP = styled.div`
  width: calc(25% + 400px);
  height: calc(25% + 250px);
  padding-top: 20px;
  border-radius: 5px;
  background-color: white;
  color: #ABABAB;
`

const PostCategory = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #DFDFDF;
  span{
    padding: 0 15px;
    color: black;
    border-right: 2px solid 
  };
  input{
    padding: 10px 0;
    text-align: left;
    }
  label:last-child {
    padding-right: 15px;
  };
  select {
    font-size: 15px;
  }
`

const PostTitle = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #DFDFDF;
  input{
    width: calc(90% + 13px);
    padding: 20px 0;
    font-size: 15px;
    ::placeholder{
    font-size: 15px;
    }
  }
`

const PostContent = styled.div`
  width: calc(90% + 23px);
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #DFDFDF;
  margin: 0 auto;
  textarea{
    width: 100%;
    height: 245px;
    border: none;
    resize: none;
    padding: 10px 5px;
    font-size: 15px;
    color: gray;
    line-height: 1.5em;
    ::placeholder{
    font-size: 15px;
    }
  }
`

const AddPhoto = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  input{
    width: calc(90% + 13px);
    padding: 20px 0;
    ::placeholder{
      font-size: 15px;
    };
  };
`

const PostBar = styled.div`
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

const WriteBtn = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: calc(25% + 400px);
    height: 43px;
    background-color: #3EC192;
    color: white;
    font-size: 15px;
    border-radius: 5px;
    ::before{
      content : '등록하기';
    }
    :hover::before {
      content : '익명으로 등록됩니다 :)';
    }
  }
`