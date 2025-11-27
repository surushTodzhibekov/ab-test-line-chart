import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./variation-selector.module.css";

type Variation = {
  id: string;
  name: string;
};

type VariationSelectorProps = {
  variations: Variation[];
  selectedVariations: string[];
  onToggle: (variationId: string) => void;
};

export const VariationSelector = ({
  variations,
  selectedVariations,
  onToggle,
}: VariationSelectorProps) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // memoized values
  // ---------------------------------------------------------------------------
  const summaryLabel = useMemo(() => {
    if (selectedVariations.length === variations.length) {
      return "All variations selected";
    }
    if (selectedVariations.length === 1) {
      const variation = variations.find((v) => v.id === selectedVariations[0]);
      return variation ? variation.name : "1 variation";
    }
    return `${selectedVariations.length} variations`;
  }, [selectedVariations, variations]);

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
          <span>{summaryLabel}</span>
          <span className={styles.caret} aria-hidden="true" />
        </button>

        {isOpen && (
          <div className={styles.menu}>
            {variations.map((variation) => (
              <label key={variation.id} className={styles.option}>
                <input
                  type="checkbox"
                  checked={selectedVariations.includes(variation.id)}
                  onChange={() => onToggle(variation.id)}
                  disabled={
                    selectedVariations.length === 1 &&
                    selectedVariations.includes(variation.id)
                  }
                />
                <span>{variation.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
