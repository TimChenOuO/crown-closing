import {
    firestore,
    convertCollectionsToObj
} from "../../firebase/firebase-utils";

import shopActionTypes from "./shop-types";

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsfailure = errorMessage => ({
    type: shopActionTypes.fetchCollectionsfailure,
    payload: errorMessage
});

export const fetchCollectionsAsync = () => {
    // redux-thunk will provide a function with dispatch as parment that we can use
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart());

        const getCollections = async () => {
            try {
                const snapShot = await collectionRef.get();
                console.log(snapShot);
                const collectionsMap = convertCollectionsToObj(snapShot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            } catch (error) {
                dispatch(fetchCollectionsfailure(error.message));
            }
        };
        getCollections();
        // collectionRef
        //     .get()
        //     .then(snapShot => {
        //         const collectionsMap = convertCollectionsToObj(snapShot);
        //         dispatch(fetchCollectionsSuccess(collectionsMap));
        //     })
        //     .catch(error => dispatch(fetchCollectionsfailure(error.message)));
    };
};
