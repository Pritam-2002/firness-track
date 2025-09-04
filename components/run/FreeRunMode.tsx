import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import MetricBlock from './MetricBlock';

interface FreeRunModeProps {
  onRunComplete: (data: any) => void;
}

export default function FreeRunMode({ onRunComplete }: FreeRunModeProps) {
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
        // Simulate distance tracking - in real app, this would come from GPS
        setDistance(prev => prev + 0.001); // Very slow increment for demo
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleStartRun = () => {
    setIsRunning(true);
    setIsPaused(false);
    setElapsedSeconds(0);
    setDistance(0);
  };

  const handlePauseRun = () => {
    setIsPaused(!isPaused);
  };

  const handleEndRun = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    onRunComplete({
      type: 'free',
      time: formatTime(elapsedSeconds),
      distance: distance.toFixed(2),
      pace: calculatePace(),
      elapsedSeconds,
    });
    
    // Reset values
    setElapsedSeconds(0);
    setDistance(0);
  };

  if (!isRunning) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Start an unstructured run to track your time, distance, and pace.
        </Text>
        
        <View style={styles.metricsPreview}>
          <MetricBlock label="Time" value="00:00" size="large" />
          <MetricBlock label="Distance" value="0.00" unit="mi" size="large" />
          <MetricBlock label="Avg Pace" value="0:00" unit="/mi" size="large" />
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartRun}>
          <Text style={styles.startButtonText}>Start Run</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.liveMetrics}>
        <MetricBlock label="Time" value={formatTime(elapsedSeconds)} size="large" />
        <MetricBlock label="Distance" value={distance.toFixed(2)} unit="mi" size="large" />
        <MetricBlock label="Live Pace" value={calculatePace()} unit="/mi" size="large" />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.pauseButton]} 
          onPress={handlePauseRun}
        >
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.endButton]} 
          onPress={handleEndRun}
        >
          <Text style={styles.endButtonText}>End Run</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  metricsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
  },
  liveMetrics: {
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
  endButton: {
    backgroundColor: Colors.red[600],
  },
  controlButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  endButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.white,
  },
});