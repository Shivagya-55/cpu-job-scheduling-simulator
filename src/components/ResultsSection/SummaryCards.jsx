import React from 'react';
import { Clock, Hourglass, Zap, Activity, Gauge, CheckCircle2 } from 'lucide-react';
import './ResultsSection.css';

export default function SummaryCards({ metrics, processCount, algorithmName }) {
  if (!metrics) return null;

  const {
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalExecutionTime,
    totalIdleTime,
    cpuUtilization,
    throughput
  } = metrics;

  return (
    <div className="summary-cards-grid">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Waiting Time</span>
          <div className="stat-icon-wrap icon-amber">
            <Hourglass size={16} />
          </div>
        </div>
        <div className="stat-value mono">
          {averageWaitingTime.toFixed(2)} <span className="stat-unit">units</span>
        </div>
        <div className="stat-footer">
          <span>Formula: &sum; WT / N</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Turnaround Time</span>
          <div className="stat-icon-wrap icon-indigo">
            <Clock size={16} />
          </div>
        </div>
        <div className="stat-value mono">
          {averageTurnaroundTime.toFixed(2)} <span className="stat-unit">units</span>
        </div>
        <div className="stat-footer">
          <span>Formula: &sum; TAT / N</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Response Time</span>
          <div className="stat-icon-wrap icon-teal">
            <Zap size={16} />
          </div>
        </div>
        <div className="stat-value mono">
          {averageResponseTime.toFixed(2)} <span className="stat-unit">units</span>
        </div>
        <div className="stat-footer">
          <span>Formula: &sum; RT / N</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">CPU Utilization</span>
          <div className="stat-icon-wrap icon-emerald">
            <Activity size={16} />
          </div>
        </div>
        <div className="stat-value mono">
          {cpuUtilization.toFixed(1)}%
        </div>
        <div className="stat-footer">
          <span>Makespan: {totalExecutionTime}u {totalIdleTime > 0 ? `(${totalIdleTime}u idle)` : ''}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Throughput</span>
          <div className="stat-icon-wrap icon-purple">
            <Gauge size={16} />
          </div>
        </div>
        <div className="stat-value mono">
          {throughput ? throughput.toFixed(3) : '0.000'} <span className="stat-unit">proc/unit</span>
        </div>
        <div className="stat-footer">
          <span>{processCount} jobs / {totalExecutionTime} units</span>
        </div>
      </div>
    </div>
  );
}
