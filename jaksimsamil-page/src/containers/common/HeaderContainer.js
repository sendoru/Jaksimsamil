import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import {
  changeField,
  setBJID,
  getPROFILE,
  syncBJID,
  initializeProfile,
  setSLACK,
  setGOALNUM,
} from '../../modules/profile';

import { logout } from '../../modules/user';
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    ({ user, profile }) => ({
      user: user.user,
      profile: profile,
    }),
  );
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} profile={profile} onLogout={onLogout} />;
};
export default HeaderContainer;
