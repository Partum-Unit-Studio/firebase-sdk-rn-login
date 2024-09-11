import { create } from "zustand";
import { AuthState } from "../types/auth";
import { FIREBASE_AUTH } from "./firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    signInWithGoogle: async (response) => {
        set({ loading: true });
        try {
            const { id_token, access_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token, access_token);
            const userCredential = await signInWithCredential(FIREBASE_AUTH, credential);
            set({ user: userCredential.user });
        } catch (error) {
            console.error("Error al iniciar sesión con Google", error);
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            await FIREBASE_AUTH.signOut();
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            set({ loading: false });
        }
    },
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (loading) => set({ loading })
}));
