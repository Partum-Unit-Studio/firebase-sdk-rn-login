/* eslint-disable no-unused-vars */

import { AuthError, TokenResponse } from "expo-auth-session";
import { Auth, User } from "firebase/auth";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    signInWithGoogle: (response: AuthResponse) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
}

export type AuthResponse = {
    type: "error" | "success";
    errorCode: string | null;
    error?: AuthError | null;
    params: Record<string, string>;
    authentication: TokenResponse | null;
    url: string;
};
