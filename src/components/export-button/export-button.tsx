import { useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "../button/button";
import styles from "./export-button.module.css";

export const ExportButton = () => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [isExporting, setIsExporting] = useState(false);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------
  async function handleExport() {
    // Get the chart element by finding the main content area
    const chartElement = document.querySelector(".main");
    if (!chartElement) {
      console.error("Chart element not found");
      return;
    }

    setIsExporting(true);
    try {
      const canvas = await html2canvas(chartElement as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
        width: (chartElement as HTMLElement).offsetWidth,
        height: (chartElement as HTMLElement).offsetHeight,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `ab-test-chart-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.click();
    } catch (error) {
      console.error("Failed to export chart:", error);
      alert("Failed to export chart. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <Button
      className={styles.exportButton}
      variant="secondary"
      size="sm"
      onClick={handleExport}
      isLoading={isExporting}
      disabled={isExporting}
      title="Export chart as PNG"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={styles.icon}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </Button>
  );
};
