import {useState, useEffect, useCallback} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OHM_BASE_URL} from '../constants/staging';

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [apiError, setApiError] = useState<null | string>(null);

  const source = axios.CancelToken.source();

  const axiosInstance = axios.create({
    baseURL: OHM_BASE_URL,
  });

  const fetchData = useCallback(
    async ({url = '', method = 'get', payload = null}) => {
      setLoading(true);
      setApiError(null);
      try {
        const accessToken = await AsyncStorage.getItem('@access_token');
        if (accessToken) {
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          const config: AxiosRequestConfig = {
            url,
            method,
            cancelToken: source.token,
          };
          if (payload) {
            config.data = payload;
          }
          const {data: response} = await axiosInstance.request(config);
          console.log(
            '🚀 ~ file: useApiRequest.tsx:34 ~ response:',
            JSON.stringify(response, null, 2),
          );
          setData(response);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(
          '🚀 ~ file: useDispatcherApis.tsx:18 ~ fetchData ~ error:',
          error,
        );
        setLoading(false);

        if (axios.isCancel(error)) {
          console.log(
            '🚀 ~ file: useDispatcherApis.tsx:29 ~ fetchData ~ error: Request Cancelled==>',
            error,
          );
        } else {
          setApiError(`Error: ${error?.message}`);
        }
        return error;
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance],
  );

  useEffect(() => {
    return () => {
      source.cancel('Component unmounted');
    };
  }, []);

  return {loading, data, apiError, fetchData};
};
