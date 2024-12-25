import { officeFetch } from "contexts/business";
import { useAppDispatch } from "contexts/hooks";
import { useEffect, useCallback } from "react";

const useFetchOffice = () => {
  const dispatch = useAppDispatch();

  const fetchOffices = useCallback(() => {
    dispatch(officeFetch());
  }, [dispatch]);

  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  return { refetch: fetchOffices };
};

export default useFetchOffice;