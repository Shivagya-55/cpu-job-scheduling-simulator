import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, HelpCircle, Layers } from 'lucide-react';
import { ALGORITHMS } from '../../constants/algorithms';
import './ResultsSection.css';

export default function AlgorithmInsights({ currentAlgorithmId }) {
  const [selectedAlgoId, setSelectedAlgoId] = useState(currentAlgorithmId || 'FCFS');

  const activeAlgo = ALGORITHMS.find((a) => a.id === selectedAlgoId) || ALGORITHMS[0];
  const edu = activeAlgo.educational || {};

  return (
    <div className="insights-container">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <BookOpen size={18} />
          </div>
          <div>
            <h3 className="card-title">Algorithm Deep Dive & How It Works</h3>
            <p className="card-subtitle">Technically accurate scheduling principles, trade-offs, and behaviors</p>
          </div>
        </div>

        {/* Algorithm Selector Buttons */}
        <div className="insights-tabs">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              type="button"
              className={`insights-tab-btn ${selectedAlgoId === algo.id ? 'active' : ''}`}
              onClick={() => setSelectedAlgoId(algo.id)}
            >
              {algo.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="insights-card-body">
        <div className="insights-title-row">
          <div>
            <h4 className="insights-algo-name">{activeAlgo.name} ({activeAlgo.shortName})</h4>
            <span
              className={`algo-tag ${
                activeAlgo.type === 'Preemptive' ? 'tag-preemptive' : 'tag-nonpreemptive'
              }`}
            >
              {activeAlgo.type}
            </span>
          </div>
        </div>

        <div className="insights-grid">
          {/* Principle */}
          <div className="insight-block">
            <span className="insight-label">Scheduling Principle</span>
            <p className="insight-text">{edu.principle}</p>
          </div>

          {/* Selection Rule */}
          <div className="insight-block">
            <span className="insight-label">Process Selection Strategy</span>
            <p className="insight-text">{edu.selectionRule}</p>
          </div>

          {/* Preemption & Quantum */}
          <div className="insight-block">
            <span className="insight-label">Preemption Mechanism</span>
            <p className="insight-text">{edu.preemption}</p>
          </div>

          <div className="insight-block">
            <span className="insight-label">Time Quantum Rule</span>
            <p className="insight-text">{edu.timeQuantumRule}</p>
          </div>
        </div>

        {/* Advantages & Limitations */}
        <div className="tradeoffs-grid">
          <div className="tradeoff-card card-advantage">
            <div className="tradeoff-header">
              <CheckCircle2 size={16} className="tradeoff-icon text-emerald" />
              <span className="tradeoff-title">Key Advantages</span>
            </div>
            <ul className="tradeoff-list">
              {edu.advantages && edu.advantages.map((adv, idx) => (
                <li key={idx}>{adv}</li>
              ))}
            </ul>
          </div>

          <div className="tradeoff-card card-limitation">
            <div className="tradeoff-header">
              <AlertCircle size={16} className="tradeoff-icon text-amber" />
              <span className="tradeoff-title">Key Limitations</span>
            </div>
            <ul className="tradeoff-list">
              {edu.limitations && edu.limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
