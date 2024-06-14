import React from "react";

import styles from "./UserAvatar.module.scss";
import Image from "antd/lib/image";

const UserAvatar = ({ src, width = 150, height = 150 }) => {
  // const bypassCache = new Date().getTime();

  const formatPicUrl = (empCode, extension) => {
    if (empCode === undefined) {
      empCode = "default";
    }
    return (
      process.env.REACT_APP_API_BASE_URL + `/profiles/${empCode}.${extension}`
    );
  };

  return (
    <div className={styles.pictureWrapper}>
      <Image
        width={width}
        height={height}
        // src={formatPicUrl(src, "jpg") + `?hash=${bypassCache}`}
        src={formatPicUrl(src, "jpg")}
        fallback={formatPicUrl("default", "jpg")}
      />
    </div>
  );
};

export default UserAvatar;
