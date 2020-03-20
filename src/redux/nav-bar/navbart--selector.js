import { createSelector } from "reselect";

const selectNavBar = state => state.navBar;

export const selectNavBarHidden = createSelector(
    [selectNavBar],
    navBar => navBar.navBarHidden
);
