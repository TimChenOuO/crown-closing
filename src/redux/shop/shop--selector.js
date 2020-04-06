import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => (collections === null ? [] : Object.values(collections)) // Object.values() will return array
);

export const selectCollection = collectionMatchParam =>
    createSelector(
        [selectCollections],
        collections => collections[collectionMatchParam]
    );

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isfetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);
