import { useEffect } from 'react';
import { historyFetch } from 'contexts/history/historyActions';
import { useAppDispatch } from 'contexts/hooks';

const useFetchHistory = (uid: string) => {
  const dispatch = useAppDispatch();
    
  useEffect(() => {
    if (uid) {
      dispatch(historyFetch({ uid }));
    }
  }, [uid, dispatch]);
};

export default useFetchHistory;
