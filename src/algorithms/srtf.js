/**
 * Shortest Remaining Time First (SRTF) CPU Scheduling Algorithm (Preemptive)
 * @param {Array} processes - Array of { id, arrivalTime, burstTime, priority }
 * @returns {Object} { ganttChart, processResults, metrics }
 */
export function solveSRTF(processes) {
  if (!processes || processes.length === 0) {
    return { ganttChart: [], processResults: [], metrics: null };
  }

  const procs = processes.map((p, originalIndex) => ({
    ...p,
    arrivalTime: Number(p.arrivalTime),
    burstTime: Number(p.burstTime),
    priority: Number(p.priority ?? 0),
    originalIndex,
    remainingTime: Number(p.burstTime),
    firstStartTime: null,
    completionTime: null,
    isCompleted: false
  }));

  const totalProcesses = procs.length;
  let completedCount = 0;
  let currentTime = 0;
  let totalIdleTime = 0;
  const rawTimeline = []; // will be compressed into contiguous gantt blocks

  while (completedCount < totalProcesses) {
    // Find all arrived, uncompleted processes
    const available = procs.filter((p) => !p.isCompleted && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      rawTimeline.push({
        processId: 'IDLE',
        time: currentTime
      });
      totalIdleTime++;
      currentTime++;
      continue;
    }

    // Select process with smallest remaining time (tie-break: arrivalTime, then originalIndex)
    available.sort((a, b) => {
      if (a.remainingTime !== b.remainingTime) {
        return a.remainingTime - b.remainingTime;
      }
      if (a.arrivalTime !== b.arrivalTime) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.originalIndex - b.originalIndex;
    });

    const selected = available[0];

    if (selected.firstStartTime === null) {
      selected.firstStartTime = currentTime;
    }

    rawTimeline.push({
      processId: selected.id,
      time: currentTime
    });

    selected.remainingTime--;
    currentTime++;

    if (selected.remainingTime === 0) {
      selected.isCompleted = true;
      selected.completionTime = currentTime;
      completedCount++;
    }
  }

  // Compress raw 1-unit timeline slices into contiguous Gantt blocks
  const ganttChart = [];
  for (const tick of rawTimeline) {
    const last = ganttChart[ganttChart.length - 1];
    if (last && last.processId === tick.processId && last.endTime === tick.time) {
      last.endTime = tick.time + 1;
      last.duration += 1;
    } else {
      ganttChart.push({
        processId: tick.processId,
        startTime: tick.time,
        endTime: tick.time + 1,
        duration: 1
      });
    }
  }

  // Calculate per-process metrics
  const resultsMap = new Map();
  for (const p of procs) {
    const turnaroundTime = p.completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    const responseTime = (p.firstStartTime ?? p.arrivalTime) - p.arrivalTime;

    resultsMap.set(p.id, {
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      priority: p.priority,
      completionTime: p.completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });
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
