import styles from "./AppCard.module.scss";

import React from "react";
import Card from "antd/lib/card";
import { useDispatch, useSelector } from "react-redux";
import { onSwitchApp } from "../../../reducers/features/switchAppSlice";
import { message } from "antd/lib";

import CommLogo from '../../../assets/images/communication.png'
import MedLogo from '../../../assets/images/medical.png'

const { Meta } = Card;

const AppCard = ({ appName }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const activeApp = useSelector((state) => state.switchApp.activeApp);
  const dispatch = useDispatch();

  const handleSwitchApp = () => {
    dispatch(onSwitchApp(appName));
    messageApi.open({
      type: "success",
      content: `You switch to ${appName.toLowerCase()} app`,
    });
  };

  const isAppActive = appName === activeApp;

  return (
    <>
      {contextHolder}
      <Card
        className={`${styles.AppcardContainer} ${isAppActive && styles.active}`}
        bordered={true}
        cover={
          <img
            alt="example"
            src={appName === 'COMMUNICATION' ? CommLogo : MedLogo}
            className={styles.appLogo}
          />
        }
        onClick={handleSwitchApp}
      >
        <Meta title={`${appName} APP`} description="" />
      </Card>
    </>
  );
};

export default AppCard;
