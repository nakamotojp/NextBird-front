import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import Axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../reducers/user';

Axios.defaults.baseURL = 'http://localhost:3065/api';

function loginAPI(loginData) {
  return Axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function logoutAPI() {
  //request to server
}

function signUpAPI(signUpData) {
  return Axios.post('/user/', signUpData);
}

function* login(action): Generator {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error,
    });
  }
}

function* logout(): Generator {
  try {
    yield call(logoutAPI);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error,
    });
  }
}

function* signUp(action): Generator {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error,
    });
  }
}

function* watchLogin(): Generator {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout(): Generator {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignup(): Generator {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}