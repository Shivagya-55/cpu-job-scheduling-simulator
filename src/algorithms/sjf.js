/**
 * Shortest Job First (SJF) CPU Scheduling Algorithm (Non-Preemptive)
 * @param {Array} processes - Array of { id, arrivalTime, burstTime, priority }
 * @returns {Object} { ganttChart, processResults, metrics }
 */
export function solveSJF(processes) {
  if (!processes || processes.length === 0) {
    return { ganttChart: [], processResults: [], metrics: null };
  }

  const procs = processes.map((p, originalIndex) => ({
    ...p,
    arrivalTime: Number(p.arrivalTime),
    burstTime: Number(p.burstTime),
    priority: Number(p.priority ?? 0),
    originalIndex,
    isCompleted: false
  }));

  const totalProcesses = procs.length;
  let completedCount = 0;
  let currentTime = 0;
  let totalIdleTime = 0;
  const ganttChart = [];
  const resultsMap = new Map();

  while (completedCount < totalProcesses) {
    // Find all arrived, uncompleted processes
    const available = procs.filter((p) => !p.isCompleted && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      // No process available at current time: jump to next nearest arrival time
      const nextArrival = Math.min(...procs.filter((p) => !p.isCompleted).map((p) => p.arrivalTime));
      const idleDuration = nextArrival - currentTime;
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: idleDuration
      });
      totalIdleTime += idleDuration;
      currentTime = nextArrival;
      continue;
    }

    // Select process with shortest burst time (tie-break: arrivalTime, then originalIndex)
    available.sort((a, b) => {
      if (a.burstTime !== b.burstTime) {
        return a.burstTime - b.burstTime;
      }
      if (a.arrivalTime !== b.arrivalTime) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.originalIndex - b.originalIndex;
    });

    const selected = available[0];
    const startTime = currentTime;
    const endTime = currentTime + selected.burstTime;
    const completionTime = endTime;
    const turnaroundTime = completionTime - selected.arrivalTime;
    const waitingTime = turnaroundTime - selected.burstTime;
    const responseTime = startTime - selected.arrivalTime;

    ganttChart.push({
      processId: selected.id,
      startTime,
      endTime,
      duration: selected.burstTime
    });

    resultsMap.set(selected.id, {
      id: selected.id,
      arrivalTime: selected.arrivalTime,
      burstTime: selected.burstTime,
      priority: selected.priority,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });

    selected.isCompleted = true;
    completedCount++;
    currentTime = endTime;
  }

  const processResults = processes.map((p) => resultsMap.get(p.id));
  const totalBurstTime = processResults.reduce((sum, p) => sum + p.burstTime, 0);
  const totalWaitingTime = processResults.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaroundTime = processResults.reduce((sum, p) => sum + p.turnaroundTime, 0);
  const totalResponseTime = processResults.reduce((sum, p) => sum + p.responseTime, 0);
  const totalExecutionTime = currentTime;

  const metrics = {
    averageWaitingTime: totalProcesses > 0 ? totalWaitingTime / totalProcesses : 0,
    averageTurnaroundTime: totalProcesses > 0 ? totalTurnaroundTime / totalProcesses : 0,
    averageResponseTime: totalProcesses > 0 ? totalResponseTime / totalProcesses : 0,
    totalExecutionTime,
    totalIdleTime,
    totalBurstTime,
    cpuUtilization: totalExecutionTime > 0 ? ((totalBurstTime / totalExecutionTime) * 100) : 100,
    throughput: totalExecutionTime > 0 ? (totalProcesses / totalExecutionTime) : 0
  };

  return {
    ganttChart,
    processResults,
    metrics
  };
}
