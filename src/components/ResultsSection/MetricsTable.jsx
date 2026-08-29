import React from 'react';
import { Table, CheckCircle2 } from 'lucide-react';
import './ResultsSection.css';

export default function MetricsTable({ processResults = [], metrics = null }) {
  if (!processResults || processResults.length === 0) return null;

  return (
    <div className="metrics-table-container">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <Table size={18} />
          </div>
          <div>
            <h3 className="card-title">Process Metrics & Calculations</h3>
            <p className="card-subtitle">Per-job completion, turnaround, waiting, and response times</p>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="process-table metrics-table">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time (AT)</th>
              <th>Burst Time (BT)</th>
              <th>Priority</th>
              <th>Completion (CT)</th>
              <th>Turnaround (TAT)</th>
              <th>Waiting (WT)</th>
              <th>Response (RT)</th>
            </tr>
          </thead>
          <tbody>
            {processResults.map((p) => (
              <tr key={p.id}>
                <td>
                  <span className="process-id-badge mono">{p.id}</span>
                </td>
                <td className="mono">{p.arrivalTime}</td>
                <td className="mono">{p.burstTime}</td>
                <td className="mono">{p.priority !== undefined ? p.priority : '-'}</td>
                <td className="mono font-semibold">{p.completionTime}</td>
                <td className="mono font-semibold">{p.turnaroundTime}</td>
                <td className="mono font-semibold">{p.waitingTime}</td>
                <td className="mono font-semibold">{p.responseTime}</td>
              </tr>
            ))}
          </tbody>
          {metrics && (
            <tfoot>
              <tr className="summary-row">
                <td colSpan="4" className="text-right">
                  <strong>Average / Summary:</strong>
                </td>
                <td className="mono">-</td>
                <td className="mono font-bold text-indigo">
                  {metrics.averageTurnaroundTime.toFixed(2)}
                </td>
                <td className="mono font-bold text-amber">
                  {metrics.averageWaitingTime.toFixed(2)}
                </td>
                <td className="mono font-bold text-teal">
                  {metrics.averageResponseTime.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="table-formulas-note">
        <span><strong>Formulas:</strong> TAT = CT &minus; AT &nbsp;|&nbsp; WT = TAT &minus; BT &nbsp;|&nbsp; RT = First Start &minus; AT</span>
      </div>
    </div>
  );
}
