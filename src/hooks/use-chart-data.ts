import { useMemo } from "react";
import type { DataPoint, TimeRange } from "../types";
import { filterDataByTimeRange, processChartData } from "../utils/chart-utils";

export const useChartData = (
  rawData: DataPoint[],
  selectedVariations: string[],
  timeRange: TimeRange
) => {
  const processedData = useMemo(() => {
    // Filter by time range (day/week aggregation)
    const filteredData = filterDataByTimeRange(rawData, timeRange);

    // Process to chart format with conversion rates
    return processChartData(filteredData, selectedVariations);
  }, [rawData, selectedVariations, timeRange]);

  // Calculate Y-axis domain based on visible data
  const yAxisDomain = useMemo(() => {
    if (processedData.length === 0) return [0, 100];

    let min = Infinity;
    let max = -Infinity;

    processedData.forEach((point) => {
      selectedVariations.forEach((varId) => {
        const value = point[varId] as number;
        if (value !== undefined && !isNaN(value)) {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      });
    });

    // Add some padding
    const padding = (max - min) * 0.1;
    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
  }, [processedData, selectedVariations]);

  return {
    chartData: processedData,
    yAxisDomain,
  };
};
