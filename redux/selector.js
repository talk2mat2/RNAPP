import { createSelector } from "reselect";
export const CurrentUSER = (state) => state.userInfo.user;
export const currentUserToken = createSelector(
  CurrentUSER,
  (user) => user.token
);

export const loading = (state) => state.userInfo.loading;

export const errorMessage = (state) => state.userInfo.error;
export const currentUserDetails = createSelector(
  CurrentUSER,
  (user) => user.userdata
);
