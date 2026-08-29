import React from 'react';
import { Cpu, Layers } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-icon-wrapper">
            <Cpu className="header-icon" size={24} />
          </div>
          <div>
            <div className="header-title-row">
              <h1 className="header-title">CPU Job Scheduling Simulator</h1>
              <span className="header-badge">
                <Layers size={13} />
                Phase 1: Foundation
              </span>
            </div>
            <p className="header-subtitle">
              Visualize and compare CPU scheduling algorithms.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
