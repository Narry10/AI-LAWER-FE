import { officeClientFetch } from "contexts/business";
import { useAppDispatch } from "contexts/hooks";
import { useEffect } from "react";

const useFetchClientoffice = (ref_id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ref_id) {
      dispatch(
        officeClientFetch({
          ref_id: ref_id,
        })
      );
    }
  }, [ref_id]);
};

export default useFetchClientoffice;
