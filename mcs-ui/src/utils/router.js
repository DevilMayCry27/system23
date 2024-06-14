import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

export default function Router(props) {
  const { routes, isAuthenticated, isMobileView, path, access } = props;

  return (
    <Routes location={path}>
      {window.scrollTo(0, 0)}
      {routes.map((route, index) => {
        return (
          <Route
            path={route.path}
            exact={route.exact}
            element={
              !route.auth || (route.auth && isAuthenticated) ? (
                <route.component isMobileView={isMobileView} access={access} />
              ) : (
                <Navigate to={"/"} />
              )
            }
            key={index}
          />
        );
      })}
    </Routes>
  );
}
