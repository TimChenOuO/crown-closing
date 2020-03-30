import shopActionTypes from "./shop-types";

export const fetchCollections = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS,
    payload: collectionsMap
});
