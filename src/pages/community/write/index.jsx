import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../../components/common/PageTitle';
import Tag from '../../../components/community/Tag';
import WriteActionButtons from '../../../components/community/WriteActionButtons';
import { IoIosArrowBack } from 'react-icons/io';

const Post = () => {
  const navigate = useNavigate();

  const axiosAdd = async (Selected, title, content, tags, image) => {
    try {
      let data = {
        category: Selected,
        title: title,
        content: content,
        tags: tags,
        image: image
      };

      const res = await axios.post(`http://43.200.174.197/api/posts`, data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [Selected, setSelected] = useState('');

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const title = React.useRef(null);
  const content = React.useRef(null);
  const tags = React.useRef(null);
  const image = React.useRef(null);

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
                {/* <span>카테고리</span>
                <label><input type='radio' name='category'/> 아빠</label>
                <label><input type='radio' name='category' /> 엄마</label>
                <label><input type='radio' name='category' /> 외동</label>
                <label><input type='radio' name='category' /> 첫째</label>
                <label><input type='radio' name='category' /> N째</label>
                <label><input type='radio' name='category' /> 막내</label>
                <label><input type='radio' name='category'/> 동거인</label> */}
                <select onChange={handleSelect}>
                  <option defaultValue>Category</option>
                  <option value='아빠'>아빠</option>
                  <option value='엄마'>엄마</option>
                  <option value='외동'>외동</option>
                  <option value='첫째'>첫째</option>
                  <option value='N째'>N째</option>
                  <option value='막내'>막내</option>
                  <option value='동거인'>동거인</option>
                </select>
              </PostCategory>
              <PostTitle>
                <input type='text' placeholder='제목을 입력해주세요' />
              </PostTitle>
              <PostContent>
                <textarea type='text' placeholder='내용을 입력해주세요' ref={content} />
            </PostContent>
            <PostTitle>
              {/* <input type='text' placeholder='#해시태그, #최대5개, #쉼표필수' /> */}
              <Tag />
            </PostTitle>
            <AddPhoto>
              <input type='file' placeholder='사진등록' />
            </AddPhoto>
            </form>
          </BoxP>
          <PostBar>
            <WriteActionButtons 
            onClick={() => {
              if (
                Selected != "" &&
                title.current.value !="" &&
                content.current.value != "" &&
                tags.current.value !="" &&
                image.current.value !=""
              ){
                axiosAdd(Selected, title.current.value, content.current.value, tags.current.value, image.current.value);
                navigate.push('/api/community');
                window.location.reload();
              } else {
                window.alert('입력하지 않은 항목이 있습니다.');
              }
            }}
            />
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
  height: calc(25% + 350px);
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
    text-alignment: left;
    }
  };
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
  height: 90px;
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

// import React from "react";
// import Editor from "../../components/community/write/Editor";
// import Responsive from "../../components/common/Responsive";

// const WritePage = () => {
//     return(
//         <Responsive>
//             <Editor />
//         </Responsive>
//     )
// }

// export default WritePage;