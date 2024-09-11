import { useAuthRequest } from "expo-auth-session/providers/google";
import { useAuthStore } from "../lib/zustand";
import { useEffect } from "react";
import { Platform } from "react-native";
import {
    GOOGLE_IOS_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_WEB_CLIENT_ID
} from "@env";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/firebase";
import { useRouter } from "expo-router";

export const useAuth = () => {
    const router = useRouter();
    const { user, loading, setUser, signInWithGoogle, logout } = useAuthStore();

    const [, response, promptAsync] = useAuthRequest({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        webClientId: GOOGLE_WEB_CLIENT_ID,
        responseType: Platform.OS === "web" ? "id_token" : "code"
    });

    useEffect(() => {
        if (response?.type === "success") signInWithGoogle(response);
    }, [response]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user!);
            if (user) {
                router.replace("/feed");
            }
        });

        return () => unsubscribe();
    }, []);

    return { user, loading, promptAsync, logout };
};
