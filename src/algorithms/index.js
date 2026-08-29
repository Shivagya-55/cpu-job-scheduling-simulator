import { solveFCFS } from './fcfs';
import { solveSJF } from './sjf';
import { solveSRTF } from './srtf';
import { solvePriority } from './priority';
import { solveRoundRobin } from './roundRobin';

/**
 * Runs the selected CPU scheduling algorithm on the provided processes.
 * @param {string} algorithmId - 'FCFS' | 'SJF' | 'SRTF' | 'PRIORITY' | 'RR'
 * @param {Array} processes - Array of { id, arrivalTime, burstTime, priority }
 * @param {Object} options - { timeQuantum: number }
 * @returns {Object} { ganttChart, processResults, metrics }
 */
export function runScheduler(algorithmId, processes, options = {}) {
  if (!processes || processes.length === 0) {
    return {
      ganttChart: [],
      processResults: [],
      metrics: null
    };
  }

  switch (algorithmId) {
    case 'FCFS':
      return solveFCFS(processes);
    case 'SJF':
      return solveSJF(processes);
    case 'SRTF':
      return solveSRTF(processes);
    case 'PRIORITY':
      return solvePriority(processes);
    case 'RR':
      return solveRoundRobin(processes, options.timeQuantum);
    default:
      throw new Error(`Unsupported scheduling algorithm ID: "${algorithmId}"`);
  }
}
