import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import { types as routes } from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* homeRouteWatcher() {
  yield routeWatcher(routes.HOME, function* () {
    yield put(actions.loadUsers.request());
  });
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => {
    return request({
      url: `/users/`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {},
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `/users/${id}`,
      method: "delete",
      body: values,
    });
  },
});

export const sagas = [
  homeRouteWatcher(),
  loadUsers.watcher(),
  deleteUser.watcher(),
];
