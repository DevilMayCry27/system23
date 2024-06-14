import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import "./App.scss";
import Layout from "antd/lib/layout";

import LoginPage from "./login";
import HomePage from "./home";

import SideMenu from "../components/sidemenu";
import MainHeader from "../components/mainheader";

import Router from "../utils/router.js";

import { getUserAccess } from "../actions/access.js";
import { getItem } from "../utils/storage.js";

import { decryptedString } from "../utils/crypt.js";

import { adminRoutes } from "../routes/adminRoutes.jsx";
import { medicalRoutes } from "../routes/medicalRoutes.jsx";
import { reportRoutes } from "../routes/reportRoutes.jsx";

import useScreenSize from "../hooks/useScreenSize.jsx";
import ProfilePage from "./profile/index.jsx";

const { Content } = Layout;

function App(props) {
  const {
    authAccessSuccess,
    authAccessFailed,
    authAccessData,
    onGetUserAccess,
  } = props;
  const location = useLocation();
  const { isMobile } = useScreenSize();
  const isAuthenticated = getItem("hcp-app")?.token;
  const [access, setAccess] = useState({});

  const getData = async () => {
    await onGetUserAccess();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (authAccessSuccess) {
      setAccess(authAccessData);
    }

    if (authAccessFailed) {
      console.log("User Access Failed...");
    }
  }, [authAccessSuccess, authAccessFailed, authAccessData]);

  const routes = [
    {
      path: "/",
      exact: true,
      auth: false,
      accessible: true,
      component: LoginPage,
    },
    {
      path: "/home",
      exact: true,
      auth: false,
      accessible: true,
      component: HomePage,
    },
    {
      path: "/profile-page",
      exact: true,
      auth: true,
      accessible: true,
      component: ProfilePage,
    },
    ...adminRoutes,
    ...medicalRoutes,
    ...reportRoutes,
  ];

  const path = ["/"].includes(location.pathname)
    ? location.pathname
    : decryptedString(location.pathname.substring(1));

  const isPublic = ["/"].includes(path);

  return (
    <Layout className="main-app">
      {!isPublic && isAuthenticated && (
        <SideMenu isMobile={isMobile} path={path} access={access} />
      )}
      <Layout>
        {!isPublic && isAuthenticated && <MainHeader />}
        <Content className="main-content">
          <Router
            routes={routes}
            isAuthenticated={isAuthenticated}
            isMobileView={isMobile}
            path={path}
            access={access}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    authAccessLoading: state.access.authAccessLoading,
    authAccessSuccess: state.access.authAccessSuccess,
    authAccessFailed: state.access.authAccessFailed,
    authAccessData: state.access.authAccessData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetUserAccess: () => dispatch(getUserAccess()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
