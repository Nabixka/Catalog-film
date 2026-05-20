import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { API_URL, useResponsiveColumns } from "./config";
import { NavigationBar } from "./components/NavigationBar";
import { Link } from "expo-router";

type Sutradara = {
  id: number;
  name: string;
  image?: string;
};

export default function SutradaraScreen() {
  const [sutradaras, setSutradaras] = useState<Sutradara[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadSutradara = async () => {
      try {
        const response = await axios.get(`${API_URL}/sutradara`);
        const data = response.data?.data ?? [];
        timeoutId = setTimeout(() => {
          setSutradaras(data);
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error(error);
        timeoutId = setTimeout(() => setIsLoading(false), 600);
      }
    };

    loadSutradara();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const filteredList = useMemo(
    () =>
      sutradaras.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search, sutradaras]
  );

  const { itemWidth } = useResponsiveColumns({ containerPadding: 20, gap: 16 });

  return (
    <View style={styles.page}>
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroCircle} />
          <Text style={styles.title}>Sutradara Terbaik</Text>
          <Text style={styles.subtitle}>
            Temukan para sutradara berbakat dibalik film-film terbaik yang menginspirasi dunia.
          </Text>
        </View>

        <View style={styles.content}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Cari Sutradara"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

          <Text style={styles.counter}>
            Menampilkan <Text style={styles.counterValue}>{filteredList.length}</Text> Sutradara
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#F97316" />
          ) : (
            <View style={styles.grid}>
              {filteredList.map((s) => (
                <Link href={{ pathname: "/sutradara/[id]", params: { id: String(s.id) } }} key={s.id} style={[styles.card, { width: itemWidth }]}> 
                  <Image source={{ uri: `${API_URL}${s.image}` }} style={styles.image} />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{s.name}</Text>
                    <Text style={styles.cardLabel}>Sutradara</Text>
                  </View>
                </Link>
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
    paddingHorizontal: 20,
  },
  hero: {
    marginTop: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#020617",
    overflow: "hidden",
    marginBottom: 20,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  heroCircle: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(249,115,22,0.18)",
    right: -100,
    top: -90,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 24,
  },
  content: {
    marginTop: 24,
  },
  searchInput: {
    backgroundColor: "#111827",
    color: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
  },
  counter: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 18,
  },
  counterValue: {
    color: "#F97316",
    fontWeight: "700",
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
  image: {
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
  cardLabel: {
    color: "#F97316",
  },
});
