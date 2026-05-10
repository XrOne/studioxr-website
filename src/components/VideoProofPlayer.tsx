"use client";

import { useEffect, useRef, useState } from "react";
import type { CapacityVideo } from "@/lib/content-fallback";

interface VideoProofPlayerProps {
  video?: CapacityVideo;
  caption?: string;
  beforeLabel?: string;
  afterLabel?: string;
  ariaLabel: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function VideoProofPlayer({
  video,
  caption,
  beforeLabel,
  afterLabel,
  ariaLabel,
}: VideoProofPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasFile = Boolean(video?.fileWebm || video?.fileMp4);
  const showSplitLabels = Boolean(
    video?.showSplitLabels && beforeLabel && afterLabel
  );

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !hasFile) return;
    if (!prefersReducedMotion()) {
      const playPromise = node.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* autoplay refusé : on laisse le bouton manuel */
        });
      }
    }
  }, [hasFile]);

  function togglePlay() {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      const playPromise = node.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* lecture refusée */
        });
      }
    } else {
      node.pause();
    }
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: 560,
    background: "#000",
    marginBottom: 16,
    overflow: "hidden",
  };

  const fallbackStyle: React.CSSProperties = video?.posterImage
    ? {
        backgroundImage: `url(${video.posterImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background:
          "radial-gradient(ellipse 700px 500px at 50% 60%, rgba(255,138,101,0.25), transparent 70%), linear-gradient(135deg, #2A3A4A 0%, #0F1A26 100%)",
      };

  return (
    <>
      <div
        style={containerStyle}
        aria-label={ariaLabel}
        data-mode="video-proof"
      >
        {hasFile ? (
          <video
            ref={videoRef}
            poster={video?.posterImage}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label={ariaLabel}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            {video?.fileWebm && (
              <source src={video.fileWebm} type="video/webm" />
            )}
            {video?.fileMp4 && (
              <source src={video.fileMp4} type="video/mp4" />
            )}
          </video>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...fallbackStyle,
            }}
            role="img"
            aria-label={
              video?.posterImage
                ? `Poster · ${ariaLabel}`
                : "Vidéo non disponible"
            }
          />
        )}

        {showSplitLabels && (
          <>
            <span
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: 13,
                letterSpacing: "0.12em",
                background: "rgba(248,251,252,0.92)",
                color: "var(--abysse)",
                padding: "8px 14px",
              }}
            >
              {beforeLabel}
            </span>
            <span
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: 13,
                letterSpacing: "0.12em",
                background: "rgba(255,138,101,0.95)",
                color: "var(--abysse)",
                padding: "8px 14px",
              }}
            >
              {afterLabel}
            </span>
          </>
        )}

        {hasFile && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Lecture"}
            aria-pressed={isPlaying}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 48,
              height: 48,
              border: "none",
              background: "rgba(248,251,252,0.92)",
              color: "var(--abysse)",
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
          </button>
        )}

        {video?.transcript && (
          <span
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {video.transcript}
          </span>
        )}
      </div>
      {caption && (
        <div
          className="mono"
          style={{ color: "var(--muted)", marginBottom: 48 }}
        >
          {caption}
        </div>
      )}
    </>
  );
}
