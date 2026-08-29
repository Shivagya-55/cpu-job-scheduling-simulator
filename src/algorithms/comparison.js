import { solveFCFS } from './fcfs.js';
import { solveSJF } from './sjf.js';
import { solveSRTF } from './srtf.js';
import { solvePriority } from './priority.js';
import { solveRoundRobin } from './roundRobin.js';
import { ALGORITHMS } from '../constants/algorithms.js';

/**
 * Runs all 5 scheduling algorithms on the same process dataset for comparison.
 * @param {Array} processes - Array of process objects
 * @param {Object} options - { timeQuantum: number }
 * @returns {Object} { comparisons: Array, bestMetrics: Object }
 */
export function compareAllSchedulers(processes, options = {}) {
  if (!processes || processes.length === 0) {
    return { comparisons: [], bestMetrics: {} };
  }

  const timeQuantum = options.timeQuantum || 2;

  const engines = [
    { id: 'FCFS', runner: () => solveFCFS(processes) },
    { id: 'SJF', runner: () => solveSJF(processes) },
    { id: 'SRTF', runner: () => solveSRTF(processes) },
    { id: 'PRIORITY', runner: () => solvePriority(processes) },
    { id: 'RR', runner: () => solveRoundRobin(processes, timeQuantum) }
  ];

  const comparisons = engines.map(({ id, runner }) => {
    const meta = ALGORITHMS.find((a) => a.id === id);
    const result = runner();
    return {
      algorithmId: id,
      name: meta ? meta.name : id,
      shortName: meta ? meta.shortName : id,
      type: meta ? meta.type : 'Unknown',
      requiresQuantum: meta ? meta.requiresQuantum : false,
      metrics: result.metrics,
      processResults: result.processResults,
      ganttChart: result.ganttChart
    };
  });

  // Calculate best-performing metrics across all algorithms
  let minWT = Infinity;
  let minTAT = Infinity;
  let minRT = Infinity;
  let maxUtil = -Infinity;
  let maxThroughput = -Infinity;

  comparisons.forEach((item) => {
    if (item.metrics) {
      if (item.metrics.averageWaitingTime < minWT) minWT = item.metrics.averageWaitingTime;
      if (item.metrics.averageTurnaroundTime < minTAT) minTAT = item.metrics.averageTurnaroundTime;
      if (item.metrics.averageResponseTime < minRT) minRT = item.metrics.averageResponseTime;
      if (item.metrics.cpuUtilization > maxUtil) maxUtil = item.metrics.cpuUtilization;
      if (item.metrics.throughput > maxThroughput) maxThroughput = item.metrics.throughput;
    }
  });

  const bestMetrics = {
    minWaitingTime: minWT,
    minTurnaroundTime: minTAT,
    minResponseTime: minRT,
    maxCpuUtilization: maxUtil,
    maxThroughput: maxThroughput
  };

  return {
    comparisons,
    bestMetrics
  };
}
