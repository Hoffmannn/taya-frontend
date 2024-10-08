import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { actions as homeActions } from "../reducers/home.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/users/${values.id}`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: homeActions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `/users/`,
      method: "put",
      body: { id, ...values },
      mockResult: {},
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

const createUser = asyncFlow({
  actionGenerator: actions.createUser,
  transform: function* (payload) {
    return payload;
  },
  api: ({ ...values }) => {
    return request({
      url: `/users/`,
      method: "post",
      body: { ...values },
      mockResult: {},
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  createUser.watcher(),
];
