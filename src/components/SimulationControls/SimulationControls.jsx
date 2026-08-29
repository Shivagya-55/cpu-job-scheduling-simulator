import React from 'react';
import { Play, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import './SimulationControls.css';

export default function SimulationControls({
  onRunSimulation,
  simulationState,
  validationError,
  processCount,
  algorithmName
}) {
  return (
    <div className="simulation-controls-container">
      <div className="controls-action-bar">
        <button
          type="button"
          className="btn btn-primary run-simulation-btn"
          onClick={onRunSimulation}
        >
          <Play size={18} fill="currentColor" />
          <span>Run Simulation</span>
        </button>

        <div className="simulation-quick-stats">
          <span className="stat-item">
            Algorithm: <strong>{algorithmName}</strong>
          </span>
          <span className="stat-divider">•</span>
          <span className="stat-item">
            Processes: <strong>{processCount}</strong>
          </span>
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="simulation-alert alert-error">
          <AlertTriangle size={18} className="alert-icon" />
          <div className="alert-content">
            <span className="alert-title">Cannot Run Simulation</span>
            <p className="alert-desc">{validationError}</p>
          </div>
        </div>
      )}

      {/* Phase 1 Success / Simulation Trigger Feedback Banner */}
      {simulationState === 'triggered' && !validationError && (
        <div className="simulation-alert alert-info">
          <CheckCircle2 size={18} className="alert-icon success-icon" />
          <div className="alert-content">
            <span className="alert-title">Simulation Initiated</span>
            <p className="alert-desc">
              Input validation passed for {processCount} process{processCount !== 1 ? 'es' : ''} using <strong>{algorithmName}</strong>. 
              Scheduling execution calculations and Gantt chart rendering will be activated in Phase 2.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
