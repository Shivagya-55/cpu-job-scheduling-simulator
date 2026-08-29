import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, AlertCircle, ListPlus, XCircle } from 'lucide-react';
import { validateProcess, getNextProcessId } from '../../utils/validation';
import './ProcessInput.css';

export default function ProcessTable({ processes, onAddProcess, onRemoveProcess, onClearAll, onResetDefaults }) {
  const [newProcess, setNewProcess] = useState({
    id: getNextProcessId(processes),
    arrivalTime: '0',
    burstTime: '4',
    priority: '1'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setNewProcess((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear specific error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const validation = validateProcess(newProcess, processes);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdProcess = {
      id: newProcess.id.trim(),
      arrivalTime: parseInt(newProcess.arrivalTime, 10),
      burstTime: parseInt(newProcess.burstTime, 10),
      priority: newProcess.priority !== '' ? parseInt(newProcess.priority, 10) : 1
    };

    onAddProcess(createdProcess);
    
    // Auto increment next ID suggestion
    const updatedList = [...processes, createdProcess];
    setNewProcess({
      id: getNextProcessId(updatedList),
      arrivalTime: '0',
      burstTime: '4',
      priority: '1'
    });
    setErrors({});
  };

  return (
    <div className="process-input-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="section-icon">
            <ListPlus size={18} />
          </div>
          <div>
            <h2 className="card-title">Process Configuration</h2>
            <p className="card-subtitle">Manage process burst times, arrival times, and priorities</p>
          </div>
        </div>
        <div className="card-actions">
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onResetDefaults}
            title="Reset to sample processes"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>
          <button 
            type="button" 
            className="btn btn-danger-outline btn-sm"
            onClick={onClearAll}
            disabled={processes.length === 0}
            title="Clear all processes"
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Add Process Form */}
      <form onSubmit={handleAddSubmit} className="add-process-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="proc-id" className="form-label">
              Process ID <span className="req">*</span>
            </label>
            <input
              id="proc-id"
              type="text"
              className={`form-input mono ${errors.id ? 'input-error' : ''}`}
              placeholder="e.g. P1"
              value={newProcess.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
            />
            {errors.id && <span className="field-error">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="arrival-time" className="form-label">
              Arrival Time (AT) <span className="req">*</span>
            </label>
            <input
              id="arrival-time"
              type="number"
              min="0"
              className={`form-input mono ${errors.arrivalTime ? 'input-error' : ''}`}
              placeholder="0"
              value={newProcess.arrivalTime}
              onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
            />
            {errors.arrivalTime && <span className="field-error">{errors.arrivalTime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="burst-time" className="form-label">
              Burst Time (BT) <span className="req">*</span>
            </label>
            <input
              id="burst-time"
              type="number"
              min="1"
              className={`form-input mono ${errors.burstTime ? 'input-error' : ''}`}
              placeholder="1"
              value={newProcess.burstTime}
              onChange={(e) => handleInputChange('burstTime', e.target.value)}
            />
            {errors.burstTime && <span className="field-error">{errors.burstTime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority <span className="opt">(Lower = Higher)</span>
            </label>
            <input
              id="priority"
              type="number"
              min="0"
              className={`form-input mono ${errors.priority ? 'input-error' : ''}`}
              placeholder="1"
              value={newProcess.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
            />
            {errors.priority && <span className="field-error">{errors.priority}</span>}
          </div>

          <div className="form-group add-btn-container">
            <button type="submit" className="btn btn-primary add-proc-btn">
              <Plus size={16} />
              <span>Add Process</span>
            </button>
          </div>
        </div>
      </form>

      {/* Process Table */}
      <div className="table-wrapper">
        <table className="process-table">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Priority</th>
              <th className="th-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="5">
                  <div className="empty-state-cell">
                    <AlertCircle size={20} className="empty-icon" />
                    <span>No processes configured. Add a process or reset to default sample data.</span>
                  </div>
                </td>
              </tr>
            ) : (
              processes.map((proc, index) => (
                <tr key={proc.id + '-' + index}>
                  <td>
                    <span className="process-id-badge mono">{proc.id}</span>
                  </td>
                  <td className="mono">{proc.arrivalTime}</td>
                  <td className="mono">{proc.burstTime}</td>
                  <td className="mono">{proc.priority !== undefined ? proc.priority : '-'}</td>
                  <td className="td-action">
                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => onRemoveProcess(proc.id)}
                      title={`Remove ${proc.id}`}
                      aria-label={`Remove process ${proc.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer-info">
        <span>Total configured processes: <strong>{processes.length}</strong></span>
        {processes.length > 0 && (
          <span>Total burst execution: <strong>{processes.reduce((acc, curr) => acc + (Number(curr.burstTime) || 0), 0)} units</strong></span>
        )}
      </div>
    </div>
  );
}
