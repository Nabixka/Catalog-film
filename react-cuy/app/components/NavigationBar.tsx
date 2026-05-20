import { StyleSheet, Text, View } from "react-native";
import { Link, useSegments } from "expo-router";

const items = [
  { label: "Beranda", href: "/" },
  { label: "Film", href: "/film" },
  { label: "Sutradara", href: "/sutradara" },
  { label: "Aktor", href: "/aktor" },
] as const;

export function NavigationBar() {
  const segments = useSegments();
  const active = segments[0] ? `/${segments[0]}` : "/";

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>FILM</Text>
        <Text style={styles.brandAccent}>KATALOG</Text>
      </View>
      <View style={styles.menu}>
        {items.map((item) => {
          const isActive = item.href === active;

          return (
            <Link key={item.href} href={item.href} style={styles.link}>
              <Text style={[styles.linkText, isActive && styles.activeText]}>{item.label}</Text>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#020617",
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  brandAccent: {
    color: "#F97316",
    fontSize: 20,
    fontWeight: "800",
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  link: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  linkText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700",
  },
  activeText: {
    color: "#F97316",
  },
});
