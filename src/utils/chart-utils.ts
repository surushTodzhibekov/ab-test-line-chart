import type { DataPoint, ChartDataPoint, TimeRange } from "../types";

/**
 * Calculate conversion rate as percentage
 */
export const calculateConversionRate = (
  conversions: number,
  visits: number
): number => {
  if (visits === 0) return 0;
  return (conversions / visits) * 100;
};

/**
 * Process raw data to chart-ready format with conversion rates
 */
export const processChartData = (
  data: DataPoint[],
  selectedVariations: string[]
): ChartDataPoint[] => {
  return data.map((point) => {
    const chartPoint: ChartDataPoint = { date: point.date };

    selectedVariations.forEach((varId) => {
      const visits = point.visits[varId] || 0;
      const conversions = point.conversions[varId] || 0;
      chartPoint[varId] = calculateConversionRate(conversions, visits);
    });

    return chartPoint;
  });
};

/**
 * Aggregate data by week
 */
export const aggregateByWeek = (data: DataPoint[]): DataPoint[] => {
  const weekMap = new Map<string, DataPoint>();

  data.forEach((point) => {
    const date = new Date(point.date);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, {
        date: weekKey,
        visits: {},
        conversions: {},
      });
    }

    const weekData = weekMap.get(weekKey)!;

    Object.keys(point.visits).forEach((varId) => {
      weekData.visits[varId] =
        (weekData.visits[varId] || 0) + point.visits[varId];
      weekData.conversions[varId] =
        (weekData.conversions[varId] || 0) + point.conversions[varId];
    });
  });

  return Array.from(weekMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
};

/**
 * Get the start of the week (Monday) for a given date
 */
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Filter data by time range
 */
export const filterDataByTimeRange = (
  data: DataPoint[],
  timeRange: TimeRange
): DataPoint[] => {
  if (timeRange === "week") {
    return aggregateByWeek(data);
  }
  return data;
};

/**
 * Format date for X-axis display (simplified)
 */
export const formatXAxisLabel = (
  dateStr: string,
  timeRange: TimeRange
): string => {
  const date = new Date(dateStr);

  if (timeRange === "week") {
    // For week view, show just the month name
    return date.toLocaleDateString("en-US", {
      month: "short",
    });
  }

  // For day view, show month name only
  return date.toLocaleDateString("en-US", {
    month: "short",
  });
};

/**
 * Format date for display
 */
export const formatDate = (dateStr: string, timeRange: TimeRange): string => {
  const date = new Date(dateStr);

  if (timeRange === "week") {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    return `${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }

  // For day view, show DD/MM/YYYY format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Generate colors for variations
 */
export const getVariationColor = (index: number): string => {
  const colors = [
    "#3b82f6", // blue
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
  ];
  return colors[index % colors.length];
};

/**
 * Export chart to PNG
 */
export const exportChartToPNG = (
  chartRef: HTMLElement,
  filename = "chart.png"
) => {
  // This will be implemented with html2canvas library if needed
  console.log("Export functionality to be implemented", chartRef, filename);
};
