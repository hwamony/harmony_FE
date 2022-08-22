import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Wrap, Desc, InputWrap, IconWrap, BtnWrap, Box } from './style';
import { RoleInput } from '../../components/Input';
import { RoleLabel } from '../../components/Label';
import { Button } from '../../components/Button';
import api from '../../api/AxiosManager';

const Role = () => {
  const family = ['아빠', '엄마', '외동', '첫째', '둘째', 'N째', '막내', '동거인'];
  const { register, handleSubmit } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.put('/user/role', data);
      console(response);
    } catch (err) {
      console.log('err>>', err.response.data);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onsubmit)}>
      <Box>
        <InputWrap>
          <Desc>역할을 선택해주세요!</Desc>
          {family.map((item, idx) => (
            <Wrap key={idx}>
              <RoleInput
                type="radio"
                name="role"
                id={item}
                value={item}
                ref={register({ require: true })}
              ></RoleInput>
              <IconWrap>
                <img
                  src={`${process.env.PUBLIC_URL}/images/check_12px.png`}
                  alt="로고"
                />
              </IconWrap>
              <RoleLabel htmlFor={item}>{item}</RoleLabel>
            </Wrap>
          ))}
          <BtnWrap>
            <Button>다음으로</Button>
          </BtnWrap>
        </InputWrap>
      </Box>
    </Container>
  );
};

export default Role;
