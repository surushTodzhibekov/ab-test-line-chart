import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "secondary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const variantClass = styles[variant];
  const sizeClass = styles[size];
  const disabledClass = disabled ? styles.disabled : "";
  const loadingClass = isLoading ? styles.loading : "";

  const finalClassName = [
    styles.button,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={finalClassName}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
};
