import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sider from "antd/lib/layout/Sider";
import Menu from "antd/lib/menu";
import Avatar from "antd/lib/avatar";

import TagFilled from "@ant-design/icons/TagFilled";
import PushpinFilled from "@ant-design/icons/PushpinFilled";

import LLILogo from "../assets/images/MDLD.jpg";

import * as loginReducer from "../reducers/loginSlice.js";
import * as beneficiaryReducer from "../reducers/beneficiariesSlice.js";
import * as bloodtypeReducer from "../reducers/bloodtypeSlice.js";
import * as cityReducer from "../reducers/citySlice.js";
import * as civilstatusReducer from "../reducers/civilstatusSlice.js";
import * as companyReducer from "../reducers/companySlice.js";
import * as consultationreportReducer from "../reducers/consultationreportSlice.js";
import * as consultationReducer from "../reducers/consultationSlice.js";
import * as countryReducer from "../reducers/countrySlice.js";
import * as departmentReducer from "../reducers/departmentSlice.js";
import * as genderReducer from "../reducers/genderSlice.js";
import * as medicalrecordReducer from "../reducers/medicalrecordSlice.js";
import * as medicineReducer from "../reducers/medicineSlice.js";
import * as patientReducer from "../reducers/patientSlice.js";
import * as provinceReducer from "../reducers/provinceSlice.js";
import * as regionReducer from "../reducers/regionSlice.js";
import * as relationReducer from "../reducers/relationSlice.js";
import * as salesorderReducer from "../reducers/salesorderSlice.js";
import * as medicineapproverReducer from "../reducers/medicineapproverSlice.js";
import * as medicineorderReducer from "../reducers/medicineorderSlice.js";
import * as medicinereleaseReducer from "../reducers/medicinereleaseSlice.js";
import * as apeReducer from "../reducers/apeSlice.js";
import * as laboratoryReducer from "../reducers/laboratorySlice.js";
import * as sicknessReducer from "../reducers/sicknessSlice.js";
import * as uomReducer from "../reducers/uomSlice.js";

import { encryptedString } from "../utils/crypt.js";
import { sideMenus, module, APP_NAME } from "../utils/constant.js";
import { getModuleAccess } from "../utils/access.js";
import { onSwitchApp } from "../reducers/features/switchAppSlice";

const SideMenu = ({ isMobile, path, access }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);
  const [menus, setMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(isMobile);

  const activeApp = useSelector((state) => state.switchApp.activeApp);

  const rootSubmenuKeys = [
    "/department-list-page",
    "/job-position-list-page",
    "/work-section-list-page",
    "/user-list-page",
    "/audit-trail-page",
    "/forum-list-page",
    "/groupchat-list-page",
    "/company-list-page",
    "/department-list-page",
    "/section-list-page",
    "/gender-list-page",
    "/civilstatus-list-page",
    "/bloodtype-list-page",
    "/relationship-list-page",
    "/country-list-page",
    "/region-list-page",
    "/province-list-page",
    "/city-list-page",
    "/sales-list-page",
    "/medicineapprover-list-page",
    "/medicinerelease-list-page",
    "/ape-list-page",
    "/sickness-list-page",
    "/uom-list-page",
    "/dosage-list-page",
    "/laboratory-list-page",
  ];

  useEffect(() => {
    let tempMenu = [];

    sideMenus.forEach((menu) => {
      let tempSubMenu = [];

      menu.children.forEach((submenu) => {
        if (
          getModuleAccess(access[menu?.menu], module[submenu?.module])?.view &&
          (activeApp === submenu?.appName ||
            APP_NAME.DASHBOARD === submenu?.appName)
        ) {
          tempSubMenu.push({
            key: submenu.href,
            label: submenu.label,
            icon: <PushpinFilled />,
            onClick: () => redirect(encryptedString(submenu.href)),
          });
        }
      });

      if (tempSubMenu.length) {
        tempMenu.push({
          key: menu.key,
          label: menu.label,
          icon: <TagFilled />,
          children: tempSubMenu,
        });
      }
    });

    setMenus(tempMenu);
    // eslint-disable-next-line
  }, [access, activeApp]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const redirect = (path) => {
    dispatch(loginReducer.resetData());
    dispatch(beneficiaryReducer.resetData());
    dispatch(bloodtypeReducer.resetData());
    dispatch(cityReducer.resetData());
    dispatch(civilstatusReducer.resetData());
    dispatch(companyReducer.resetData());
    dispatch(consultationreportReducer.resetData());
    dispatch(consultationReducer.resetData());
    dispatch(countryReducer.resetData());
    dispatch(departmentReducer.resetData());
    dispatch(genderReducer.resetData());
    dispatch(medicalrecordReducer.resetData());
    dispatch(medicineReducer.resetData());
    dispatch(patientReducer.resetData());
    dispatch(provinceReducer.resetData());
    dispatch(regionReducer.resetData());
    dispatch(relationReducer.resetData());
    dispatch(salesorderReducer.resetData());
    dispatch(medicineapproverReducer.resetData());
    dispatch(medicineorderReducer.resetData());
    dispatch(medicinereleaseReducer.resetData());
    dispatch(apeReducer.resetData());
    dispatch(laboratoryReducer.resetData());
    dispatch(sicknessReducer.resetData());
    dispatch(uomReducer.resetData());

    navigate(path);
  };

  const goHome = () => {
    dispatch(onSwitchApp(APP_NAME.DASHBOARD));
    redirect(encryptedString("/home"));
  };

  return (
    <Sider
      className="side-menu"
      width={300}
      breakpoint="lg"
      collapsible
      collapsedWidth="0"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Avatar
        className="lli-avatar"
        size={isMobile ? 40 : 150}
        shape="circle"
        src={<img className="lli-logo" src={LLILogo} alt="lli" />}
        onClick={() => goHome()}
      />
      <Menu
        className="item-menu"
        mode="vertical"
        defaultSelectedKeys={[path]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={activeApp === APP_NAME.DASHBOARD ? [] : menus}
        triggerSubMenuAction="click"
      />
    </Sider>
  );
};

export default SideMenu;
