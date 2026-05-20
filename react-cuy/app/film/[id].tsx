import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { API_URL, genreNames, useResponsiveColumns } from "../config";
import { NavigationBar } from "../components/NavigationBar";

type Person = {
    id: number;
    name: string;
    image?: string;
};

type FilmDetail = {
    id: number;
    title: string;
    description: string;
    tanggal_rilis: string;
    image?: string;
    genre?: Array<{ name: string }>;
    sutradara?: Person[];
    pemeran?: Person[];
};

export default function FilmDetailScreen() {
    const { id } = useLocalSearchParams();
    const [film, setFilm] = useState<FilmDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("sutradara");
    const { itemWidth } = useResponsiveColumns({ containerPadding: 20, gap: 16 });
    const { width } = useWindowDimensions()

    const isMediumScreen = width >= 768

    useEffect(() => {
        const movieId = Number(id);
        if (!movieId) {
            setIsLoading(false);
            return;
        }

        const loadDetail = async () => {
            try {
                const response = await fetch(`${API_URL}/film/${movieId}`);
                const json = await response.json();
                setFilm(json.data ?? null);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDetail();
    }, [id]);

    return (
        <View style={styles.page}>
            <Stack.Screen options={{ title: film?.title ?? "Detail Film" }} />
            <NavigationBar />
            <ScrollView contentContainerStyle={styles.container}>
                <Link href="/film" style={styles.backLink}>
                    <Text style={styles.backText}>← Kembali ke daftar Film</Text>
                </Link>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#F97316" />
                ) : film ? (
                    <>
                        <View style={[styles.hero, isMediumScreen && styles.heroDesktop]}>
                            <View style={styles.heroOverlay} />
                            <View style={styles.heroCircle} />
                            <Image source={{ uri: `${API_URL}${film.image}` }} style={[styles.heroImage, isMediumScreen && styles.heroImageDesktop]} />
                            <View style={[styles.heroBody, isMediumScreen && styles.heroBodyDesktop]}>
                                <Text style={styles.title}>{film.title}</Text>
                                <Text style={styles.meta}>{new Date(film.tanggal_rilis).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</Text>
                                <Text style={styles.meta}>{genreNames(film.genre)}</Text>
                                <Text style={styles.description}>{film.description}</Text>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.primaryButton}>
                                        <Text style={styles.primaryButtonText}>Tonton Sekarang</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.secondaryButton}>
                                        <Text style={styles.secondaryButtonText}>Simpan Favorit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tabRow}>
                            <TouchableOpacity onPress={() => setActiveTab("sutradara")} style={[styles.tabButton, activeTab === "sutradara" && styles.tabButtonActive]}>
                                <Text style={[styles.tabText, activeTab === "sutradara" && styles.tabTextActive]}>Sutradara</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveTab("pemeran")} style={[styles.tabButton, activeTab === "pemeran" && styles.tabButtonActive]}>
                                <Text style={[styles.tabText, activeTab === "pemeran" && styles.tabTextActive]}>Pemeran</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.grid}>
                            {(activeTab === "sutradara" ? film.sutradara : film.pemeran)?.length ? (
                                (activeTab === "sutradara" ? film.sutradara : film.pemeran)?.map((person) => (
                                    <View key={person.id} style={[styles.personCard, { width: itemWidth }]}>
                                        <Image source={{ uri: `${API_URL}${person.image}` }} style={styles.personImage} />
                                        <View style={styles.personBody}>
                                            <Text style={styles.personName}>{person.name}</Text>
                                            <Text style={styles.personRole}>{activeTab === "sutradara" ? "Sutradara" : "Pemeran"}</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.emptyText}>Tidak Ada Data {activeTab === "sutradara" ? "Sutradara" : "Pemeran"}</Text>
                            )}
                        </View>
                    </>
                ) : (
                    <Text style={styles.emptyText}>Film tidak ditemukan.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#020617",
    },
    container: {
        paddingBottom: 32,
        paddingHorizontal: 20,
    },
    backLink: {
        marginTop: 16,
    },
    backText: {
        color: "#F97316",
        fontWeight: "700",
    },
    hero: {
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 24,
        backgroundColor: "#020617",
        overflow: "hidden",
        paddingBottom: 16,
    },
    heroDesktop: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    heroCircle: {
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "rgba(249, 115, 22, 0.18)",
        right: -120,
        top: -80,
    },
    heroImage: {
        width: "100%",
        height: 500,
    },
    heroImageDesktop: {
        width: 320,
        height: "100%",
    },
    heroBody: {
        padding: 24,
    },
    heroBodyDesktop: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 34,
        fontWeight: "900",
        marginBottom: 10,
    },
    meta: {
        color: "#94A3B8",
        marginBottom: 8,
    },
    description: {
        color: "#E2E8F0",
        lineHeight: 24,
        marginTop: 16,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,
    },
    primaryButton: {
        backgroundColor: "#F97316",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        flex: 1,
        marginRight: 10,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        textAlign: "center",
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: "#F97316",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        flex: 1,
    },
    secondaryButtonText: {
        color: "#F97316",
        fontWeight: "700",
        textAlign: "center",
    },
    tabRow: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 12,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
    },
    tabButtonActive: {
        backgroundColor: "#111827",
        borderColor: "#F97316",
    },
    tabText: {
        color: "#94A3B8",
        fontWeight: "700",
    },
    tabTextActive: {
        color: "#F97316",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    personCard: {
        width: "48%",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    personImage: {
        width: "100%",
        height: 160,
    },
    personBody: {
        padding: 16,
    },
    personName: {
        color: "#FFFFFF",
        fontWeight: "700",
        marginBottom: 6,
    },
    personRole: {
        color: "#F97316",
    },
    emptyText: {
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 24,
    },
});
