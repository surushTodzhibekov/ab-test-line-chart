import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint, TimeRange, LineStyle } from "../../types";
import { formatXAxisLabel, getVariationColor } from "../../utils/chart-utils";
import styles from "./chart.module.css";
import { ChartTooltip } from "./chart-tooltip";

type ChartProps = {
  data: ChartDataPoint[];
  variations: Array<{ id: string; name: string }>;
  selectedVariations: string[];
  timeRange: TimeRange;
  lineStyle: LineStyle;
  yAxisDomain: [number, number];
};

export const Chart = ({
  data,
  variations,
  selectedVariations,
  timeRange,
  lineStyle,
  yAxisDomain,
}: ChartProps) => {
  // ---------------------------------------------------------------------------
  // Render line/area charts
  // ---------------------------------------------------------------------------

  const renderLines = () => {
    return selectedVariations.map((varId, index) => {
      const color = getVariationColor(index);
      const variation = variations.find((v) => v.id === varId);

      if (lineStyle === "area") {
        return (
          <Area
            key={varId}
            type="monotone"
            dataKey={varId}
            stroke={color}
            fill={color}
            fillOpacity={0.1}
            strokeWidth={2.5}
            name={variation?.name}
            dot={{ r: 3, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
        );
      }

      return (
        <Line
          key={varId}
          type={lineStyle === "smooth" ? "monotone" : "linear"}
          dataKey={varId}
          stroke={color}
          strokeWidth={2.5}
          name={variation?.name}
          dot={{ r: 3, strokeWidth: 2, fill: "white" }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
      );
    });
  };

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <div className={styles.container}>
      {/* --------------------------------------------------------------------------- */}
      {/* Chart container */}
      {/* --------------------------------------------------------------------------- */}

      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          {/* --------------------------------------------------------------------------- */}
          {/* Grid background */}
          {/* --------------------------------------------------------------------------- */}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />

          {/* --------------------------------------------------------------------------- */}
          {/* X-axis with month labels */}
          {/* --------------------------------------------------------------------------- */}

          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatXAxisLabel(value, timeRange)}
            stroke="#9ca3af"
            style={{ fontSize: "12px", fontWeight: 600 }}
            tick={{ fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />

          {/* --------------------------------------------------------------------------- */}
          {/* Y-axis with percentage labels */}
          {/* --------------------------------------------------------------------------- */}

          <YAxis
            domain={yAxisDomain}
            tickFormatter={(value) => `${value}%`}
            stroke="#9ca3af"
            style={{ fontSize: "12px", fontWeight: 600 }}
            tick={{ fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            width={50}
          />

          {/* --------------------------------------------------------------------------- */}
          {/* Custom tooltip  */}
          {/* --------------------------------------------------------------------------- */}

          <Tooltip
            content={
              <ChartTooltip timeRange={timeRange} variations={variations} />
            }
            cursor={{
              stroke: "#d1d5db",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />

          {/* --------------------------------------------------------------------------- */}
          {/* Legend showing line names */}
          {/* --------------------------------------------------------------------------- */}

          <Legend
            wrapperStyle={{ paddingTop: "24px", fontSize: "13px" }}
            iconType="line"
            iconSize={16}
          />

          {/* --------------------------------------------------------------------------- */}
          {/* Render line/area charts based on selected variations and style */}
          {/* --------------------------------------------------------------------------- */}

          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
