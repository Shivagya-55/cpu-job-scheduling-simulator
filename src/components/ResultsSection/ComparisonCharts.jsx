import React, { useState } from 'react';
import { BarChart3, TrendingDown } from 'lucide-react';
import './ResultsSection.css';

const CHART_METRICS = [
  {
    id: 'averageWaitingTime',
    title: 'Average Waiting Time',
    unit: 'units',
    color: '#d97706',
    bgColor: '#fef3c7',
    barColor: '#f59e0b',
    lowerIsBetter: true,
    description: 'Time spent by processes in the ready queue waiting for CPU allocation (Lower is better).'
  },
  {
    id: 'averageTurnaroundTime',
    title: 'Average Turnaround Time',
    unit: 'units',
    color: '#4f46e5',
    bgColor: '#e0e7ff',
    barColor: '#6366f1',
    lowerIsBetter: true,
    description: 'Total time from process arrival to complete execution (Lower is better).'
  },
  {
    id: 'averageResponseTime',
    title: 'Average Response Time',
    unit: 'units',
    color: '#0f766e',
    bgColor: '#ccfbf1',
    barColor: '#14b8a6',
    lowerIsBetter: true,
    description: 'Time elapsed between process arrival and its first CPU execution (Lower is better).'
  }
];

export default function ComparisonCharts({ comparisons = [] }) {
  const [activeMetricId, setActiveMetricId] = useState('averageWaitingTime');

  if (!comparisons || comparisons.length === 0) return null;

  const activeConfig = CHART_METRICS.find((m) => m.id === activeMetricId) || CHART_METRICS[0];

  // Find max value for proportional scaling
  const values = comparisons.map((c) => c.metrics[activeMetricId] || 0);
  const maxValue = Math.max(...values, 1);

  // Find best value
  const bestValue = Math.min(...values);

  return (
    <div className="charts-container">
      <div className="charts-header">
        <div className="charts-title-row">
          <div className="section-icon">
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 className="card-title">Comparative Performance Charts</h3>
            <p className="card-subtitle">{activeConfig.description}</p>
          </div>
        </div>

        {/* Metric Selector Tabs */}
        <div className="chart-tabs">
          {CHART_METRICS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`chart-tab-btn ${activeMetricId === m.id ? 'active' : ''}`}
              onClick={() => setActiveMetricId(m.id)}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="barchart-card">
        <div className="barchart-grid">
          {comparisons.map((item) => {
            const val = item.metrics[activeMetricId] || 0;
            const heightPercent = Math.max(8, (val / maxValue) * 100);
            const isBest = val === bestValue;

            return (
              <div key={item.algorithmId} className="barchart-col">
                <div className="bar-value-top mono">
                  {val.toFixed(2)}
                </div>

                <div className="bar-track">
                  <div
                    className={`bar-fill ${isBest ? 'bar-fill-best' : ''}`}
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: isBest ? '#10b981' : activeConfig.barColor
                    }}
                    title={`${item.shortName}: ${val.toFixed(2)} ${activeConfig.unit}`}
                  />
                </div>

                <div className="bar-label-container">
                  <span className="bar-algo-code mono font-semibold">
                    {item.shortName}
                  </span>
                  <span className="bar-algo-type">
                    {item.type === 'Preemptive' ? 'Preempt' : 'Non-Pre'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
