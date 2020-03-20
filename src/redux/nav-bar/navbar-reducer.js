import { navBarActionType } from "./navbar-type";

const INITIAL_STATE = {
    navBarHidden: true
};

const navBarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case navBarActionType.NAV_BAR_HIDDEN:
            return { ...state, navBarHidden: !state.navBarHidden };
        default:
            return state;
    }
};

export default navBarReducer;
