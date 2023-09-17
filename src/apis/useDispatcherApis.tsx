import {useCallback} from 'react';
import {useApiRequest} from './useApiRequest';

export const useDispatcherApis = () => {
  const {fetchData, loading, apiError, data} = useApiRequest();

  const fetchUsers = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/username_search';
    console.log('🚀 ~ file: useDispatcherApis.tsx:14 ~ fetchUsers ~ url:', url);
    fetchData({url, method: 'post', payload});
  }, []);

  const fetchServiceTypes = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/service_type';
    console.log(
      '🚀 ~ file: useDispatcherApis.tsx:20 ~ fetchServiceTypes ~ url:',
      url,
    );
    fetchData({url, method: 'POST', payload});
  }, []);

  const getLocationByName = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/get_location';
    console.log(
      '🚀 ~ file: useDispatcherApis.tsx:24 ~ getLocationByName ~ url:',
      url,
    );

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  const getNearbyProvidersOnManualType = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/nearby_providers';
    console.log(
      '🚀 ~ file: useDispatcherApis.tsx:34 ~ getNearbyProvidersOnManualType ~ url:',
      url,
    );

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  const createTrip = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/create_trip';
    console.log('🚀 ~ file: useDispatcherApis.tsx:44 ~ createTrip ~ url:', url);

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  const checkUser = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/check_user';
    console.log('🚀 ~ file: useDispatcherApis.tsx:51 ~ checkUser ~ url:', url);

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  // dispatcher_mobile/get_fare_estimate
  const getFareEstimateForTrip = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/get_fare_estimate';
    console.log('🚀 ~ file: useDispatcherApis.tsx:51 ~ checkUser ~ url:', url);

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  // dispatcher_mobile/get_distance_time
  const getDistanceAndTimeOfTrip = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/get_distance_time';
    console.log(
      '🚀 ~ file: useDispatcherApis.tsx:68 ~ getDistanceAndTimeOfTrip ~ url:',
      url,
    );

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  const getDispatcherDetails = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/get_dispatcher';
    console.log(
      '🚀 ~ file: useDispatcherApis.tsx:77 ~ getDispatcherDetails ~ url:',
      url,
    );

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  const getTripsList = useCallback(async ({payload}: any) => {
    const url = 'dispatcher_mobile/get_trip_list';

    fetchData({url, method: 'POST', payload: payload});
  }, []);

  return {
    loading,
    apiError,
    data,
    fetchUsers,
    getDispatcherDetails,
    fetchServiceTypes,
    getLocationByName,
    getNearbyProvidersOnManualType,
    createTrip,
    checkUser,
    getFareEstimateForTrip,
    getDistanceAndTimeOfTrip,
    getTripsList,
  };
};
