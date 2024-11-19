import { auth } from "configs/firebase";
import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { IUser, userFetchMe, userLogOut } from "contexts/user";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, type RouteObject } from "react-router-dom";
import Loading from "views/components/Commons/Loading";
import Footer from "views/components/layouts/Footer";
import Header from "views/components/layouts/Header";
import DashboardAdminLayoutScreen from "views/pages/Admin";
import CreateBusiness from "views/pages/Admin/screens/Create";
import ListBusiness from "views/pages/Admin/screens/List";
import History from "views/pages/Chat/Screens/History";
import Question from "views/pages/Chat/Screens/Question";
import DocumentDetail from "views/pages/DocumentDetail";
import Home from "views/pages/home";
import DashboardLayoutScreen from "../views/pages/Chat";
import RouterPath from "./routesContants";
import UpdateBusiness from "views/pages/Admin/screens/Update";
import OfficeScreen from "views/pages/Office";
import AdminView from "views/pages/Admin/screens/AdminView";

const LoadingView = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loading className="w-30 h-30" />
    </div>
  );
};

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
            element: <History />,
          },
        ],
      },
      {
        path: RouterPath.DOCUMENT,
        element: (
          <DefaultLayout>
            <DocumentDetail />
          </DefaultLayout>
        ),
      },
      {
        path: RouterPath.ADMIN,
        element: <DashboardAdminLayoutScreen />,
        children: [
          {
            path: RouterPath.ADMIN,
            element: <ListBusiness />,
          },
          {
            path: RouterPath.ADMIN_BUSINESS,
            element: <CreateBusiness />,
          },
          {
            path: RouterPath.ADMIN_VIEW ,
            element: <AdminView/>,
          },
        ],
      },
      {
        path: RouterPath.ADMIN_BUSINESS_DETAIL,
        element: <UpdateBusiness />,
      },
      {
        path: RouterPath.OFFICE,
        element: (
          <DefaultLayout>
            <OfficeScreen />
          </DefaultLayout>
        ),
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
