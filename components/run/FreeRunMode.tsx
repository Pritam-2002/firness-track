import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import MetricBlock from './MetricBlock';

interface FreeRunModeProps {
  onRunComplete: (data: any) => void;
}

export default function FreeRunMode({ onRunComplete }: FreeRunModeProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState('00:00');
  const [distance, setDistance] = useState('0.00');
  const [pace, setPace] = useState('0:00');

  const handleStartRun = () => {
    setIsRunning(true);
    setIsPaused(false);
    // Start timer logic would go here
  };

  const handlePauseRun = () => {
    setIsPaused(!isPaused);
  };

  const handleEndRun = () => {
    setIsRunning(false);
    setIsPaused(false);
    onRunComplete({
      type: 'free',
      time,
      distance,
      pace,
    });
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
        <MetricBlock label="Time" value={time} size="large" />
        <MetricBlock label="Distance" value={distance} unit="mi" size="large" />
        <MetricBlock label="Live Pace" value={pace} unit="/mi" size="large" />
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