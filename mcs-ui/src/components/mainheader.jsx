import { PageHeader } from "@ant-design/pro-layout";
import Avatar from "antd/lib/avatar";
import Dropdown from "antd/lib/dropdown";

import UserOutlined from "@ant-design/icons/UserOutlined";

import { deleteStorage, getItem } from "../utils/storage.js";
import { useDispatch } from "react-redux";
import { onExitApp } from "../reducers/features/switchAppSlice.js";
import { encryptedString } from "../utils/crypt.js";
import { useNavigate } from "react-router-dom";
const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(onExitApp());
    deleteStorage();

    window.location.href = "/";
  };

  const items = [
    {
      label: (
        <div
          className="logout-btn"
          onClick={() => navigate(encryptedString("/profile-page"))}
        >
          MY PROFILE
        </div>
      ),
    },
    {
      label: (
        <div className="logout-btn" onClick={() => logout()}>
          LOGOUT
        </div>
      ),
    },
  ];

  return (
    <PageHeader
      className="main-header"
      ghost={false}
      backIcon={null}
      onBack={() => window.history.back()}
      extra={[
        <Dropdown
          key={1}
          menu={{
            items,
          }}
          trigger="click"
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Avatar className="user-avatar" icon={<UserOutlined />} />
        </Dropdown>,
      ]}
    >
      <div className="loggedin-info">
        <div className="user-name">{getItem("hcp-app")?.user?.name}</div>
        <div className="user-position">
          {getItem("hcp-app")?.user?.position}
        </div>
      </div>
    </PageHeader>
  );
};

export default MainHeader;

// const MainHeader = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logout = () => {
//     dispatch(onExitApp());
//     deleteStorage();

//     window.location.href = "/";
//   };

//   // const navigate = (url) => {
//   //   window.location.href = encryptedString(url);
//   // };

//   const menu = (
//     <Menu
//       items={[
//         {
//           label: (
//             <div
//               className="logout-btn"
//               onClick={() => navigate(encryptedString("/profile-page"))}
//             >
//               MY PROFILE
//             </div>
//           ),
//         },
//         {
//           label: (
//             <div className="logout-btn" onClick={() => logout()}>
//               LOGOUT
//             </div>
//           ),
//         },
//       ]}
//     />
//   );

//   return (
//     <PageHeader
//       className="main-header"
//       ghost={false}
//       backIcon={null}
//       onBack={() => window.history.back()}
//       extra={[
//         <Dropdown key={1} overlay={menu} placement="bottom" trigger="click">
//           <Avatar className="user-avatar" icon={<UserOutlined />} />
//         </Dropdown>,
//       ]}
//     >
//       <div className="loggedin-info">
//         <div className="user-name">{getItem("hcp-app")?.user?.name}</div>
//         <div className="user-position">
//           {getItem("hcp-app")?.user?.position}
//         </div>
//       </div>
//     </PageHeader>
//   );
// };

// export default MainHeader;
