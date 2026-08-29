/**
 * First Come, First Served (FCFS) CPU Scheduling Algorithm (Non-Preemptive)
 * @param {Array} processes - Array of { id, arrivalTime, burstTime, priority }
 * @returns {Object} { ganttChart, processResults, metrics }
 */
export function solveFCFS(processes) {
  if (!processes || processes.length === 0) {
    return { ganttChart: [], processResults: [], metrics: null };
  }

  // Clone and sort processes by arrival time, maintaining original order for ties
  const sorted = processes
    .map((p, originalIndex) => ({
      ...p,
      arrivalTime: Number(p.arrivalTime),
      burstTime: Number(p.burstTime),
      priority: Number(p.priority ?? 0),
      originalIndex
    }))
    .sort((a, b) => {
      if (a.arrivalTime !== b.arrivalTime) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.originalIndex - b.originalIndex;
    });

  const ganttChart = [];
  const resultsMap = new Map();
  let currentTime = 0;
  let totalIdleTime = 0;

  for (const proc of sorted) {
    // Check if CPU is idle before this process arrives
    if (currentTime < proc.arrivalTime) {
      const idleDuration = proc.arrivalTime - currentTime;
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: proc.arrivalTime,
        duration: idleDuration
      });
      totalIdleTime += idleDuration;
      currentTime = proc.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = currentTime + proc.burstTime;
    const completionTime = endTime;
    const turnaroundTime = completionTime - proc.arrivalTime;
    const waitingTime = turnaroundTime - proc.burstTime;
    const responseTime = startTime - proc.arrivalTime;

    ganttChart.push({
      processId: proc.id,
      startTime,
      endTime,
      duration: proc.burstTime
    });

    resultsMap.set(proc.id, {
      id: proc.id,
      arrivalTime: proc.arrivalTime,
      burstTime: proc.burstTime,
      priority: proc.priority,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });

    currentTime = endTime;
  }

  // Return processResults in the original input order
  const processResults = processes.map((p) => resultsMap.get(p.id));

  const totalProcesses = processResults.length;
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
