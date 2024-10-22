import { auth } from "configs/firebase";
import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { IUser, userFetchMe } from "contexts/user";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Route, Routes, type RouteObject } from "react-router-dom";
import Loading from "views/components/Commons/Loading";
import Footer from "views/components/layouts/Footer";
import Header from "views/components/layouts/Header";
import useIsMobile from "../hooks/useIsMobile";
import DashboardLayoutScreen from "../views/pages/Chat";
import Home from "views/pages/home";
import RouterPath from "./routesContants";
import Question from "views/pages/Chat/Screens/Question";

const getDynamicRouter = (
  deskTop: ReactNode,
  mobile: ReactNode,
  isMobile: boolean
) => <div>{isMobile ? mobile : deskTop}</div>;

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

type CustomRouteProps = RouteObject;

const ManageView = () => {
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
      },
      {
        path: RouterPath.CHAT,
        element: <DashboardLayoutScreen />,
        children: [
          {
            path: RouterPath.CHAT_Question_Marriage,
            element: <Question />,
          },
          {
            path: `${RouterPath.CHAT_Question_Land}`,
            element: <Question />
          },
        ],
      },
    ],
    [isMobile]
  );

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
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
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
  }, [dispatch]);

  if (loading) return <Loading />;
  return <ManageView />;
}
