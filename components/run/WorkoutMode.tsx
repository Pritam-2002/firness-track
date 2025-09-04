import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import MetricBlock from './MetricBlock';

interface WorkoutStep {
  id: string;
  type: 'warmup' | 'interval' | 'recovery' | 'cooldown';
  distance?: number;
  time?: number;
  pace?: string;
  description: string;
}

interface WorkoutModeProps {
  workout?: {
    name: string;
    steps: WorkoutStep[];
  };
  onRunComplete: (data: any) => void;
}

export default function WorkoutMode({ workout, onRunComplete }: WorkoutModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Format seconds to MM:SS or HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate pace (minutes per mile)
  const calculatePace = (): string => {
    if (distance === 0 || elapsedSeconds === 0) return '0:00';
    const paceInSeconds = elapsedSeconds / distance;
    const paceMinutes = Math.floor(paceInSeconds / 60);
    const paceSeconds = Math.floor(paceInSeconds % 60);
    return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
        // Simulate distance tracking
        setDistance(prev => prev + 0.002); // Slightly faster for workout mode
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const defaultWorkout = {
    name: "5 Mile Tempo Run",
    steps: [
      { id: '1', type: 'warmup' as const, distance: 1, description: '1 mile easy warm-up' },
      { id: '2', type: 'interval' as const, distance: 3, pace: '7:30', description: '3 miles at tempo pace' },
      { id: '3', type: 'cooldown' as const, distance: 1, description: '1 mile easy cool-down' },
    ]
  };

  const activeWorkout = workout || defaultWorkout;
  const currentStepData = activeWorkout.steps[currentStep];
  const progress = ((currentStep + 1) / activeWorkout.steps.length) * 100;

  const handleStartWorkout = () => {
    setIsRunning(true);
    setIsPaused(false);
    setElapsedSeconds(0);
    setDistance(0);
  };

  const handlePauseWorkout = () => {
    setIsPaused(!isPaused);
  };

  const handleNextStep = () => {
    if (currentStep < activeWorkout.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteWorkout();
    }
  };

  const handleCompleteWorkout = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    onRunComplete({
      type: 'workout',
      workoutName: activeWorkout.name,
      completed: true,
      time: formatTime(elapsedSeconds),
      distance: distance.toFixed(2),
      pace: calculatePace(),
      elapsedSeconds,
    });
    
    // Reset values
    setElapsedSeconds(0);
    setDistance(0);
    setCurrentStep(0);
  };

  if (!isRunning) {
    return (
      <View style={styles.container}>
        <Text style={styles.workoutTitle}>{activeWorkout.name}</Text>
        
        <View style={styles.stepsPreview}>
          {activeWorkout.steps.map((step, index) => (
            <View key={step.id} style={styles.stepPreview}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.currentStepTitle}>
        Step {currentStep + 1} of {activeWorkout.steps.length}
      </Text>
      
      <Text style={styles.stepDescription}>
        {currentStepData.description}
      </Text>

      {currentStepData.pace && (
        <Text style={styles.targetPace}>Target Pace: {currentStepData.pace}/mi</Text>
      )}

      <View style={styles.metrics}>
        <MetricBlock label="Time" value={formatTime(elapsedSeconds)} size="medium" />
        <MetricBlock label="Distance" value={distance.toFixed(2)} unit="mi" size="medium" />
        <MetricBlock label="Current Pace" value={calculatePace()} unit="/mi" size="medium" />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.pauseButton]} 
          onPress={handlePauseWorkout}
        >
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>
            {currentStep === activeWorkout.steps.length - 1 ? 'Complete Workout' : 'Next Step'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  stepsPreview: {
    marginBottom: Spacing.xl,
  },
  stepPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray[200],
    color: Colors.gray[700],
    textAlign: 'center',
    fontSize: Typography.fontSize.sm,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
  },
  stepDescription: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray[200],
    borderRadius: 2,
    marginBottom: Spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.green[500],
    borderRadius: 2,
  },
  currentStepTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  targetPace: {
    fontSize: Typography.fontSize.base,
    color: Colors.green[600],
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: Spacing.lg,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
  },
  startButton: {
    backgroundColor: Colors.gray[900],
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: Colors.green[600],
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  controlButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: Colors.gray[200],
  },
  controlButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
});