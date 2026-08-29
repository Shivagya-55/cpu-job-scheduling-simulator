import React from 'react';
import { Sliders, Clock, Info } from 'lucide-react';
import { ALGORITHMS } from '../../constants/algorithms';
import './AlgorithmSelector.css';

export default function AlgorithmSelector({
  selectedAlgorithm,
  onSelectAlgorithm,
  timeQuantum,
  onChangeTimeQuantum
}) {
  const currentAlgo = ALGORITHMS.find((a) => a.id === selectedAlgorithm) || ALGORITHMS[0];

  return (
    <div className="algo-selector-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <Sliders size={18} />
          </div>
          <div>
            <h2 className="card-title">Algorithm Selection</h2>
            <p className="card-subtitle">Choose a scheduling policy to simulate</p>
          </div>
        </div>
      </div>

      <div className="algo-body">
        <div className="algo-control-group">
          <label htmlFor="algo-select" className="algo-label">
            Scheduling Algorithm
          </label>
          <select
            id="algo-select"
            className="algo-dropdown"
            value={selectedAlgorithm}
            onChange={(e) => onSelectAlgorithm(e.target.value)}
          >
            {ALGORITHMS.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.shortName} — {algo.name} ({algo.type})
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Time Quantum Input for Round Robin */}
        {currentAlgo.requiresQuantum && (
          <div className="quantum-container">
            <div className="quantum-input-group">
              <label htmlFor="time-quantum" className="algo-label quantum-label">
                <Clock size={14} />
                Time Quantum (units) <span className="req">*</span>
              </label>
              <input
                id="time-quantum"
                type="number"
                min="1"
                step="1"
                className="form-input quantum-input mono"
                value={timeQuantum}
                onChange={(e) => onChangeTimeQuantum(e.target.value)}
                placeholder="2"
              />
            </div>
            <p className="quantum-hint">
              Each active process receives a maximum continuous CPU burst equal to this time slice.
            </p>
          </div>
        )}

        {/* Selected Algorithm Details Card */}
        <div className="algo-detail-banner">
          <div className="algo-detail-header">
            <div className="algo-detail-title-row">
              <span className="algo-detail-name">{currentAlgo.name}</span>
              <span
                className={`algo-tag ${
                  currentAlgo.type === 'Preemptive' ? 'tag-preemptive' : 'tag-nonpreemptive'
                }`}
              >
                {currentAlgo.type}
              </span>
            </div>
          </div>
          <p className="algo-detail-desc">
            <Info size={14} className="info-icon" />
            {currentAlgo.description}
          </p>
        </div>
      </div>
    </div>
  );
}
