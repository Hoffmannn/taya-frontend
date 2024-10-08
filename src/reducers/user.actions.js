import { createAsyncAction } from "../utils/actionCreators";

export const actions = {
  loadUser: createAsyncAction("@user/LOAD"),
  createUser: createAsyncAction("@user/CREATE"),
};
