import Constants from "expo-constants";

const expoConfig = Constants.expoConfig as any;

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const years = Array.from({ length: 2026 - 1999 + 1 }, (_, index) => 2026 - index);

export const genreNames = (genre?: Array<{ name: string }>) => {
  return genre?.map((item) => item.name).join(", ") ?? "-";
};

import { useWindowDimensions } from "react-native";

export function useResponsiveColumns(opts?: { containerPadding?: number; gap?: number }) {
  const { containerPadding = 24, gap = 18 } = opts ?? {};
  const { width } = useWindowDimensions();

  let columns = 2;
  if (width >= 1024) columns = 6;
  else if (width >= 768) columns = 4;
  else if (width >= 640) columns = 3;
  else columns = 2;

  const totalGap = gap * (columns - 1);
  const itemWidth = Math.floor((width - containerPadding * 2 - totalGap) / columns);

  return { columns, itemWidth, containerPadding, gap };
}
