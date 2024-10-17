import { auth } from "configs/firebase";
import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { IUser, userFetchMe } from "contexts/user";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, type RouteProps } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import Home from "../views/pages/home";
import RouterPath from "./routesContants";
import Header from "views/components/layouts/Header";
import Loading from "views/components/Commons/Loading";
import Footer from "views/components/layouts/Footer";

export const LayoutLoading = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    loading
  </div>
);

const getDynamicRouter = (
  deskTop: ReactNode,
  mobile: ReactNode,
  isMobile: boolean
) => <div>{isMobile ? mobile : deskTop}</div>;

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    {children}
    <Footer/>
  </div>
);

type CustomRouteProps = RouteProps;

export const ManageView = () => {
  const isMobile = useIsMobile();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const routes: CustomRouteProps[] = useMemo(
    () => [
      {
        path: RouterPath.BASE_URL,
        element: (
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        ),
        loader: undefined,
      },
    ],
    [isMobile]
  );

  const privateRoutes: CustomRouteProps[] = useMemo(() => [], []);

  const getRoutes = (isLogin: boolean) => {
    const r = new Array<CustomRouteProps>();
    r.push(...routes);
    if (isLogin) r.push(...privateRoutes);
    return r.map((p, i) => <Route key={i} {...p} />);
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
  const isLogin = useAppSelector((state) => state.auth.isLogin);

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
        dispatch(authLogged());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loading/>;
  return <ManageView />;
}
