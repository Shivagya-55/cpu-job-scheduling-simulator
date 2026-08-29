import React from 'react';
import { BarChart3, Clock, Activity, ArrowRight, CheckCircle } from 'lucide-react';
import './ResultsSection.css';

export default function ResultsPlaceholder({ simulationState, selectedAlgorithm, processCount }) {
  const isTriggered = simulationState === 'triggered';

  return (
    <section className="results-section-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <BarChart3 size={18} />
          </div>
          <div>
            <h2 className="card-title">Simulation Results & Analytics</h2>
            <p className="card-subtitle">
              {isTriggered
                ? `Ready for execution with ${selectedAlgorithm} (${processCount} processes)`
                : 'Execution timeline and metrics will appear here'}
            </p>
          </div>
        </div>
        <span className="results-status-badge">
          {isTriggered ? 'Awaiting Phase 2 Engine' : 'Idle'}
        </span>
      </div>

      <div className="results-placeholder-body">
        <div className="placeholder-main">
          <div className="placeholder-icon-circle">
            <Activity size={28} />
          </div>
          <h3 className="placeholder-title">
            {isTriggered
              ? 'Simulation Request Registered'
              : 'No Simulation Executed Yet'}
          </h3>
          <p className="placeholder-description">
            {isTriggered
              ? 'The simulation parameters and process table have been validated. In Phase 2, this section will compute and visualize the full execution trace.'
              : 'Configure your processes and select a scheduling algorithm above, then click "Run Simulation" to visualize scheduling metrics.'}
          </p>

          <div className="features-preview-grid">
            <div className="preview-card">
              <div className="preview-card-header">
                <BarChart3 size={16} className="preview-icon" />
                <span className="preview-label">Visual Gantt Chart</span>
              </div>
              <p className="preview-desc">
                Step-by-step CPU timeline rendering showing context switches and idle slots.
              </p>
            </div>

            <div className="preview-card">
              <div className="preview-card-header">
                <Clock size={16} className="preview-icon" />
                <span className="preview-label">Time Metrics Table</span>
              </div>
              <p className="preview-desc">
                Calculations for Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT), and Response Time (RT).
              </p>
            </div>

            <div className="preview-card">
              <div className="preview-card-header">
                <Activity size={16} className="preview-icon" />
                <span className="preview-label">CPU Efficiency</span>
              </div>
              <p className="preview-desc">
                Average waiting time, average turnaround time, and overall CPU throughput analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
