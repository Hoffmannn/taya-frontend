import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import { handleApiErrors } from "../utils/api";

export const apiWrapper = (apiPromise) => {
  return apiPromise.then(handleApiErrors).catch((error) => {
    throw error;
  });
};

export const genericErrorHandler = ({ error }) => {
  console.log({ error });
};

function* takeOneAndBlock(pattern, worker, ...args) {
  const task = yield fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield call(worker, ...args, action);
    }
  });
  return task;
}

const asyncFlow = ({
  actionGenerator,
  transform = (p) => p,
  api,
  preSuccess = () => {},
  postSuccess = () => {},
  preFailure = () => {},
  postFailure = genericErrorHandler,
}) => {
  return {
    handler: function* (action) {
      let values, response;
      try {
        values = yield transform(action.payload);
        response = yield call(apiWrapper, api(values));
        yield preSuccess({
          original: action.payload,
          values,
          response,
        });
        yield put(
          actionGenerator.success({
            original: action.payload,
            values,
            response,
          })
        );
        yield postSuccess({
          original: action.payload,
          values,
          response,
        });
      } catch (error) {
        const abort = yield preFailure({
          original: action.payload,
          values,
          response,
          error,
        });
        if (abort === true) return;
        yield put(
          actionGenerator.failure({
            original: action.payload,
            values,
            response,
            error,
          })
        );
        yield postFailure({
          original: action.payload,
          values,
          response,
          error,
        });
      }
    },
    watcher: function* () {
      yield takeOneAndBlock(actionGenerator.REQUEST, this.handler);
    },
  };
};

export default asyncFlow;
