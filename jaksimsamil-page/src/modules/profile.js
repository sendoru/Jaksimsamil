import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import produce from 'immer';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'profile/INITIALIZE';
const CHANGE_FIELD = 'profile/CHANGE_FIELD';
const CHANGE_INNER_FIELD = 'profile/CHANGE_INNER_FIELD'
const [SET_BJID, SET_BJID_SUCCESS, SET_BJID_FAILURE] = createRequestActionTypes(
  'profile/SET_BJID',
);
const [
  SET_SLACK,
  SET_SLACK_SUCCESS,
  SET_SLACK_FAILURE,
] = createRequestActionTypes('/profile/SET_SLACK');
const [
  SET_GOALNUM,
  SET_GOALNUM_SUCCESS,
  SET_GOALNUM_FAILURE,
] = createRequestActionTypes('/profile/SET_GOALNUM');
const [
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
] = createRequestActionTypes('profile/GET_PROFILE');

const [
  SYNC_BJID,
  SYNC_BJID_SUCCESS,
  SYNC_BJID_FAILURE,
] = createRequestActionTypes('profile/SYNC_BJID');
const [
  INIT_TEST,
  INIT_TEST_SUCCESS,
  INIT_TEST_FAILURE,
] = createRequestActionTypes('profile/INIT_TEST');
const [
  UPDATE_TEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAILURE,
] = createRequestActionTypes('profile/UPDATE_TEST');
const [
  GIVEUP_TEST,
  GIVEUP_TEST_SUCCESS,
  GIVEUP_TEST_FAILURE,
] = createRequestActionTypes('profile/GIVEUP_TEST');

export const initializeProfile = createAction(INITIALIZE);
export const syncBJID = createAction(SYNC_BJID, ({ username }) => ({
  username,
}));

export const setSLACK = createAction(
  SET_SLACK,
  ({ username, slackWebHookURL }) => ({
    username,
    slackWebHookURL,
  }),
);

export const setGOALNUM = createAction(
  SET_GOALNUM,
  ({ username, goalNum }) => ({
    username,
    goalNum,
  }),
);
export const setBJID = createAction(SET_BJID, ({ username, userBJID }) => ({
  username,
  userBJID,
}));

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const changeInnerField = createAction(CHANGE_INNER_FIELD, ({ outerKey, innerKey, value }) => ({
  outerKey,
  innerKey,
  value,
}));

export const getPROFILE = createAction(GET_PROFILE, ({ username }) => ({
  username,
}));

export const initTest = createAction(INIT_TEST, ({ username, div }) => ({
  username,
  div,
}));

export const updateTest = createAction(UPDATE_TEST, ({ username }) => ({
  username,
}));

export const giveupTest = createAction(GIVEUP_TEST, ({ username }) => ({
  username,
}))

const initialState = {
  username: '',
  userBJID: '',
  solvedBJ: '',
  friendList: [],
  profileError: '',
  slackWebHookURL: '',
  solvedBJ_date: '',
  goalNum: 0,
  userTier: -1,
  userRating: -1,
  testInfo: {
    inProgress: false,
    div: 4,
  }
};
const getPROFILESaga = createRequestSaga(GET_PROFILE, profileAPI.getPROFILE);
const setBJIDSaga = createRequestSaga(SET_BJID, profileAPI.setBJID);
const setSLACKSaga = createRequestSaga(SET_SLACK, profileAPI.setPROFILE);
const setGOALNUMSaga = createRequestSaga(SET_GOALNUM, profileAPI.setPROFILE);
const syncBJIDSaga = createRequestSaga(SYNC_BJID, profileAPI.syncBJ);
const initTestSaga = createRequestSaga(INIT_TEST, profileAPI.initTest);
const updateTestSaga = createRequestSaga(UPDATE_TEST, profileAPI.updateTest);
const giveupTestSaga = createRequestSaga(GIVEUP_TEST, profileAPI.giveupTest);

export function* profileSaga() {
  yield takeLatest(SET_BJID, setBJIDSaga);
  yield takeLatest(GET_PROFILE, getPROFILESaga);
  yield takeLatest(SYNC_BJID, syncBJIDSaga);
  yield takeLatest(SET_SLACK, setSLACKSaga);
  yield takeLatest(SET_GOALNUM, setGOALNUMSaga);
  yield takeLatest(INIT_TEST, initTestSaga);
  yield takeLatest(UPDATE_TEST, updateTestSaga);
  yield takeLatest(GIVEUP_TEST, giveupTestSaga);
}

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [CHANGE_INNER_FIELD]: (state, { payload: { outerKey, innerKey, value } }) =>
      produce(state, (draft) => {
        draft[outerKey][innerKey] = value;
      }),
    [GET_PROFILE_SUCCESS]: (
      state,
      {
        payload: {
          username,
          userBJID,
          solvedBJ,
          friendList,
          slackWebHookURL,
          solvedBJ_date,
          goalNum,
          userTier,
          userRating,
          testInfo
        },
      },
    ) => ({
      ...state,
      username: username,
      userBJID: userBJID,
      solvedBJ: solvedBJ,
      friendList: friendList,
      profileError: null,
      slackWebHookURL: slackWebHookURL,
      solvedBJ_date: solvedBJ_date,
      goalNum: goalNum,
      userTier: userTier,
      userRating: userRating,
      testInfo: testInfo
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),

    [SET_BJID_SUCCESS]: (state, { payload: { userBJID } }) => ({
      ...state,
      userBJID: userBJID,
      profileError: null,
    }),
    [SET_BJID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SET_SLACK_SUCCESS]: (state, { payload: { slackWebHookURL } }) => ({
      ...state,
      slackWebHookURL: slackWebHookURL,
      profileError: null,
    }),
    [SET_SLACK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SET_GOALNUM_SUCCESS]: (state, { payload: { goalNum } }) => ({
      ...state,
      goalNum: goalNum,
    }),
    [SET_GOALNUM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SYNC_BJID_SUCCESS]: (state, { payload: { solvedBJ } }) => ({
      ...state,
      solvedBJ,
      profileError: null,
    }),
    [SYNC_BJID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [INIT_TEST_SUCCESS]: (state, { payload: { testInfo } }) => ({
      ...state,
      testInfo,
      profileError: null,
    }),
    [INIT_TEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [UPDATE_TEST_SUCCESS]: (state, { payload: { testInfo } }) => ({
      ...state,
      testInfo,
      profileError: null,
    }),
    [UPDATE_TEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [GIVEUP_TEST_SUCCESS]: (state, { payload: { testInfo } }) => ({
      ...state,
      testInfo,
      profileError: null,
    }),
    [GIVEUP_TEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
  },
  initialState,
);
