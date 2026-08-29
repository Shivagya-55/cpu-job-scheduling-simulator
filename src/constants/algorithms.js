export const ALGORITHMS = [
  {
    id: 'FCFS',
    name: 'First Come, First Served',
    shortName: 'FCFS',
    type: 'Non-Preemptive',
    description: 'Processes are dispatched in order of their arrival in the ready queue.',
    requiresQuantum: false
  },
  {
    id: 'SJF',
    name: 'Shortest Job First',
    shortName: 'SJF',
    type: 'Non-Preemptive',
    description: 'The process with the smallest execution burst time is selected next.',
    requiresQuantum: false
  },
  {
    id: 'SRTF',
    name: 'Shortest Remaining Time First',
    shortName: 'SRTF',
    type: 'Preemptive',
    description: 'Preemptive version of SJF where newly arrived shorter processes preempt running ones.',
    requiresQuantum: false
  },
  {
    id: 'PRIORITY',
    name: 'Priority Scheduling',
    shortName: 'Priority',
    type: 'Non-Preemptive',
    description: 'Processes are scheduled according to assigned priority (lower number = higher priority).',
    requiresQuantum: false
  },
  {
    id: 'RR',
    name: 'Round Robin',
    shortName: 'Round Robin',
    type: 'Preemptive',
    description: 'Each process is assigned a fixed time slice (quantum) in cyclic order.',
    requiresQuantum: true
  }
];

export const DEFAULT_TIME_QUANTUM = 2;
