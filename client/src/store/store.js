import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth-slice/user";
import otpSlice from "./auth-slice/otpSlice";
import brandSlice from "./product/brandSlice";
import bikeSlice from "./product/bikeSlice";
import partSlice from "./product/partsSlice";
import compareSlice from "./product/compareSlice";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import orderSlice from "./order/orderSlice";
import paymentSettingsSlice from "./order/paymentSettingsSlice";
import couponSlice from "./order/couponSlice";
import supportSlice from "./order/supportSlice";
import addressSlice from "./order/addressSlice";
import { setAuthDispatch } from "@/api";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    otp: otpSlice,
    brand: brandSlice,
    bike: bikeSlice,
    parts: partSlice,
    compare: compareSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    paymentSettings: paymentSettingsSlice,
    coupon: couponSlice,
    support: supportSlice,
    address: addressSlice,
  },
});

setAuthDispatch(store.dispatch);

export const persistor = persistStore(store);

export default store;
