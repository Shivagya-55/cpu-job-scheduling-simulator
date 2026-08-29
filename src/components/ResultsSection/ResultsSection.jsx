import React from 'react';
import ResultsPlaceholder from './ResultsPlaceholder';
import SummaryCards from './SummaryCards';
import GanttChart from './GanttChart';
import MetricsTable from './MetricsTable';
import './ResultsSection.css';

export default function ResultsSection({
  simulationState,
  selectedAlgorithm,
  processCount,
  simulationResults
}) {
  if (simulationState !== 'triggered' || !simulationResults) {
    return (
      <ResultsPlaceholder
        simulationState={simulationState}
        selectedAlgorithm={selectedAlgorithm}
        processCount={processCount}
      />
    );
  }

  const { ganttChart, processResults, metrics } = simulationResults;

  return (
    <section className="results-section-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <span className="results-active-dot" />
          </div>
          <div>
            <h2 className="card-title">Simulation Analysis — {selectedAlgorithm}</h2>
            <p className="card-subtitle">
              Calculated schedule for {processResults.length} process{processResults.length !== 1 ? 'es' : ''} with makespan of {metrics.totalExecutionTime} time units
            </p>
          </div>
        </div>
        <span className="results-status-badge badge-active">
          Execution Complete
        </span>
      </div>

      <div className="results-active-content">
        {/* 1. Summary Cards */}
        <SummaryCards metrics={metrics} />

        {/* 2. Gantt Chart Timeline */}
        <GanttChart ganttChart={ganttChart} />

        {/* 3. Detailed Metrics Table */}
        <MetricsTable processResults={processResults} metrics={metrics} />
      </div>
    </section>
  );
}
