import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// ---------------------------basic of firebase set up----
const config = {
    apiKey: "AIzaSyB2Aa-GDQPY9nW5dU8G2jw6fOWk44jt4PI",
    authDomain: "crown-test-f5381.firebaseapp.com",
    databaseURL: "https://crown-test-f5381.firebaseio.com",
    projectId: "crown-test-f5381",
    storageBucket: "crown-test-f5381.appspot.com",
    messagingSenderId: "511970249585",
    appId: "1:511970249585:web:df0a010de64ee724f144d0",
    measurementId: "G-1NE1D3CJX8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// ------------------------------------------------------

// pull authentication of data into firebase of Database Method---------
export const createUserProfileDucoment = async (authUser, additionalData) => {
    if (!authUser) return;
    const userRef = firestore.doc(`users/${authUser.uid}`);
    const userSnapShop = await userRef.get();
    // console.log(userSnapShop);

    if (!userSnapShop.exists) {
        const { displayName, email } = authUser;
        const createdAt = new Date(); // the time that has been created for timing data

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log("error for creating user in database: ", error.message);
        }
    }
    return userRef;
};

export const convertCollectionsToObj = collectionsOfSnapShot => {
    const transformedCollections = collectionsOfSnapShot.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    // console.log(transformedCollections);
    return transformedCollections.reduce((accumulator, CurrentCollection) => {
        accumulator[CurrentCollection.title.toLowerCase()] = CurrentCollection;
        return accumulator;
    }, {});
};

// push shop data to firebase of database
export const addCollectionsToFirebase = async (
    collectionsKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionsKey);
    // console.log(collectionRef);
    // batch make sure that if data transifer fail in the middle of process then "hole transifer will fail !" not have transifered half data
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        //.doc() is in collectionRef path, call firestore to give the unique ID or YouDefind for each obj
        const newDocFef = collectionRef.doc();
        batch.set(newDocFef, obj);
    });
    return await batch.commit();
};

// below code is what you config with google auth-----------

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// ----------------------------
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export default firebase;
