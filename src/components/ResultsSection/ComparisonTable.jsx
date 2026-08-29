import React from 'react';
import { Award, CheckCircle } from 'lucide-react';
import './ResultsSection.css';

export default function ComparisonTable({ comparisons = [], bestMetrics = {}, currentAlgorithmId }) {
  if (!comparisons || comparisons.length === 0) return null;

  return (
    <div className="comparison-table-wrapper">
      <div className="table-responsive-container">
        <table className="process-table comparison-matrix-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Type</th>
              <th>Avg Waiting Time</th>
              <th>Avg Turnaround Time</th>
              <th>Avg Response Time</th>
              <th>CPU Utilization</th>
              <th>Throughput</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item) => {
              const isSelected = item.algorithmId === currentAlgorithmId;
              const isBestWT = item.metrics.averageWaitingTime === bestMetrics.minWaitingTime;
              const isBestTAT = item.metrics.averageTurnaroundTime === bestMetrics.minTurnaroundTime;
              const isBestRT = item.metrics.averageResponseTime === bestMetrics.minResponseTime;
              const isBestUtil = item.metrics.cpuUtilization === bestMetrics.maxCpuUtilization;
              const isBestThroughput = item.metrics.throughput === bestMetrics.maxThroughput;

              return (
                <tr
                  key={item.algorithmId}
                  className={`comparison-row ${isSelected ? 'row-selected' : ''}`}
                >
                  <td>
                    <div className="algo-cell-name">
                      <span className="mono font-semibold">{item.shortName}</span>
                      <span className="algo-cell-subname">{item.name}</span>
                      {isSelected && <span className="active-algo-pill">Active</span>}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`algo-tag ${
                        item.type === 'Preemptive' ? 'tag-preemptive' : 'tag-nonpreemptive'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Avg Waiting Time */}
                  <td>
                    <div className="metric-cell-wrap">
                      <span className={`mono font-semibold ${isBestWT ? 'text-best' : ''}`}>
                        {item.metrics.averageWaitingTime.toFixed(2)}
                      </span>
                      {isBestWT && <span className="best-badge">Best</span>}
                    </div>
                  </td>

                  {/* Avg Turnaround Time */}
                  <td>
                    <div className="metric-cell-wrap">
                      <span className={`mono font-semibold ${isBestTAT ? 'text-best' : ''}`}>
                        {item.metrics.averageTurnaroundTime.toFixed(2)}
                      </span>
                      {isBestTAT && <span className="best-badge">Best</span>}
                    </div>
                  </td>

                  {/* Avg Response Time */}
                  <td>
                    <div className="metric-cell-wrap">
                      <span className={`mono font-semibold ${isBestRT ? 'text-best' : ''}`}>
                        {item.metrics.averageResponseTime.toFixed(2)}
                      </span>
                      {isBestRT && <span className="best-badge">Best</span>}
                    </div>
                  </td>

                  {/* CPU Utilization */}
                  <td>
                    <div className="metric-cell-wrap">
                      <span className={`mono font-semibold ${isBestUtil ? 'text-best' : ''}`}>
                        {item.metrics.cpuUtilization.toFixed(1)}%
                      </span>
                      {isBestUtil && <span className="best-badge">Best</span>}
                    </div>
                  </td>

                  {/* Throughput */}
                  <td>
                    <div className="metric-cell-wrap">
                      <span className={`mono font-semibold ${isBestThroughput ? 'text-best' : ''}`}>
                        {item.metrics.throughput.toFixed(3)}
                      </span>
                      {isBestThroughput && <span className="best-badge">Best</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="comparison-table-legend">
        <span className="legend-note">
          <span className="best-badge-sample">Best</span> indicates the most optimal algorithm performance for that metric on this process dataset.
        </span>
      </div>
    </div>
  );
}
