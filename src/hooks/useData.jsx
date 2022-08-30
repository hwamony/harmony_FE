import { useQuery } from '@tanstack/react-query';
import { apis } from '../api/AxiosManager';
const hasToken = localStorage.getItem('TOKEN');

const getFamilyInfo = async () => {
  try {
    const res = await apis.getFamily();
    return res.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const useFamilyData = () =>
  useQuery(['familyInfo'], getFamilyInfo, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onSuccess: (data) => {
      console.log(data);
    },
  });

const getValidInfo = async () => {
  try {
    const res = await apis.getValidUser();
    return res.data.data;
  } catch (err) {
    localStorage.removeItem('TOKEN');
    window.location.href('/');
  }
};

export const useValidUserData = () =>
  useQuery(['validUserInfo'], getValidInfo, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onSuccess: (data) => {
      console.log(data);
    },
  });

const getFamilyCode = async () => {
  try {
    const res = await apis.getCode();
    return res.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const useFamilyCode = () =>
  useQuery(['familyCode'], getFamilyCode, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onSuccess: (data) => {
      console.log(data);
    },
  });
