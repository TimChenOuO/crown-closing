import { takeLatest, call, put, all } from "redux-saga/effects";

import {
    firestore,
    convertCollectionsToObj,
} from "../../firebase/firebase-utils";

import shopActionTypes from "./shop-types";
import {
    fetchCollectionsSuccess,
    fetchCollectionsfailure,
} from "./shop-action";

export function* fetchCollectionsAsyncSaga() {
    yield console.log("I'm fired");
    try {
        const collectionRef = firestore.collection("collections");
        const snapShot = yield collectionRef.get();
        //Wanna control use call(someFunction, parameter that someFunction need)
        const collectionsMap = yield call(convertCollectionsToObj, snapShot);
        // pull is similar with dispatch in *function
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsfailure(error));
    }

    // const getCollections = async () => {
    //     try {
    //         const snapShot = await collectionRef.get();
    //         console.log(snapShot);
    //         const collectionsMap = convertCollectionsToObj(snapShot);
    //         dispatch(fetchCollectionsSuccess(collectionsMap));
    //     } catch (error) {
    //         dispatch(fetchCollectionsfailure(error.message));
    //     }
    // };
    // getCollections();
}

export function* fetchCollectionsStartSaga() {
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsyncSaga
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStartSaga)]);
}
