import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import appConstants from '../utils/constants';
import { logError } from '../utils/logger';

type FetchDataArgs = {
  onError?: (err: AxiosError) => void;
};

const useFetchData = <T>(init: T | null = null) => {
  const [data, setData] = useState(init);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    endpoint: string,
    { onError }: FetchDataArgs = {}
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(`${appConstants.api}/${endpoint}`);

      setData(res.data.data);
    } catch (e) {
      const err = e as AxiosError;
      if (onError) onError(err);
      logError('App Error', err);
    }
    setLoading(false);
  };

  return { data, loading, fetchData };
};

export default useFetchData;
