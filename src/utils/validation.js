/**
 * Validates a single process input entry
 * @param {Object} process - { id, arrivalTime, burstTime, priority }
 * @param {Array} existingProcesses - Array of existing process objects
 * @param {string|null} currentId - Original ID if editing an existing process
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateProcess(process, existingProcesses = [], currentId = null) {
  const errors = {};
  const trimmedId = (process.id || '').trim();

  // Validate Process ID
  if (!trimmedId) {
    errors.id = 'Process ID is required.';
  } else {
    const isDuplicate = existingProcesses.some(
      (p) => p.id.trim().toLowerCase() === trimmedId.toLowerCase() && p.id !== currentId
    );
    if (isDuplicate) {
      errors.id = `Process ID "${trimmedId}" already exists.`;
    }
  }

  // Validate Arrival Time
  const arrival = Number(process.arrivalTime);
  if (process.arrivalTime === '' || process.arrivalTime === null || isNaN(arrival)) {
    errors.arrivalTime = 'Arrival Time is required.';
  } else if (!Number.isInteger(arrival) || arrival < 0) {
    errors.arrivalTime = 'Arrival Time must be an integer ≥ 0.';
  }

  // Validate Burst Time
  const burst = Number(process.burstTime);
  if (process.burstTime === '' || process.burstTime === null || isNaN(burst)) {
    errors.burstTime = 'Burst Time is required.';
  } else if (!Number.isInteger(burst) || burst <= 0) {
    errors.burstTime = 'Burst Time must be an integer > 0.';
  }

  // Validate Priority
  const priority = Number(process.priority);
  if (process.priority !== '' && process.priority !== null && process.priority !== undefined) {
    if (isNaN(priority) || !Number.isInteger(priority) || priority < 0) {
      errors.priority = 'Priority must be an integer ≥ 0.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates the entire simulation configuration before run
 * @param {Object} config - { algorithmId, timeQuantum, processes }
 * @returns {{ isValid: boolean, message: string|null }}
 */
export function validateSimulationConfig(config) {
  const { algorithmId, timeQuantum, processes } = config;

  if (!processes || processes.length === 0) {
    return {
      isValid: false,
      message: 'Please add at least one process to run the simulation.'
    };
  }

  // Check unique IDs across list
  const seenIds = new Set();
  for (const p of processes) {
    const trimmed = (p.id || '').trim().toLowerCase();
    if (!trimmed) {
      return { isValid: false, message: 'All processes must have a valid Process ID.' };
    }
    if (seenIds.has(trimmed)) {
      return { isValid: false, message: `Duplicate Process ID found: "${p.id}".` };
    }
    seenIds.add(trimmed);

    if (isNaN(p.arrivalTime) || Number(p.arrivalTime) < 0) {
      return { isValid: false, message: `Process ${p.id} has an invalid Arrival Time (must be ≥ 0).` };
    }
    if (isNaN(p.burstTime) || Number(p.burstTime) <= 0) {
      return { isValid: false, message: `Process ${p.id} has an invalid Burst Time (must be > 0).` };
    }
  }

  if (algorithmId === 'RR') {
    const q = Number(timeQuantum);
    if (isNaN(q) || !Number.isInteger(q) || q <= 0) {
      return {
        isValid: false,
        message: 'Round Robin requires a Time Quantum integer > 0.'
      };
    }
  }

  return {
    isValid: true,
    message: null
  };
}

/**
 * Suggests the next available process ID (e.g., P5)
 * @param {Array} processes
 * @returns {string}
 */
export function getNextProcessId(processes = []) {
  let maxNum = 0;
  processes.forEach((p) => {
    const match = (p.id || '').match(/^P(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });
  return `P${maxNum + 1 || processes.length + 1}`;
}
