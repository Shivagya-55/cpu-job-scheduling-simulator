import React from 'react';
import { BarChart3 } from 'lucide-react';
import './ResultsSection.css';

// Preset color palette for process bars
const PROCESS_COLORS = [
  { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' }, // Indigo (P1)
  { bg: '#ccfbf1', text: '#115e59', border: '#99f6e4' }, // Teal (P2)
  { bg: '#fef3c7', text: '#92400e', border: '#fde68a' }, // Amber (P3)
  { bg: '#fce7f3', text: '#9d174d', border: '#fbcfe8' }, // Pink (P4)
  { bg: '#ede9fe', text: '#5b21b6', border: '#ddd6fe' }, // Violet (P5)
  { bg: '#ffedd5', text: '#9a3412', border: '#fed7aa' }, // Orange (P6)
  { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' }, // Green (P7)
  { bg: '#e0f2fe', text: '#075985', border: '#bae6fd' }  // Sky (P8)
];

const IDLE_COLOR = {
  bg: '#f1f5f9',
  text: '#64748b',
  border: '#cbd5e1'
};

function getProcessColor(processId, processList = []) {
  if (processId === 'IDLE') return IDLE_COLOR;
  
  const match = processId.match(/^P(\d+)$/i);
  if (match) {
    const num = parseInt(match[1], 10);
    return PROCESS_COLORS[(num - 1) % PROCESS_COLORS.length];
  }

  // Fallback hash
  let hash = 0;
  for (let i = 0; i < processId.length; i++) {
    hash = processId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PROCESS_COLORS.length;
  return PROCESS_COLORS[index];
}

export default function GanttChart({ ganttChart = [] }) {
  if (!ganttChart || ganttChart.length === 0) return null;

  const totalDuration = ganttChart.reduce((sum, block) => sum + block.duration, 0);

  // Extract unique process IDs for legend
  const uniqueProcessIds = Array.from(new Set(ganttChart.map((b) => b.processId)));

  return (
    <div className="gantt-container">
      <div className="gantt-header">
        <div className="gantt-title-row">
          <div className="section-icon">
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 className="card-title">Gantt Chart Timeline</h3>
            <p className="card-subtitle">Chronological CPU execution and preemption schedule</p>
          </div>
        </div>

        {/* Process Legend */}
        <div className="gantt-legend">
          {uniqueProcessIds.map((pid) => {
            const color = getProcessColor(pid);
            return (
              <div key={pid} className="legend-item">
                <span
                  className="legend-color-box"
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.border
                  }}
                />
                <span className="legend-label mono">{pid}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gantt Timeline Strip */}
      <div className="gantt-scroll-wrapper">
        <div className="gantt-bar-wrapper">
          {ganttChart.map((block, index) => {
            const color = getProcessColor(block.processId);
            const isIdle = block.processId === 'IDLE';
            const flexWeight = Math.max(1, block.duration);

            return (
              <div
                key={`${block.processId}-${block.startTime}-${index}`}
                className={`gantt-block ${isIdle ? 'gantt-block-idle' : ''}`}
                style={{
                  flex: `${flexWeight} 0 auto`,
                  minWidth: `${Math.max(54, block.duration * 38)}px`,
                  backgroundColor: color.bg,
                  borderColor: color.border,
                  color: color.text
                }}
                title={`${block.processId}: [${block.startTime} → ${block.endTime}] (Duration: ${block.duration})`}
              >
                <div className="gantt-block-content">
                  <span className="gantt-process-id mono">{block.processId}</span>
                  <span className="gantt-duration mono">({block.duration}u)</span>
                </div>

                {/* Start Time Marker */}
                <span className="time-marker time-marker-start mono">
                  {block.startTime}
                </span>

                {/* End Time Marker on every block */}
                <span className="time-marker time-marker-end mono">
                  {block.endTime}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
