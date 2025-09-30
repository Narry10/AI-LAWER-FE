// src/routers/Router.tsx
import { authLogged } from "contexts/auth";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import {
  IUser,
  userFetchMe,
  userLogOut,
  userMetaFetching,
} from "contexts/user";
// Make sure IUser.sites is typed as string[]
import React, { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  type RouteObject,
  useLocation,
} from "react-router-dom";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "configs/firebaseCore";
import AdminLayout from "views/layouts/AdminLayout";
import HomeScreen from "../views/pages/users/HomeScreen";
import ProfileScreen from "../views/pages/users/ProfileScreen";
import UserSettingsScreen from "../views/pages/users/UserSettingsScreen";
import Posts from "../views/pages/users/Posts";
import PostDetail from "../views/pages/users/PostDetail";
import AdminDashboard from "../views/pages/admins/AdminDashboard";
import AdminUsersScreen from "../views/pages/admins/AdminUsersScreen";
import AdminSettingsScreen from "../views/pages/admins/AdminSettingsScreen";
import RouterPath from "./routesContants";
import UserLayout from "views/layouts/UserLayout";
import SigninScreen from "views/pages/SigninScreen";

const LoadingView = () => (
  <div className="h-screen flex items-center justify-center">
    <Spin />
  </div>
);

// ---------- Role helpers (ngắn gọn) ----------
type Role = "admin" | "member";
const ROLE_HOME: Record<Role, string> = {
  admin: RouterPath.USER, // "/admin"
  member: RouterPath.BASE_URL, // "/user"
};
const areaOf = (p: string): Role | null =>
  p.startsWith(RouterPath.USER)
    ? "admin"
    : p.startsWith(RouterPath.BASE_URL)
    ? "member"
    : null;

// Guard rất ngắn: phải login & role khớp khu vực
const RoleGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const me = useAppSelector((s) => s.user.data as IUser | null);
  const { pathname } = useLocation();
  if (!me?.uid) return <Navigate to={RouterPath.AUTH} replace />;
  if (!me.role) return <LoadingView />;

  const area = areaOf(pathname);
  if (!area) return <Navigate to={ROLE_HOME[me.role as Role]} replace />;
  if (me.role !== area) return <Navigate to={RouterPath.AUTH} replace />;
  return <>{children}</>;
};

// ---------- Centralized menu items (giữ nguyên) ----------
export const userMenuItems = [
  { key: "1", label: "Dashboard", path: RouterPath.USER },
  { key: "2", label: "Users", path: `${RouterPath.USER}/profile` },
  { key: "3", label: "Settings", path: `${RouterPath.USER}/settings` },
];

export const adminMenuItems = [
  { key: "1", label: "Dashboard", path: RouterPath.USER },
  { key: "2", label: "Users", path: `${RouterPath.Admin}/users` },
];

const ManageView = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const me = useAppSelector((s) => s.user.data as IUser | null);

  // --- User routes (bọc RoleGate) ---
  const userRoutes: RouteObject[] = [
    {
      path: RouterPath.USER,
      element: <UserLayout />,
      children: [
        { index: true, element: <HomeScreen /> },
        { path: "profile", element: <ProfileScreen /> },
        { path: "settings", element: <UserSettingsScreen /> },
        // Workspace routes
        { path: "workspace/:id", element: <Posts /> },
        { path: "workspace/:id/post/:slug", element: <PostDetail /> },
      ],
    },
  ];

  // --- Admin routes (bọc RoleGate) ---
  const adminRoutes: RouteObject[] = [
    {
      path: RouterPath.Admin,
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "users", element: <AdminUsersScreen /> },
        { path: "settings", element: <AdminSettingsScreen /> },
      ],
    },
  ];

  const routes: RouteObject[] = useMemo(
    () => [
      ...userRoutes,
      ...adminRoutes,
      { path: RouterPath.AUTH, element: <SigninScreen /> },
    ],
    [me?.uid, me?.role]
  );

  const privateRoutes: RouteObject[] = useMemo(() => [], []);

  const getRoutes = (signedIn: boolean) => {
    const all = [...routes, ...(signedIn ? privateRoutes : [])];
    return all.map((route, idx) => (
      <Route key={idx} path={route.path} element={route.element}>
        {route.children?.map((child, cidx) => (
          <Route
            key={cidx}
            path={child.path}
            element={child.element}
            index={child.index}
          />
        ))}
      </Route>
    ));
  };

  return (
    <Routes>
      {getRoutes(isLogin)}
      <Route path="*" element={<Navigate to={RouterPath.AUTH} replace />} />
    </Routes>
  );
};

export default function Router() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const roleUser = useAppSelector((s) => s.user.data?.role);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          let mapUser: IUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
            role: undefined,
            sites: [],
          };
          // nạp role + sites
          dispatch(userMetaFetching(mapUser.uid));
          dispatch(userFetchMe(mapUser));
          dispatch(authLogged(null));
        } else {
          dispatch(userLogOut());
        }
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // ... other imports

  // inside Router component
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleUser) {
      navigate(RouterPath.AUTH, { replace: true });
    } else if (roleUser === "admin") {
      navigate(RouterPath.USER, { replace: true });
    } else if (roleUser === "user") {
      navigate(RouterPath.USER, { replace: true });
    }
  }, [roleUser]);

  if (loading) return <LoadingView />;
  return <ManageView />;
}
