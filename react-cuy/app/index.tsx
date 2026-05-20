import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { API_URL, genreNames, useResponsiveColumns } from "./config";
import { NavigationBar } from "./components/NavigationBar";

type Film = {
  id: number;
  title: string;
  description: string;
  tanggal_rilis: string;
  image?: string;
  genre?: Array<{ name: string }>;
};

export default function Index() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { itemWidth } = useResponsiveColumns({ containerPadding: 24, gap: 18 });

  useEffect(() => {
    const loadFilms = async () => {
      try {
        const response = await fetch(`${API_URL}/film`);
        const json = await response.json();
        setFilms(json.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilms();
  }, []);

  return (
    <View style={styles.page}>
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroCircle} />
          <Text style={styles.heroTitle}>Temukan Film</Text>
          <Text style={styles.heroSubtitle}>Terbaik Untuk Ditonton</Text>
          <Text style={styles.heroText}>
            Jelajahi koleksi film dari berbagai genre, temukan cerita yang akan
            menginspirasi Anda.
          </Text>
          <Link href="/film" style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Jelajahi Film</Text>
          </Link>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jelajahi Film</Text>
            <Link href="/film" style={styles.sectionLink}>
              <Text style={styles.linkText}>Lihat Semua →</Text>
            </Link>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#F97316" />
          ) : (
            <View style={styles.grid}>
              {films.slice(0, 6).map((film) => (
                <View key={film.id} style={[styles.cardWrap, { width: itemWidth }]}>
                  <Link href={`/film/${film.id}`} style={styles.card}>
                    <Image
                      source={{ uri: `${API_URL}${film.image}` }}
                      style={styles.cardImage}
                    />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {film.title}
                      </Text>
                      <Text style={styles.cardGenre} numberOfLines={1}>
                        {genreNames(film.genre)}
                      </Text>
                      <Text style={styles.cardYear}>
                        {new Date(film.tanggal_rilis).getFullYear()}
                      </Text>
                    </View>
                  </Link>
                </View>
              ))}
            </View>
          )}
        </View>
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
  },
  hero: {
    padding: 24,
    backgroundColor: "#020617",
    overflow: "hidden",
    marginBottom: 18,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroCircle: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(249,115,22,0.18)",
    right: -120,
    bottom: -120,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "#F97316",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 16,
  },
  heroText: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 580,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },
  sectionLink: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  linkText: {
    color: "#F97316",
    fontSize: 14,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrap: {
    width: "48%",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardGenre: {
    color: "#F97316",
    fontSize: 12,
    marginBottom: 4,
  },
  cardYear: {
    color: "#94A3B8",
    fontSize: 12,
  },
});
