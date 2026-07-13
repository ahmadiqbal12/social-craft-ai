"use client";

import { useState } from "react";
import { CHART_COMPARE_POINTS, CHART_POINTS } from "@/lib/constants";
import { cx } from "@/lib/utils";
import styles from "./Dashboard.module.css";

const GRID_LINES = [30, 75, 120, 165, 200];

function toPolyline(points: { x: number; y: number }[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function toAreaPath(points: { x: number; y: number }[]) {
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x},200 L${first.x},200 Z`;
}

export default function PerformanceChart() {
  const [metric, setMetric] = useState<"engagement" | "reach">("engagement");

  return (
    <div className={cx(styles.card, styles.chartCard)}>
      <div className={styles.chartHead}>
        <div>
          <h3 className={styles.cardTitle}>Performance overview</h3>
          <p className={styles.cardSubtitle}>Engagement across all connected channels</p>
        </div>
        <div className={styles.segment}>
          <button
            type="button"
            className={metric === "engagement" ? styles.segmentActive : styles.segmentInactive}
            onClick={() => setMetric("engagement")}
          >
            Engagement
          </button>
          <button
            type="button"
            className={metric === "reach" ? styles.segmentActive : styles.segmentInactive}
            onClick={() => setMetric("reach")}
          >
            Reach
          </button>
        </div>
      </div>

      <div className={styles.chartStats}>
        <div>
          <div className={styles.chartStatLabel}>Total reach</div>
          <div className={styles.chartStatValue}>128.4K</div>
        </div>
        <div>
          <div className={styles.chartStatLabel}>Avg engagement</div>
          <div className={styles.chartStatValue}>6.4%</div>
        </div>
        <div className={styles.chartLegend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} />
            This week
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} />
            Last week
          </span>
        </div>
      </div>

      <svg viewBox="0 0 640 224" width="100%" style={{ display: "block", marginTop: 6, overflow: "visible" }}>
        <defs>
          <linearGradient id="scGradA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>

        {GRID_LINES.map((y, index) => (
          <line
            key={y}
            x1={40}
            y1={y}
            x2={620}
            y2={y}
            style={{ stroke: index === GRID_LINES.length - 1 ? "var(--border-strong)" : "var(--border)" }}
            strokeWidth={1}
          />
        ))}

        <path d={toAreaPath(CHART_POINTS)} fill="url(#scGradA)" />

        <polyline
          points={toPolyline(CHART_COMPARE_POINTS)}
          fill="none"
          style={{ stroke: "var(--muted)" }}
          strokeWidth={2}
          strokeDasharray="4 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.55}
        />

        <polyline
          points={toPolyline(CHART_POINTS)}
          fill="none"
          style={{ stroke: "var(--primary)" }}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {(() => {
          const last = CHART_POINTS[CHART_POINTS.length - 1];
          return (
            <>
              <circle cx={last.x} cy={last.y} r={4.5} style={{ fill: "var(--primary)" }} />
              <circle cx={last.x} cy={last.y} r={8} style={{ fill: "var(--primary)" }} opacity={0.18} />
            </>
          );
        })()}

        {CHART_POINTS.map((point) => (
          <text
            key={point.label}
            x={point.x}
            y={218}
            textAnchor="middle"
            style={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-inter), sans-serif" }}
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
