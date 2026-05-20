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
import { API_URL, genreNames, years, useResponsiveColumns } from "./config";
import { NavigationBar } from "./components/NavigationBar";

type Genre = {
  id: number;
  name: string;
};

type Film = {
  id: number;
  title: string;
  description: string;
  tanggal_rilis: string;
  image?: string;
  genre?: Genre[];
};

export default function FilmScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTahun, setSelectedTahun] = useState("");
  const [urutan, setUrutan] = useState("terbaru");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const filmsResp = await fetch(`${API_URL}/film`);
        const filmsJson = await filmsResp.json();
        setFilms(filmsJson.data ?? []);

        const genreResp = await fetch(`${API_URL}/genre`);
        const genreJson = await genreResp.json();
        setGenres(genreJson.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredFilms = useMemo(() => {
    return [...films]
      .filter((film) => {
        const matchSearch =
          !search.trim() ||
          film.title?.toLowerCase().includes(search.trim().toLowerCase());

        const matchGenre =
          !selectedGenre ||
          film.genre?.some((g) => g.name === selectedGenre);

        const matchTahun =
          !selectedTahun ||
          new Date(film.tanggal_rilis).getFullYear() === Number(selectedTahun);

        return matchSearch && matchGenre && matchTahun;
      })
      .sort((a, b) => {
        const dateA = new Date(a.tanggal_rilis).getTime();
        const dateB = new Date(b.tanggal_rilis).getTime();
        return urutan === "terbaru" ? dateB - dateA : dateA - dateB;
      });
  }, [films, search, selectedGenre, selectedTahun, urutan]);

  const { itemWidth } = useResponsiveColumns({ containerPadding: 24, gap: 18 });

  return (
    <View style={styles.page}>
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroCircle} />
          <Text style={styles.heroTitle}>Daftar Film</Text>
          <Text style={styles.heroSubtitle}>Jelajahi koleksi film kami</Text>
          <Text style={styles.heroText}>
            Jelajahi seluruh koleksi film kami dari berbagai genre dan temukan film favorit Anda.
          </Text>
        </View>

        <View style={styles.filterCard}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Cari Film..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

          <View style={styles.filterRow}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Genre</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                <Text
                  onPress={() => setSelectedGenre("")}
                  style={[styles.filterChip, !selectedGenre && styles.filterChipActive]}
                >
                  Semua Genre
                </Text>
                {genres.map((genre) => (
                  <Text
                    key={genre.id}
                    onPress={() => setSelectedGenre(genre.name)}
                    style={[styles.filterChip, selectedGenre === genre.name && styles.filterChipActive]}
                  >
                    {genre.name}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.filterRowBottom}>
            <View style={styles.filterSection}> 
              <Text style={styles.filterLabel}>Tahun</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                <Text
                  onPress={() => setSelectedTahun("")}
                  style={[styles.filterChip, !selectedTahun && styles.filterChipActive]}
                >
                  Semua Tahun
                </Text>
                {years.slice(0, 10).map((tahun) => (
                  <Text
                    key={tahun}
                    onPress={() => setSelectedTahun(String(tahun))}
                    style={[styles.filterChip, selectedTahun === String(tahun) && styles.filterChipActive]}
                  >
                    {tahun}
                  </Text>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterSection}> 
              <Text style={styles.filterLabel}>Urutan</Text>
              <View style={styles.chipsRow}>
                <Text
                  onPress={() => setUrutan("terbaru")}
                  style={[styles.filterChip, urutan === "terbaru" && styles.filterChipActive]}
                >
                  Terbaru
                </Text>
                <Text
                  onPress={() => setUrutan("terlama")}
                  style={[styles.filterChip, urutan === "terlama" && styles.filterChipActive]}
                >
                  Terlama
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listCount}>Menampilkan {filteredFilms.length} Film</Text>
          <Link href="/" style={styles.viewAllLink}>
            <Text style={styles.linkText}>Kembali</Text>
          </Link>
        </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#F97316" />
          ) : (
            <View style={styles.grid}>
              {filteredFilms.map((film) => (
                <View key={film.id} style={[styles.cardWrap, { width: itemWidth }]}>
                  <Link href={`/film/${film.id}`} style={styles.card}>
                    <Image source={{ uri: `${API_URL}${film.image}` }} style={styles.cardImage} />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {film.title}
                      </Text>
                      <Text style={styles.cardMeta} numberOfLines={1}>
                        {genreNames(film.genre)}
                      </Text>
                      <Text style={styles.cardMeta}>
                        {new Date(film.tanggal_rilis).getFullYear()}
                      </Text>
                    </View>
                  </Link>
                </View>
              ))}
            </View>
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
  },
  hero: {
    padding: 28,
    backgroundColor: "#020617",
    overflow: "hidden",
    marginBottom: 18,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  heroCircle: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(249, 115, 22, 0.2)",
    right: -120,
    bottom: -120,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#F97316",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 18,
  },
  heroText: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 560,
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
  filterCard: {
    marginHorizontal: 24,
    marginBottom: 18,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  filterRow: {
    marginTop: 16,
  },
  filterRowBottom: {
    marginTop: 20,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },
  filterScroll: {
    flexDirection: "row",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    color: "#CBD5E1",
    borderWidth: 1,
    borderColor: "#334155",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
  filterChipActive: {
    backgroundColor: "#F97316",
    color: "#FFFFFF",
    borderColor: "#F97316",
  },
  searchInput: {
    backgroundColor: "#111827",
    color: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  listHeader: {
    marginHorizontal: 24,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listCount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  viewAllLink: {
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
    paddingHorizontal: 24,
  },
  cardWrap: {
    width: "48%",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 170,
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
