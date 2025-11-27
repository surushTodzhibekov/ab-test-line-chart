import { useState, useMemo, useEffect, useCallback } from "react";
import {
  VariationSelector,
  TimeRangeSelector,
  LineStyleSelector,
  FullscreenButton,
  ThemeToggle,
  ExportButton,
  ZoomControls,
  Chart,
} from "./components";
import { useChartData } from "./hooks/use-chart-data";
import type { TimeRange, LineStyle } from "./types";
import rawData from "./data/data.json";
import "./App.css";

function App() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("line");
  const [viewWindow, setViewWindow] = useState({ start: 0, end: 0 });

  // Prepare variations with proper IDs
  const variations = useMemo(() => {
    return rawData.variations.map((variation) => ({
      id: variation.id?.toString() || "0",
      name: variation.name,
    }));
  }, []);

  const [selectedVariations, setSelectedVariations] = useState<string[]>(() =>
    variations.map((variation) => variation.id)
  );

  // Process chart data
  const { chartData, yAxisDomain } = useChartData(
    rawData.data as any,
    selectedVariations,
    timeRange
  );

  // ---------------------------------------------------------------------------
  // memo
  // ---------------------------------------------------------------------------
  const visibleData = useMemo(() => {
    if (!chartData.length) return [];
    const start = Math.max(0, Math.min(viewWindow.start, chartData.length - 1));
    const end = Math.max(start + 1, Math.min(viewWindow.end, chartData.length));
    return chartData.slice(start, end);
  }, [chartData, viewWindow]);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (chartData.length) {
      setViewWindow({ start: 0, end: chartData.length });
    }
  }, [chartData.length]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  function handleVariationToggle(variationId: string) {
    setSelectedVariations((prev) => {
      const isSelected = prev.includes(variationId);

      // Prevent deselecting if it's the last one
      if (isSelected && prev.length === 1) {
        return prev;
      }

      if (isSelected) {
        return prev.filter((id) => id !== variationId);
      } else {
        return [...prev, variationId];
      }
    });
  }

  // ---------------------------------------------------------------------------
  // callbacks
  // ---------------------------------------------------------------------------
  const handleViewWindowChange = useCallback(
    (newViewWindow: { start: number; end: number }) => {
      setViewWindow(newViewWindow);
    },
    []
  );

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <div className="app">
      {/* --------------------------------------------------------------------------- */}
      {/* Header Section */}
      {/* --------------------------------------------------------------------------- */}

      <header className="header">
        <h1 className="title">A/B Test Results</h1>
        <p className="subtitle">Conversion Rate Over Time</p>
      </header>

      {/* --------------------------------------------------------------------------- */}
      {/* Main Content */}
      {/* --------------------------------------------------------------------------- */}

      <main className="main">
        <div className="controls">
          {/* --------------------------------------------------------------------------- */}
          {/* Left Controls: Variation & Time Range Selectors */}
          {/* --------------------------------------------------------------------------- */}
          <div className="controls-left">
            <VariationSelector
              variations={variations}
              selectedVariations={selectedVariations}
              onToggle={handleVariationToggle}
            />

            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          </div>

          {/* --------------------------------------------------------------------------- */}
          {/* Right Controls: Line Style, Theme, Export, Fullscreen & Zoom */}
          {/* --------------------------------------------------------------------------- */}

          <div className="controls-right">
            <div className="controls-right-top">
              <LineStyleSelector value={lineStyle} onChange={setLineStyle} />
              <ThemeToggle />
              <ExportButton />
              <FullscreenButton />
            </div>
            <ZoomControls
              dataLength={chartData.length}
              onViewWindowChange={handleViewWindowChange}
            />
          </div>
        </div>

        {/* --------------------------------------------------------------------------- */}
        {/* Chart Display */}
        {/* --------------------------------------------------------------------------- */}

        <Chart
          data={visibleData.length ? visibleData : chartData}
          variations={variations}
          selectedVariations={selectedVariations}
          timeRange={timeRange}
          lineStyle={lineStyle}
          yAxisDomain={yAxisDomain as [number, number]}
        />
      </main>
    </div>
  );
}

export default App;
