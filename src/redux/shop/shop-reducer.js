// import SHOP_DATA from "./shop-data";
import shopActionTypes from "./shop-types";

const INITIAL_STATE = {
    collections: null,
    isfetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isfetching: true
            };
        case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isfetching: false,
                collections: action.payload
            };
        case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isfetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default shopReducer;
