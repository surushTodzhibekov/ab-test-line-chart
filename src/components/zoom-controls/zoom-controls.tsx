import { useState, useEffect } from "react";
import styles from "./zoom-controls.module.css";
import { Button } from "../button/button";

type ZoomControlsProps = {
  dataLength: number;
  onViewWindowChange: (viewWindow: { start: number; end: number }) => void;
};

const MIN_WINDOW_SIZE = 4;

export const ZoomControls = ({
  dataLength,
  onViewWindowChange,
}: ZoomControlsProps) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [viewWindow, setViewWindow] = useState({ start: 0, end: 0 });
  const canZoomIn = viewWindow.end - viewWindow.start > MIN_WINDOW_SIZE;
  const canZoomOut = viewWindow.start > 0 || viewWindow.end < dataLength;

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (dataLength > 0) {
      const initialWindow = { start: 0, end: dataLength };
      setViewWindow(initialWindow);
      onViewWindowChange(initialWindow);
    }
  }, [dataLength]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  function handleZoomIn() {
    if (!dataLength) return;
    setViewWindow((prev) => {
      const currentSize = prev.end - prev.start;
      if (currentSize <= MIN_WINDOW_SIZE) return prev;
      const newWindow = Math.max(MIN_WINDOW_SIZE, currentSize - 2);
      const center = prev.start + currentSize / 2;
      let newStart = Math.round(center - newWindow / 2);
      let newEnd = Math.round(center + newWindow / 2);
      if (newStart < 0) {
        newStart = 0;
        newEnd = newWindow;
      }
      if (newEnd > dataLength) {
        newEnd = dataLength;
        newStart = newEnd - newWindow;
      }
      const newViewWindow = { start: newStart, end: newEnd };
      onViewWindowChange(newViewWindow);
      return newViewWindow;
    });
  }

  function handleZoomOut() {
    if (!dataLength) return;
    setViewWindow((prev) => {
      if (prev.start === 0 && prev.end === dataLength) {
        return prev;
      }
      const newStart = Math.max(0, prev.start - 1);
      const newEnd = Math.min(dataLength, prev.end + 1);
      const newViewWindow = { start: newStart, end: newEnd };
      onViewWindowChange(newViewWindow);
      return newViewWindow;
    });
  }

  function handleZoomReset() {
    if (!dataLength) return;
    const newViewWindow = { start: 0, end: dataLength };
    setViewWindow(newViewWindow);
    onViewWindowChange(newViewWindow);
  }

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <div className={styles.container}>
      <div className={styles.controlsRow}>
        <div className={styles.stepper}>
          <Button
            variant="secondary"
            size="sm"
            aria-label="Zoom out"
            onClick={handleZoomOut}
            disabled={!canZoomOut}
          >
            −
          </Button>
          <span className={styles.divider} aria-hidden="true" />
          <Button
            variant="secondary"
            size="sm"
            aria-label="Zoom in"
            onClick={handleZoomIn}
            disabled={!canZoomIn}
          >
            +
          </Button>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className={styles.reset}
          aria-label="Reset zoom"
          onClick={handleZoomReset}
        >
          ↺
        </Button>
      </div>
    </div>
  );
};
