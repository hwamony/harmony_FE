import { useQuery } from '@tanstack/react-query';
import api, { apis } from '../api/AxiosManager';
const hasToken = localStorage.getItem('TOKEN');

const getFamilyInfo = async () => {
  try {
    const res = await apis.getFamily();
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const useFamilyData = () =>
  useQuery(['familyInfo'], getFamilyInfo, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
  });

const getValidInfo = async () => {
  try {
    const res = await apis.getValidUser();
    return res.data.data;
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

export const useFamilyCode = () =>
  useQuery(['familyCode'], getFamilyCode, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

const getRankings = async () => {
  try {
    const res = await api.get(`/rankings`);
    return res.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const useRankings = () =>
  useQuery(['familyRankings'], getRankings, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      console.log(data);
    },
  });

const getAlbums = async (scheduleId) => {
  const res = await api.get(`/schedules/${scheduleId}/galleries`);
  return res.data.data;
};

export const useAlbumsData = (scheduleId) =>
  useQuery(['albums', scheduleId], () => getAlbums(scheduleId), {
    refetchOnWindowFocus: false,
  });

const getUserProfile = async () => {
  try {
    const res = await api.get(`/mypage`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const useUserProfile = () =>
  useQuery(['userprofile'], getUserProfile, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
  });

const getUserNickname = async () => {
  try {
    const res = await apis.getNickname();
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const useUserNickname = () =>
  useQuery(['usernickname'], getUserNickname, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

const getUserNotifications = async () => {
  try {
    const res = await api.get(`/notifications`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const useUserNotifications = () =>
  useQuery(['usernotifications'], getUserNotifications, {
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
  });
