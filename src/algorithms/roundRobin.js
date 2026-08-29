/**
 * Round Robin (RR) CPU Scheduling Algorithm (Preemptive)
 * @param {Array} processes - Array of { id, arrivalTime, burstTime, priority }
 * @param {number} timeQuantum - Time quantum per slice (positive integer)
 * @returns {Object} { ganttChart, processResults, metrics }
 */
export function solveRoundRobin(processes, timeQuantum = 2) {
  if (!processes || processes.length === 0) {
    return { ganttChart: [], processResults: [], metrics: null };
  }

  const quantum = Math.max(1, parseInt(timeQuantum, 10) || 2);

  // Deep clone and sort by arrival time and original index
  const procs = processes
    .map((p, originalIndex) => ({
      ...p,
      arrivalTime: Number(p.arrivalTime),
      burstTime: Number(p.burstTime),
      priority: Number(p.priority ?? 0),
      originalIndex,
      remainingTime: Number(p.burstTime),
      firstStartTime: null,
      completionTime: null,
      isCompleted: false
    }))
    .sort((a, b) => {
      if (a.arrivalTime !== b.arrivalTime) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.originalIndex - b.originalIndex;
    });

  const totalProcesses = procs.length;
  let completedCount = 0;
  let currentTime = 0;
  let totalIdleTime = 0;
  let arrivalIdx = 0;
  const readyQueue = [];
  const ganttChart = [];

  // Enqueue initial processes arrived at t=0
  while (arrivalIdx < totalProcesses && procs[arrivalIdx].arrivalTime <= currentTime) {
    readyQueue.push(procs[arrivalIdx]);
    arrivalIdx++;
  }

  while (completedCount < totalProcesses) {
    if (readyQueue.length === 0) {
      // If queue is empty, jump to next arriving process
      if (arrivalIdx < totalProcesses) {
        const nextArrival = procs[arrivalIdx].arrivalTime;
        const idleDuration = nextArrival - currentTime;
        ganttChart.push({
          processId: 'IDLE',
          startTime: currentTime,
          endTime: nextArrival,
          duration: idleDuration
        });
        totalIdleTime += idleDuration;
        currentTime = nextArrival;

        while (arrivalIdx < totalProcesses && procs[arrivalIdx].arrivalTime <= currentTime) {
          readyQueue.push(procs[arrivalIdx]);
          arrivalIdx++;
        }
      }
      continue;
    }

    const currentProc = readyQueue.shift();

    if (currentProc.firstStartTime === null) {
      currentProc.firstStartTime = currentTime;
    }

    const execTime = Math.min(quantum, currentProc.remainingTime);
    const startTime = currentTime;
    const endTime = currentTime + execTime;

    ganttChart.push({
      processId: currentProc.id,
      startTime,
      endTime,
      duration: execTime
    });

    currentProc.remainingTime -= execTime;
    currentTime = endTime;

    // Check newly arrived processes during this time interval
    while (arrivalIdx < totalProcesses && procs[arrivalIdx].arrivalTime <= currentTime) {
      readyQueue.push(procs[arrivalIdx]);
      arrivalIdx++;
    }

    if (currentProc.remainingTime > 0) {
      // Put back to ready queue
      readyQueue.push(currentProc);
    } else {
      // Process finished
      currentProc.completionTime = currentTime;
      currentProc.isCompleted = true;
      completedCount++;
    }
  }

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
