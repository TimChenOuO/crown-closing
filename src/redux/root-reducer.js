import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart-reducer";
import directoryReducer from "./directory/directory";
import shopReducer from "./shop/shop-reducer";
import navBarReducer from "./nav-bar/navbar-reducer";

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["cart"],
    blacklist: ["shop"]
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    navBar: navBarReducer
});

export default persistReducer(persistConfig, rootReducer);
