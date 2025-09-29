import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { IUser, userFetchMe, userLogOut } from "contexts/user";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, type RouteObject } from "react-router-dom";
import { Spin } from "antd";

import { auth } from "configs/firebaseCore";
const LoadingView = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
};

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

type CustomRouteProps = RouteObject;

const ManageView = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const routes: CustomRouteProps[] = useMemo(() => [], []);

  const privateRoutes: CustomRouteProps[] = useMemo(() => [], []);

  const getRoutes = (isLogin: boolean) => {
    const allRoutes = [...routes];
    if (isLogin) allRoutes.push(...privateRoutes);

    return allRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element}>
        {route.children?.map((child, childIndex) => (
          <Route key={childIndex} path={child.path} element={child.element} />
        ))}
      </Route>
    ));
  };

  return (
    <Routes>
      {getRoutes(isLogin)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default function Router() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const mapUser: IUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };

        dispatch(userFetchMe(mapUser));
        dispatch(authLogged(null));
      } else {
        dispatch(userLogOut());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingView />;


  return (
      <ManageView />
  );
}
