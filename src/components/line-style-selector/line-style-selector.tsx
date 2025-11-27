import { useState, useRef, useEffect } from "react";
import type { LineStyle } from "../../types";
import styles from "./line-style-selector.module.css";

type LineStyleSelectorProps = {
  value: LineStyle;
  onChange: (value: LineStyle) => void;
};

const LINE_STYLE_OPTIONS: { label: string; value: LineStyle }[] = [
  { label: "line", value: "line" },
  { label: "smooth", value: "smooth" },
  { label: "area", value: "area" },
];

export const LineStyleSelector = ({
  value,
  onChange,
}: LineStyleSelectorProps) => {
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

  const selectedOption = LINE_STYLE_OPTIONS.find(
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
          <span className={styles.label}>
            Line style: {selectedOption?.label ?? "Select"}
          </span>
          <span className={styles.caret} aria-hidden="true" />
        </button>
        {isOpen && (
          <div className={styles.menu}>
            {LINE_STYLE_OPTIONS.map((option) => (
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
