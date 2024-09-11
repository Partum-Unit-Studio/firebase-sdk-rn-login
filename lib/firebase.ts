import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, Persistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
    FIREBASE_API_KEY as apiKey,
    FIREBASE_AUTH_DOMAIN as authDomain,
    FIREBASE_PROJECT_ID as projectId,
    FIREBASE_STORAGE_BUCKET as storageBucket,
    FIREBASE_MESSAGING_SENDER_ID as messagingSenderId,
    FIREBASE_APP_ID as appId,
    FIREBASE_MEASUREMENT_ID as measurementId
} from "@env";
import { Platform } from "react-native";

const FIREBASE_CONFIG = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};

const persistence: Persistence | Persistence[] =
    Platform.OS !== "web"
        ? getReactNativePersistence && getReactNativePersistence(ReactNativeAsyncStorage)
        : [];

export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence
});
