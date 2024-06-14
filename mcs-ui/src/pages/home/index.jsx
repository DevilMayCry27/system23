import React from "react";

import Row from "antd/lib/row";
import Col from "antd/lib/col";
import styles from "./index.module.scss";
import AppCard from "./components/AppCard";

import { APP_NAME } from "../../utils/constant";

const DashboardPage = ({ access }) => {
  return (
    <div className={styles.dashboardPage}>
      <Row justify="start" wrap={true} gutter={[24, 24]}>
        {Object.entries(APP_NAME)
          .filter(([key, value]) => value !== APP_NAME.DASHBOARD &&  access?.apps?.includes(value))
          .map(([key, value]) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={key}>
              <AppCard appName={value} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default DashboardPage;
