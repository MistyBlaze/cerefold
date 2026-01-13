// Generate sine wave data for brainwave visualizations
export function generateSineWave(frequency, sampleRate = 256, duration = 2, noise = 0.05) {
  const samples = sampleRate * duration;
  const data = [];
  
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const value = Math.sin(2 * Math.PI * frequency * t) + (Math.random() * 2 - 1) * noise;
    data.push(value);
  }
  
  return data;
}

// Brainwave band definitions
export const BRAINWAVE_BANDS = [
  {
    name: 'Delta',
    frequency: '0.5-4 Hz',
    avgFreq: 2,
    color: '#1e3a8a',
    description: 'Deep sleep, healing, regeneration',
    amplitude: 1.0
  },
  {
    name: 'Theta',
    frequency: '4-8 Hz',
    avgFreq: 6,
    color: '#7c3aed',
    description: 'Meditation, creativity, memory consolidation',
    amplitude: 0.8
  },
  {
    name: 'Alpha',
    frequency: '8-12 Hz',
    avgFreq: 10,
    color: '#06b6d4',
    description: 'Relaxed awareness, calm focus',
    amplitude: 0.6
  },
  {
    name: 'Beta',
    frequency: '12-30 Hz',
    avgFreq: 20,
    color: '#22c55e',
    description: 'Active thinking, concentration',
    amplitude: 0.4
  },
  {
    name: 'Gamma',
    frequency: '30-100 Hz',
    avgFreq: 40,
    color: '#eab308',
    description: 'Peak cognition, insight, consciousness',
    amplitude: 0.3
  }
];

// Applications data
export const APPLICATIONS = [
  {
    id: 'neurofeedback',
    title: 'Neurofeedback Training',
    description: 'Real-time neural feedback for cognitive enhancement, stress reduction, and peak performance training',
    icon: 'brain'
  },
  {
    id: 'sleep',
    title: 'Sleep Optimization',
    description: 'Track sleep architecture including cerebellar involvement in sleep spindles and memory consolidation',
    icon: 'moon'
  },
  {
    id: 'movement',
    title: 'Movement Disorders',
    description: 'Early detection and monitoring of cerebellar dysfunction in conditions like ataxia, tremor, and Parkinson\'s',
    icon: 'activity'
  },
  {
    id: 'meditation',
    title: 'Meditation & Mindfulness',
    description: 'Precise measurement of meditative states, heart-brain coherence, and autonomic balance',
    icon: 'flower'
  },
  {
    id: 'research',
    title: 'Research & Clinical Trials',
    description: 'Research-grade data quality with consumer-grade accessibility for neuroscience studies',
    icon: 'microscope'
  },
  {
    id: 'bci',
    title: 'Brain-Computer Interface',
    description: 'Foundation for next-generation BCI applications with comprehensive neural state detection',
    icon: 'cpu'
  }
];

// Product features for orbit
export const PRODUCT_FEATURES = [
  {
    title: 'Cerebellar Capture',
    description: 'Dedicated posterior sensors for cerebellar oscillations (4-8Hz theta, 8-12Hz alpha)'
  },
  {
    title: 'Autonomic Decoding',
    description: 'Heart-brain coherence and vagal tone through integrated biosensors'
  },
  {
    title: 'High-Density Array',
    description: '64+ channels with medical-grade signal fidelity'
  },
  {
    title: 'Real-Time Processing',
    description: 'Sub-10ms latency neural state classification'
  },
  {
    title: 'Adaptive Filtering',
    description: 'AI-powered artifact rejection for clean signals in any environment'
  }
];
