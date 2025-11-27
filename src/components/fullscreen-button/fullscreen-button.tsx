import { useState, useEffect } from "react";
import styles from "./fullscreen-button.module.css";

// Extended element type for vendor-prefixed fullscreen APIs
interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export const FullscreenButton = () => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as FullscreenDocument;
      setIsFullscreen(
        !!(
          doc.fullscreenElement ||
          doc.webkitFullscreenElement ||
          doc.mozFullScreenElement ||
          doc.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  async function handleFullscreen() {
    try {
      if (!isFullscreen) {
        const elem = document.documentElement as FullscreenElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        const doc = document as FullscreenDocument;
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if (doc.webkitFullscreenElement) {
          await doc.webkitExitFullscreen?.();
        } else if (doc.mozFullScreenElement) {
          await doc.mozCancelFullScreen?.();
        } else if (doc.msFullscreenElement) {
          await doc.msExitFullscreen?.();
        }
      }
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  }

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------
  return (
    <button
      type="button"
      className={styles.button}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      onClick={handleFullscreen}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.859375 0.6875H2.75V0H0.34375C0.153902 0 0 0.153902 0 0.34375V2.75H0.6875V0.859375C0.6875 0.764451 0.764451 0.6875 0.859375 0.6875ZM7.90625 0H5.5V0.6875H7.39062C7.48555 0.6875 7.5625 0.764451 7.5625 0.859375V2.75H8.25V0.34375C8.25 0.153902 8.0961 0 7.90625 0ZM0 7.90625C0 8.0961 0.153902 8.25 0.34375 8.25H2.75V7.5625H0.859375C0.764451 7.5625 0.6875 7.48555 0.6875 7.39062V5.5H0V7.90625ZM7.73018 8.24386L5.98788 11L4.125 3.4375L11 7.33281L7.73018 8.24386Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
