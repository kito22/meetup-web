import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/session', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    toast.error(
      'Não foi possível realizar o login, verifique os dados informados'
    );
    yield put(signInFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, '/users', {
      name,
      email,
      password,
    });
    history.push('/');
  } catch (error) {
    toast.error('Erro ao realizar cadastro, verifique seus dados');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/LOGOUT_REQUEST', logout),
]);
