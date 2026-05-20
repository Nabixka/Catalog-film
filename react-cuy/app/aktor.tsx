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
import { Link } from "expo-router";
import { API_URL, useResponsiveColumns } from "./config";
import { NavigationBar } from "./components/NavigationBar";

type Aktor = {
  id: number;
  name: string;
  image?: string;
};

export default function AktorScreen() {
  const [aktor, setAktor] = useState<Aktor[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAktor = async () => {
      try {
        const response = await fetch(`${API_URL}/pemeran`);
        const json = await response.json();
        setAktor(json.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAktor();
  }, []);

  const filteredAktor = useMemo(
    () =>
      aktor
        .filter((item) =>
          item.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        .sort((a, b) => b.name.localeCompare(a.name)),
    [search, aktor]
  );

  const { itemWidth } = useResponsiveColumns({ containerPadding: 20, gap: 16 });

  return (
    <View style={styles.page}>
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroCircle} />
          <Text style={styles.title}>Aktor Terbaik</Text>
          <Text style={styles.subtitle}>
            Temukan para Aktor berbakat dalam memerani karakter di film-film yang Anda sukai.
          </Text>
        </View>

        <View style={styles.content}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Cari Aktor"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

          <Text style={styles.counter}>
            Menampilkan <Text style={styles.counterValue}>{filteredAktor.length}</Text> Aktor
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#F97316" />
          ) : (
            <View style={styles.grid}>
              {filteredAktor.map((item) => (
                <Link
                  href={{ pathname: "/aktor/[id]", params: { id: String(item.id) } }}
                  key={item.id}
                  style={[styles.card, { width: itemWidth }]}
                >
                  <Image source={{ uri: `${API_URL}${item.image}` }} style={styles.image} />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardLabel}>Aktor</Text>
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
