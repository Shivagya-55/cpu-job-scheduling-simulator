import React, { useState } from 'react';
import { LayoutDashboard, GitCompare, BookOpen, Clock } from 'lucide-react';
import ResultsPlaceholder from './ResultsPlaceholder';
import SummaryCards from './SummaryCards';
import GanttChart from './GanttChart';
import MetricsTable from './MetricsTable';
import ComparisonTable from './ComparisonTable';
import ComparisonCharts from './ComparisonCharts';
import AlgorithmInsights from './AlgorithmInsights';
import './ResultsSection.css';

export default function ResultsSection({
  simulationState,
  selectedAlgorithm,
  currentAlgorithmId,
  processCount,
  simulationResults,
  comparisonData
}) {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'comparison' | 'insights'

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
  const { comparisons, bestMetrics } = comparisonData || { comparisons: [], bestMetrics: {} };

  return (
    <section className="results-section-card">
      {/* Results Section Navigation Bar */}
      <div className="results-nav-header">
        <div className="results-nav-tabs">
          <button
            type="button"
            className={`results-nav-btn ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            <LayoutDashboard size={15} />
            <span>Single Simulation ({selectedAlgorithm})</span>
          </button>

          <button
            type="button"
            className={`results-nav-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            <GitCompare size={15} />
            <span>Algorithm Comparison (5)</span>
          </button>

          <button
            type="button"
            className={`results-nav-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <BookOpen size={15} />
            <span>Algorithm Insights</span>
          </button>
        </div>

        <div className="results-header-badge-group">
          <span className="results-status-badge badge-active">
            Execution Complete ({processCount} jobs)
          </span>
        </div>
      </div>

      {/* Tab 1: Single Algorithm Schedule Analysis */}
      {activeTab === 'single' && (
        <div className="results-tab-content">
          <div className="results-tab-intro">
            <div>
              <h2 className="card-title">Execution Analysis & Schedule — {selectedAlgorithm}</h2>
              <p className="card-subtitle">
                Makespan: {metrics.totalExecutionTime} time units &bull; Throughput: {metrics.throughput.toFixed(3)} processes/unit
              </p>
            </div>
          </div>

          {/* 1. Summary Cards */}
          <SummaryCards
            metrics={metrics}
            processCount={processCount}
            algorithmName={selectedAlgorithm}
          />

          {/* 2. Gantt Chart Timeline */}
          <GanttChart ganttChart={ganttChart} />

          {/* 3. Detailed Metrics Table */}
          <MetricsTable processResults={processResults} metrics={metrics} />
        </div>
      )}

      {/* Tab 2: Multi-Algorithm Comparison */}
      {activeTab === 'comparison' && (
        <div className="results-tab-content">
          <div className="results-tab-intro">
            <div>
              <h2 className="card-title">Side-by-Side Algorithm Comparison</h2>
              <p className="card-subtitle">
                Evaluating {processCount} processes across all 5 scheduling policies under identical arrival conditions
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            comparisons={comparisons}
            bestMetrics={bestMetrics}
            currentAlgorithmId={currentAlgorithmId}
          />

          {/* Comparative Visual Bar Charts */}
          <ComparisonCharts comparisons={comparisons} />
        </div>
      )}

      {/* Tab 3: Educational Algorithm Insights */}
      {activeTab === 'insights' && (
        <div className="results-tab-content">
          <AlgorithmInsights currentAlgorithmId={currentAlgorithmId} />
        </div>
      )}
    </section>
  );
}
