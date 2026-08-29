# CPU Job Scheduling Simulator

An interactive, client-side CPU job scheduling simulator built with **React** and **Vite**. Visualize, simulate, and compare fundamental operating system scheduling algorithms with real-time Gantt charts, per-process metrics, and comparative analytics.

---

## Features

- **5 Core CPU Scheduling Algorithms**:
  - **FCFS** (First Come, First Served) — Non-preemptive FIFO dispatching with idle CPU gap handling.
  - **SJF** (Shortest Job First) — Non-preemptive shortest burst execution with deterministic tie-breaking.
  - **SRTF** (Shortest Remaining Time First) — Preemptive shortest job execution with dynamic runtime preemption.
  - **Round Robin (RR)** — Preemptive time-sliced FIFO queue execution with configurable Time Quantum ($q$).
  - **Priority Scheduling** — Non-preemptive priority-based dispatching (lower integer = higher priority).

- **Execution Metrics & Performance Calculations**:
  - Per-Process: Completion Time ($CT$), Turnaround Time ($TAT$), Waiting Time ($WT$), and Response Time ($RT$).
  - System Averages: Average Waiting Time, Average Turnaround Time, Average Response Time.
  - System Efficiency: Total Makespan, CPU Idle Time, CPU Utilization (%), and Throughput ($\text{jobs}/\text{time unit}$).

- **Visual Gantt Chart Timeline**:
  - Proportional duration-scaled blocks.
  - Distinct process color coding, duration badges, and start/end time markers.
  - Visual diagonal-striped indicator for CPU idle intervals.

- **Multi-Algorithm Comparison Matrix & Charts**:
  - Side-by-side comparative table evaluating the same dataset across all 5 algorithms.
  - Best-metric highlights (lowest waiting time, highest CPU utilization, etc.).
  - Interactive SVG bar charts for Average Waiting Time, Turnaround Time, and Response Time.

- **Educational "How It Works" Guide**:
  - In-depth technical breakdown of scheduling principles, preemption rules, selection strategies, advantages, and limitations.

- **Input Validation & Safety**:
  - Validates process IDs, non-negative arrival times, positive burst times, integer priorities, and positive time quanta.
  - Prevents duplicate process IDs and invalid scheduling states.

---

## Tech Stack

- **Frontend**: React 18, JavaScript (ES6+), Vanilla CSS tokens & modules
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Architecture**: 100% client-side (no backend, database, or external APIs required)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/Shivagya-55/CPU-Job-Scheduling-Simulator.git

# Navigate to project directory
cd CPU-Job-Scheduling-Simulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Production Build
```bash
# Generate optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
CPU-Job-Scheduling-Simulator/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── styles/
    │   └── theme.css              # Global tokens & responsive typography
    ├── constants/
    │   ├── algorithms.js          # Algorithm metadata & educational specs
    │   └── defaultProcesses.js    # Sample starter processes
    ├── utils/
    │   └── validation.js          # Input validation helpers
    ├── algorithms/
    │   ├── fcfs.js                # First Come First Serve engine
    │   ├── sjf.js                 # Shortest Job First (Non-preemptive)
    │   ├── srtf.js                # Shortest Remaining Time First (Preemptive)
    │   ├── priority.js            # Priority Scheduling (Non-preemptive)
    │   ├── roundRobin.js          # Round Robin (Preemptive with Time Quantum)
    │   ├── comparison.js          # Multi-algorithm comparison aggregator
    │   └── index.js               # Dispatcher entry
    └── components/
        ├── Header/                # Brand header
        ├── ProcessInput/          # Process configuration table & form
        ├── AlgorithmSelector/     # Algorithm & Time Quantum selectors
        ├── SimulationControls/    # Simulation trigger & validation alerts
        └── ResultsSection/        # Results dashboard, Gantt chart, comparison matrix & charts
```
