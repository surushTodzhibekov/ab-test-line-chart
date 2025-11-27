export type Variation = {
  id?: number;
  name: string;
};

export type DataPoint = {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
};

export type ChartDataPoint = {
  date: string;
  [key: string]: string | number;
};

export type ChartData = {
  variations: Array<{ id: string; name: string }>;
  data: DataPoint[];
};

export type TimeRange = "day" | "week";
export type LineStyle = "line" | "smooth" | "area";
export type Theme = "light" | "dark";

export type ChartConfig = {
  selectedVariations: string[];
  timeRange: TimeRange;
  lineStyle: LineStyle;
  theme: Theme;
  isZoomed: boolean;
};
