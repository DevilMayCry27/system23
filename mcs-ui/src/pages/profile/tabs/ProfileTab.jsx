import React, { useEffect, useState } from "react";
import connect from "react-redux/es/components/connect";

import { getCurrentUserProfileList } from "../../../actions/profile";
import { capitalize } from "../../../utils/sentence-formatter";
import styles from "./ProfileTab.module.scss";
import UpdateUserPasswordModal from "../modals/UpdateUserPasswordModal";

import { getProvinceListAction } from "../../../actions/province";
import { getMunicipalityListAction } from "../../../actions/municipality";
import UpdateProfileInfoModal from "../modals/UpdateProfileInfoModal";
import UpdateProfilePicModal from "../modals/UpdateProfilePicModal";
import UserAvatar from "../../../components/avatar/UserAvatar";

const ProfileTab = ({
  OnGetCurrentUserProfileList,
  profileListSuccess,
  profileListData = [],
}) => {
  const [currentUser, setCurrentUser] = useState({});

  const OnFetchData = async () => {
    await OnGetCurrentUserProfileList();
  };

  useEffect(() => {
    if (profileListSuccess && profileListData) {
      setCurrentUser(profileListData[0]);
    }
  }, [profileListSuccess, profileListData]);

  useEffect(() => {
    OnFetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.profileTab}>
        <div className={styles.left}>
          <div className={styles.configContainer}>
            <UpdateUserPasswordModal />
            <UpdateProfileInfoModal
              currentUser={currentUser}
              OnRefetchUser={OnFetchData}
            />
            <UpdateProfilePicModal
              currentUser={currentUser}
              OnRefetchUser={OnFetchData}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.profileContainer}>
            <UserAvatar src={currentUser.EmployeeCode} />
            <div className={styles.left}>
              <div>
                <p className={styles.title}>First name</p>
                <p>{capitalize(currentUser.FirstName)}</p>
              </div>
              <div>
                <p className={styles.title}>Middle name</p>
                <p>{capitalize(currentUser.MiddleName)}</p>
              </div>
              <div>
                <p className={styles.title}>Last name</p>
                <p>{capitalize(currentUser.LastName)}</p>
              </div>
              <div>
                <p className={styles.title}>Gender</p>
                <p>{capitalize(currentUser.Gender)}</p>
              </div>
              <div>
                <p className={styles.title}>Email</p>
                <p>{capitalize(currentUser.Email)}</p>
              </div>
              <div>
                <p className={styles.title}>Contact</p>
                <p>{capitalize(currentUser.ContactNo)}</p>
              </div>
            </div>
            <div className={styles.right}>
              <div>
                <p className={styles.title}>Department</p>
                <p>{currentUser.Department}</p>
              </div>
              <div>
                <p className={styles.title}>Department Section</p>
                <p>{capitalize(currentUser.Section)}</p>
              </div>
              <div>
                <p className={styles.title}>Provice</p>
                <p>{capitalize(currentUser.Province)}</p>
              </div>
              <div>
                <p className={styles.title}>Municipality</p>
                <p>{capitalize(currentUser.Municipality)}</p>
              </div>
              <div>
                <p className={styles.title}>Baranggay</p>
                <p>{capitalize(currentUser.Baranggay)}</p>
              </div>
              <div>
                <p className={styles.title}>Street</p>
                <p>{capitalize(currentUser.StreetNo)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <pre>
          <code>{JSON.stringify(currentUser, null, 2)}</code>
        </pre> */}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    profileListLoading: state.profile.profileListLoading,
    profileListSuccess: state.profile.profileListSuccess,
    profileListFailed: state.profile.profileListFailed,
    profileListData: state.profile.profileListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCurrentUserProfileList: () => dispatch(getCurrentUserProfileList()),
    OnGetProvinceListAction: () => dispatch(getProvinceListAction()),
    OnGetMunicipalityListAction: () => dispatch(getMunicipalityListAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
