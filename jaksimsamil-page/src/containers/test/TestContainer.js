import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TestForm from '../../components/test/TestForm';
import { changeInnerField, getPROFILE, initializeProfile, initTest, updateTest, giveupTest } from '../../modules/profile';

const TestContainer = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, profile, loading } = useSelector(({ user, profile, loading }) => ({
    user: user.user,
    profile: profile,
    loading: loading
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeInnerField({
        outerKey: name.split('.')[0],
        innerKey: name.split('.')[1],
        value: value,
      }),
    );
  };

  const onInitTest = (e) => {
    e.preventDefault();
    let username = profile.username;
    let div = profile.testInfo.div;
    dispatch(initTest({ username, div }));
  };

  const onUpdateTest = (e) => {
    e.preventDefault();
    let username = profile.username;
    dispatch(updateTest({ username }));
  };

  const onGiveupTest = (e) => {
    e.preventDefault();
    let username = profile.username;
    dispatch(giveupTest({ username }));
  };

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다  ');
      history.push('/login');
    } else {
      let username = user.username;
      dispatch(getPROFILE({ username }));
      return () => {
        dispatch(initializeProfile());
      };
    }
  }, [dispatch, user, history]);
  useEffect(() => {

    if (loading['profile/INIT_TEST'] == true || loading['profile/UPDATE_TEST'] == true || loading['profile/GIVEUP_TEST'] == true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dispatch, loading]);
  console.log(profile);
  return <div>
    <TestForm type="setting" profile={profile} onChange={onChange} onInitTest={onInitTest} onUpdateTest={onUpdateTest} onGiveupTest={onGiveupTest} isLoading={isLoading}/>
  </div>
  ;
};
export default withRouter(TestContainer);
