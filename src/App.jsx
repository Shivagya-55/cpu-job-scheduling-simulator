import React, { useState } from 'react';
import Header from './components/Header/Header';
import ProcessTable from './components/ProcessInput/ProcessTable';
import AlgorithmSelector from './components/AlgorithmSelector/AlgorithmSelector';
import SimulationControls from './components/SimulationControls/SimulationControls';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { DEFAULT_PROCESSES } from './constants/defaultProcesses';
import { ALGORITHMS, DEFAULT_TIME_QUANTUM } from './constants/algorithms';
import { validateSimulationConfig } from './utils/validation';
import { runScheduler } from './algorithms';
import './App.css';

export default function App() {
  const [processes, setProcesses] = useState(DEFAULT_PROCESSES);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FCFS');
  const [timeQuantum, setTimeQuantum] = useState(DEFAULT_TIME_QUANTUM);
  const [simulationState, setSimulationState] = useState('idle');
  const [simulationResults, setSimulationResults] = useState(null);
  const [validationError, setValidationError] = useState(null);

  // Current algorithm object
  const currentAlgorithm = ALGORITHMS.find((a) => a.id === selectedAlgorithm) || ALGORITHMS[0];

  const handleAddProcess = (newProc) => {
    setProcesses((prev) => [...prev, newProc]);
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleRemoveProcess = (id) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleClearAll = () => {
    setProcesses([]);
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleResetDefaults = () => {
    setProcesses(DEFAULT_PROCESSES);
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleSelectAlgorithm = (algoId) => {
    setSelectedAlgorithm(algoId);
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleChangeTimeQuantum = (val) => {
    setTimeQuantum(val);
    setSimulationState('idle');
    setSimulationResults(null);
    setValidationError(null);
  };

  const handleRunSimulation = () => {
    const config = {
      algorithmId: selectedAlgorithm,
      timeQuantum,
      processes
    };

    const validation = validateSimulationConfig(config);
    if (!validation.isValid) {
      setValidationError(validation.message);
      setSimulationState('idle');
      setSimulationResults(null);
      return;
    }

    try {
      const results = runScheduler(selectedAlgorithm, processes, {
        timeQuantum: parseInt(timeQuantum, 10) || DEFAULT_TIME_QUANTUM
      });

      setValidationError(null);
      setSimulationResults(results);
      setSimulationState('triggered');
    } catch (err) {
      setValidationError(`Simulation execution error: ${err.message}`);
      setSimulationState('idle');
      setSimulationResults(null);
    }
  };

  return (
    <div className="app-layout">
      <Header />

      <main className="main-container">
        <div className="workspace-grid">
          {/* Section 1: Process Table & Inputs */}
          <div className="grid-col-left">
            <ProcessTable
              processes={processes}
              onAddProcess={handleAddProcess}
              onRemoveProcess={handleRemoveProcess}
              onClearAll={handleClearAll}
              onResetDefaults={handleResetDefaults}
            />
          </div>

          {/* Section 2: Algorithm Selector */}
          <div className="grid-col-right">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={handleSelectAlgorithm}
              timeQuantum={timeQuantum}
              onChangeTimeQuantum={handleChangeTimeQuantum}
            />
          </div>
        </div>

        {/* Section 3: Simulation Controls */}
        <SimulationControls
          onRunSimulation={handleRunSimulation}
          simulationState={simulationState}
          validationError={validationError}
          processCount={processes.length}
          algorithmName={currentAlgorithm.name}
        />

        {/* Section 4: Results & Visualizer Area */}
        <ResultsSection
          simulationState={simulationState}
          selectedAlgorithm={currentAlgorithm.shortName}
          processCount={processes.length}
          simulationResults={simulationResults}
        />
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <span>CPU Job Scheduling Simulator &bull; Phase 2 Implementation</span>
          <span className="footer-status">Algorithms & Gantt Engine Active</span>
        </div>
      </footer>
    </div>
  );
}
