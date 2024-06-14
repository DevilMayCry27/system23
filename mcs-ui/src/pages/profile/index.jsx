import React from "react";
import styles from "./index.module.scss";
import Tabs from "antd/lib/tabs";
import ProfileTab from "./tabs/ProfileTab";
import MedicalRecordsTab from "./tabs/MedicalRecordsTab";
import Apetab from "./tabs/ApeTab";
import LaboratoryTab from "./tabs/LaboratoryTab";

const ProfilePage = ({ access }) => {
  const items = [
    {
      key: "/profile-page",
      label: "Profile",
      children: <ProfileTab />,
    },
    {
      key: "medical-records",
      label: "Medical Records",
      children: <MedicalRecordsTab />,
    },
    {
      key: "ape-records",
      label: "APE Records",
      children: <Apetab />,
    },
    {
      key: "laboratory-records",
      label: "Laboratory Records",
      children: <LaboratoryTab />,
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <Tabs defaultActiveKey="1" tabBarGutter={16} items={items} />
    </div>
  );
};

export default ProfilePage;
