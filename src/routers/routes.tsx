import { auth } from "configs/firebase";
import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { IUser, userFetchMe, userLogOut } from "contexts/user";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, type RouteObject } from "react-router-dom";
import Loading from "views/components/Commons/Loading";
import Footer from "views/components/layouts/Footer";
import Header from "views/components/layouts/Header";
import Question from "views/pages/Chat/Screens/Question";
import Home from "views/pages/home";
import DashboardLayoutScreen from "../views/pages/Chat";
import RouterPath from "./routesContants";
import History from "views/pages/Chat/Screens/History";

const LoadingView = () => {
  return <div className="h-screen flex items-center justify-center">
    <Loading className="w-30 h-30"/>
  </div>;
};

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
            path: RouterPath.CHAT,
            element: <Question />,
          },
          {
            path: `${RouterPath.CHAT_HISTORY}`,
            element: <History/>
          },
        ],
      },
    ],
    []
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
        console.log(user);
        
        const mapUser: IUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };

        dispatch(userFetchMe(mapUser));
        dispatch(authLogged());
      } else {
        dispatch(userLogOut());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingView />;
  return <ManageView />;
}
