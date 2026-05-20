import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { API_URL, useResponsiveColumns } from "../config";
import { NavigationBar } from "../components/NavigationBar";

type Film = {
  film_id: number;
  film_title: string;
  film_image: string;
  film_description: string;
};

type SutradaraDetail = {
  id: number;
  name: string;
  image?: string;
  description: string;
  tanggal_lahir: string;
  tempat_asal: string;
  film: Film[];
};

export default function SutradaraDetailScreen() {
  const { id } = useLocalSearchParams();
  const [sutradara, setSutradara] = useState<SutradaraDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { itemWidth } = useResponsiveColumns({ containerPadding: 20, gap: 16 });
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= 768;

  useEffect(() => {
    const sutradaraId = Number(id);
    if (!sutradaraId) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/sutradara/${sutradaraId}`);
        const json = await res.json();
        setSutradara(json.data ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: sutradara?.name ?? "Detail Sutradara" }} />
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Link href="/sutradara" style={styles.backLink}>
          <Text style={styles.backText}>← Kembali ke daftar Sutradara</Text>
        </Link>

        {isLoading ? (
          <ActivityIndicator size="large" color="#F97316" />
        ) : sutradara ? (
          <>
            <View style={[styles.hero, isMediumScreen && styles.heroDesktop]}>
              <Image
                source={{ uri: `${API_URL}${sutradara.image}` }}
                style={[styles.heroImage, isMediumScreen && styles.heroImageDesktop]}
              />
              <View style={[styles.heroBody, isMediumScreen && styles.heroBodyDesktop]}>
                <Text style={styles.title}>{sutradara.name}</Text>
                <Text style={styles.meta}>Sutradara</Text>
                <Text style={styles.meta}>Tanggal Lahir: {new Date(sutradara.tanggal_lahir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</Text>
                <Text style={styles.meta}>Asal: {sutradara.tempat_asal}</Text>
                <Text style={styles.description}>{sutradara.description}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Film karya {sutradara.name}</Text>
            {sutradara.film.length ? (
              <View style={styles.grid}>
                {sutradara.film.map((film) => (
                  <Link key={film.film_id} href={`/film/${film.film_id}`} style={[styles.card, { width: itemWidth }]}> 
                    <Image source={{ uri: `${API_URL}${film.film_image}` }} style={styles.cardImage} />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>{film.film_title}</Text>
                      <Text style={styles.cardMeta} numberOfLines={2}>{film.film_description}</Text>
                    </View>
                  </Link>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Belum ada film terkait.</Text>
            )}
          </>
        ) : (
          <Text style={styles.emptyText}>Sutradara tidak ditemukan.</Text>
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
  },
  heroDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  heroImage: {
    width: "100%",
    height: 420,
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
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardImage: {
    width: "100%",
    height: 160,
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
  cardMeta: {
    color: "#94A3B8",
    fontSize: 13,
  },
  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 24,
  },
});
