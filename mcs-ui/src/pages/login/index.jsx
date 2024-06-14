import "./index.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Message from "antd/lib/message";

import UserOutlined from "@ant-design/icons/UserOutlined";
import KeyOutlined from "@ant-design/icons/KeyOutlined";

import LLILogo from "../../assets/images/MDLD.jpg";

import { login } from "../../actions/login.js";

import { encryptedString } from "../../utils/crypt.js";

const Login = (props) => {
  const { loginLoading, loginSuccess, loginFailed, loginData, onLogin } = props;

  const onSubmit = async (values) => {
    await onLogin(values);
  };

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = encryptedString("/home");
    }

    if (loginFailed) {
      Message.error("Incorrect Email/Password!");
    }
  }, [loginSuccess, loginFailed, loginData]);

  return (
    <Row className="login-page">
      <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <Col xs={24} lg={12}>
        <Row className="login-content" justify="center" align="middle">
          <Col className="portal-info" xs={24} md={12}>
            <div className="image-container">
              <img className="lli-logo" src={LLILogo} alt="lli" />
            </div>
            <div className="portal-name">MDLD PORTAL</div>
          </Col>
          <Col className="login-form" xs={24} md={12}>
            <div className="login-header">
              <UserOutlined className="user-icon" />
              <div className="title">WELCOME BACK!</div>
            </div>
            <div className="field-label">Username</div>
            <Form name="login form" onFinish={onSubmit} autoComplete="off">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <div className="field-label">Password</div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password prefix={<KeyOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  className="login-btn"
                  loading={loginLoading}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    loginLoading: state.login.loginLoading,
    loginSuccess: state.login.loginSuccess,
    loginFailed: state.login.loginFailed,
    loginData: state.login.loginData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (credential) => dispatch(login(credential)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
