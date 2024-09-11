import { StatusBar } from "expo-status-bar";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator
} from "react-native";
import { useAuth } from "./hooks/useAuth";

export default function App() {
    const { user, loading, promptAsync, logout } = useAuth();
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (user) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: user.photoURL! }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text>Welcome, {user.displayName}!</Text>

                <Pressable onPress={logout}>
                    <View style={styles.Btn}>
                        <Text style={styles.BtnText}>Cerrar sesión</Text>
                    </View>
                </Pressable>
                <StatusBar style="auto" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.GoogleHead}>
                Has login con <GoogleText />
            </Text>
            <GoogleButton promptAsync={promptAsync} />
            <StatusBar style="auto" />
        </View>
    );
}

function GoogleButton({ promptAsync }: { promptAsync: () => void }) {
    return (
        <Pressable onPress={() => promptAsync()}>
            <View style={styles.Btn}>
                <Text style={styles.BtnText}>Iniciar sesión con Google</Text>
            </View>
        </Pressable>
    );
}

function GoogleText() {
    return (
        <Text style={styles.GoogleText}>
            <Text style={styles.GoogleLetter1}>G</Text>
            <Text style={styles.GoogleLetter2}>o</Text>
            <Text style={styles.GoogleLetter3}>o</Text>
            <Text style={styles.GoogleLetter4}>g</Text>
            <Text style={styles.GoogleLetter5}>l</Text>
            <Text style={styles.GoogleLetter6}>e</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },

    Btn: {
        backgroundColor: "#4285F4",
        padding: 10,
        borderRadius: 5
    },
    BtnText: {
        color: "white",
        fontWeight: "bold"
    },

    GoogleHead: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    GoogleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    GoogleLetter1: {
        color: "#4285F4"
    },
    GoogleLetter2: {
        color: "#EA4335"
    },
    GoogleLetter3: {
        color: "#FBBC05"
    },
    GoogleLetter4: {
        color: "#4285F4"
    },
    GoogleLetter5: {
        color: "#34A853"
    },
    GoogleLetter6: {
        color: "#EA4335"
    }
});
