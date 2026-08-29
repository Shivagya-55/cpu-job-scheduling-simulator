export const ALGORITHMS = [
  {
    id: 'FCFS',
    name: 'First Come, First Served',
    shortName: 'FCFS',
    type: 'Non-Preemptive',
    description: 'Processes are dispatched in order of their arrival in the ready queue.',
    requiresQuantum: false,
    educational: {
      principle: 'FIFO (First-In, First-Out) queuing where the CPU is assigned to processes strictly in order of arrival.',
      preemption: 'Non-Preemptive (Once a process gets the CPU, it executes until completion or I/O).',
      selectionRule: 'Process with the lowest Arrival Time (earliest arrival in ready queue).',
      timeQuantumRule: 'Not applicable.',
      advantages: [
        'Simple to understand and implement with standard FIFO queues.',
        'Zero scheduling overhead since no complex prioritization is needed.',
        'Deterministic order of execution.'
      ],
      limitations: [
        'Suffers from the Convoy Effect: short processes behind a CPU-heavy job experience very high waiting times.',
        'Poor average waiting and turnaround times compared to shortest-job approaches.'
      ]
    }
  },
  {
    id: 'SJF',
    name: 'Shortest Job First',
    shortName: 'SJF',
    type: 'Non-Preemptive',
    description: 'The process with the smallest execution burst time is selected next.',
    requiresQuantum: false,
    educational: {
      principle: 'Selects the waiting process with the smallest total CPU burst time among all currently arrived jobs.',
      preemption: 'Non-Preemptive (Running process keeps the CPU until its burst finishes).',
      selectionRule: 'Available process with min(Burst Time); ties broken by earliest arrival time.',
      timeQuantumRule: 'Not applicable.',
      advantages: [
        'Mathematically optimal for non-preemptive policies: minimizes average waiting time when all burst times are known.',
        'Maximizes overall system throughput for batches of short jobs.'
      ],
      limitations: [
        'Starvation / Indefinite Waiting: Continuous arrival of short jobs can indefinitely delay longer jobs.',
        'Requires prior knowledge or prediction of CPU burst durations.'
      ]
    }
  },
  {
    id: 'SRTF',
    name: 'Shortest Remaining Time First',
    shortName: 'SRTF',
    type: 'Preemptive',
    description: 'Preemptive version of SJF where newly arrived shorter processes preempt running ones.',
    requiresQuantum: false,
    educational: {
      principle: 'Dynamic preemption: Whenever a new process arrives, its remaining burst is compared against the currently executing process.',
      preemption: 'Preemptive (CPU is yielded immediately if a newly arrived job has a strictly smaller remaining burst time).',
      selectionRule: 'Process with min(Remaining Burst Time) at any given time unit.',
      timeQuantumRule: 'Not applicable (preempts upon arrival of shorter tasks).',
      advantages: [
        'Provides the theoretical minimum average waiting and turnaround times among all scheduling algorithms.',
        'Excellent responsiveness for short tasks in interactive environments.'
      ],
      limitations: [
        'Higher context switching overhead due to frequent preemptions.',
        'Risk of starvation for long jobs if short jobs keep arriving.'
      ]
    }
  },
  {
    id: 'PRIORITY',
    name: 'Priority Scheduling',
    shortName: 'Priority',
    type: 'Non-Preemptive',
    description: 'Processes are scheduled according to assigned priority (lower number = higher priority).',
    requiresQuantum: false,
    educational: {
      principle: 'Assigns the CPU based on urgency/importance ratings. (Convention: lower integer = higher priority).',
      preemption: 'Non-Preemptive (Running process executes to completion before the next highest priority process is dispatched).',
      selectionRule: 'Available process with min(Priority Value); ties broken by earliest arrival time.',
      timeQuantumRule: 'Not applicable.',
      advantages: [
        'Enables critical system tasks or high-priority user workloads to be serviced ahead of background jobs.',
        'Intuitive mechanism for policy-driven operating system scheduling.'
      ],
      limitations: [
        'Starvation / Indefinite Blocking: Low-priority jobs may wait indefinitely in busy systems (mitigated in practice by Aging).',
        'Does not optimize for throughput or average waiting time.'
      ]
    }
  },
  {
    id: 'RR',
    name: 'Round Robin',
    shortName: 'Round Robin',
    type: 'Preemptive',
    description: 'Each process is assigned a fixed time slice (quantum) in cyclic order.',
    requiresQuantum: true,
    educational: {
      principle: 'Time-sharing round-robin execution where each process receives a limited quantum of CPU time in cyclic FIFO order.',
      preemption: 'Preemptive (Process is forced to yield the CPU and re-enter the tail of the ready queue once its time quantum expires).',
      selectionRule: 'Next process at the front of the FIFO ready queue.',
      timeQuantumRule: 'Configurable time quantum (q). Small q increases responsiveness but raises context switch overhead; large q approaches FCFS.',
      advantages: [
        'Completely starvation-free: Every ready process is guaranteed regular CPU time.',
        'Fair distribution of CPU resources with predictable response times for interactive applications.'
      ],
      limitations: [
        'Performance heavily depends on the Time Quantum: Too small = excessive context switching overhead; too large = degenerates to FCFS.',
        'Higher average waiting time than SJF/SRTF.'
      ]
    }
  }
];

export const DEFAULT_TIME_QUANTUM = 2;
