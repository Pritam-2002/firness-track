import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import MetricBlock from './MetricBlock';

interface FormCoachingModeProps {
  onRunComplete: (data: any) => void;
}

export default function FormCoachingMode({ onRunComplete }: FormCoachingModeProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [formMetrics] = useState({
    cadence: 172,
    strideLength: 1.2,
    groundContactTime: 245,
    verticalOscillation: 8.2,
  });

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleStartRun = () => {
    setIsRunning(true);
  };

  const handleEndRun = () => {
    setIsRunning(false);
    onRunComplete({
      type: 'form',
      formMetrics,
    });
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Get real-time biomechanical feedback during your run. Connect a compatible wearable device to enable form coaching.
        </Text>

        <View style={styles.deviceStatus}>
          <Text style={styles.statusTitle}>Device Status</Text>
          <Text style={styles.statusText}>No device connected</Text>
        </View>

        <View style={styles.supportedDevices}>
          <Text style={styles.sectionTitle}>Supported Devices</Text>
          <Text style={styles.deviceItem}>• Garmin Running Dynamics Pod</Text>
          <Text style={styles.deviceItem}>• Stryd Power Meter</Text>
          <Text style={styles.deviceItem}>• Polar H10 Heart Rate Monitor</Text>
        </View>

        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectButtonText}>Connect Device</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isRunning) {
    return (
      <View style={styles.container}>
        <Text style={styles.connectedTitle}>Device Connected ✓</Text>
        
        <Text style={styles.description}>
          Your form metrics will be monitored in real-time. You'll receive alerts if your running form needs adjustment.
        </Text>

        <View style={styles.metricsPreview}>
          <Text style={styles.sectionTitle}>Form Metrics to Track</Text>
          <View style={styles.metricsList}>
            <Text style={styles.metricItem}>• Cadence (steps per minute)</Text>
            <Text style={styles.metricItem}>• Stride length</Text>
            <Text style={styles.metricItem}>• Ground contact time</Text>
            <Text style={styles.metricItem}>• Vertical oscillation</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartRun}>
          <Text style={styles.startButtonText}>Start Form Coaching</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.runningTitle}>Form Coaching Active</Text>

      <View style={styles.formMetrics}>
        <MetricBlock 
          label="Cadence" 
          value={formMetrics.cadence.toString()} 
          unit="spm" 
          size="medium" 
        />
        <MetricBlock 
          label="Stride Length" 
          value={formMetrics.strideLength.toString()} 
          unit="m" 
          size="medium" 
        />
      </View>

      <View style={styles.formMetrics}>
        <MetricBlock 
          label="Ground Contact" 
          value={formMetrics.groundContactTime.toString()} 
          unit="ms" 
          size="medium" 
        />
        <MetricBlock 
          label="Vert. Oscillation" 
          value={formMetrics.verticalOscillation.toString()} 
          unit="cm" 
          size="medium" 
        />
      </View>

      <View style={styles.alerts}>
        <Text style={styles.alertsTitle}>Form Alerts</Text>
        <View style={styles.alertCard}>
          <Text style={styles.alertText}>✓ Cadence is optimal</Text>
        </View>
        <View style={styles.alertCard}>
          <Text style={styles.alertText}>⚠️ Try to reduce ground contact time</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.endButton} onPress={handleEndRun}>
        <Text style={styles.endButtonText}>End Run</Text>
      </TouchableOpacity>
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
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  deviceStatus: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  supportedDevices: {
    marginBottom: Spacing.xl,
  },
  deviceItem: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
    marginBottom: Spacing.xs,
  },
  metricItem: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
    marginBottom: Spacing.xs,
  },
  connectedTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.green[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  runningTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.green[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  metricsPreview: {
    marginBottom: Spacing.xl,
  },
  metricsList: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 8,
  },
  formMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  alerts: {
    marginBottom: Spacing.xl,
  },
  alertsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  alertCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.sm,
    borderRadius: 6,
    marginBottom: Spacing.xs,
  },
  alertText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[700],
  },
  connectButton: {
    backgroundColor: Colors.gray[900],
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
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
  endButton: {
    backgroundColor: Colors.red[600],
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  endButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});