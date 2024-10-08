import { createSyncAction } from "../utils/actionCreators";

export const types = {
  HOME: "@@routes/home",
  USER: "@@routes/user",
  CREATE: "@@routes/create",
};

export const actions = {
  redirectTo: (route, params = {}) => createSyncAction(route, params),
};
