import { createAsyncAction } from "../utils/actionCreators";

export const actions = {
  loadUsers: createAsyncAction("@users/LOAD"),
  deleteUser: createAsyncAction("@user/DELETE"),
  saveUser: createAsyncAction("@user/SAVE"),
};
