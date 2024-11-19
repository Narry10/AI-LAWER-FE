import { useState, useEffect } from "react";
import { useAppSelector } from "contexts/hooks";
import RoleService from "server/role";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const uid = useAppSelector((state) => state.user.data?.uid);
    console.log("uid", uid);
    
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminList = await RoleService.getAdminUids();
        console.log("adminList", adminList);
        
        if (uid && adminList.find((adminUid) => adminUid === uid)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to fetch admin list:", error);
        setIsAdmin(false);
      }
    };

    fetchAdmins();
  }, [uid]);

  return isAdmin;
};

export default useAdmin;
