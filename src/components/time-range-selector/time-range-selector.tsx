import { useState, useRef, useEffect } from "react";
import type { TimeRange } from "../../types";
import styles from "./time-range-selector.module.css";

type TimeRangeSelectorProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

const TIME_RANGE_OPTIONS: { label: string; value: TimeRange }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
];

export const TimeRangeSelector = ({
  value,
  onChange,
}: TimeRangeSelectorProps) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = TIME_RANGE_OPTIONS.find(
    (option) => option.value === value
  );

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <div className={styles.container}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{selectedOption?.label ?? "Select"}</span>
          <span className={styles.caret} aria-hidden="true" />
        </button>
        {isOpen && (
          <div className={styles.menu}>
            {TIME_RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`${styles.option} ${
                  option.value === value ? styles.active : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
