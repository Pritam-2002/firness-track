import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import MetricBlock from './MetricBlock';

interface PartnerSyncModeProps {
  onRunComplete: (data: any) => void;
}

export default function PartnerSyncMode({ onRunComplete }: PartnerSyncModeProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [partners] = useState([
    { id: '1', name: 'Alex', progress: 65, pace: '7:45' },
    { id: '2', name: 'Sarah', progress: 58, pace: '8:12' },
  ]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleStartSync = () => {
    setIsRunning(true);
  };

  const handleLeaveSync = () => {
    setIsConnected(false);
    setIsRunning(false);
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Run the same workout with friends nearby. Sync your progress and stay motivated together.
        </Text>

        <View style={styles.availablePartners}>
          <Text style={styles.sectionTitle}>Available Partners</Text>
          <View style={styles.partnerCard}>
            <Text style={styles.partnerName}>Alex</Text>
            <Text style={styles.partnerStatus}>Ready to sync</Text>
          </View>
          <View style={styles.partnerCard}>
            <Text style={styles.partnerName}>Sarah</Text>
            <Text style={styles.partnerStatus}>In workout</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectButtonText}>Join Sync Group</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isRunning) {
    return (
      <View style={styles.container}>
        <Text style={styles.syncedTitle}>Synced with 2 partners</Text>
        
        <View style={styles.partnersList}>
          {partners.map((partner) => (
            <View key={partner.id} style={styles.partnerRow}>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.partnerReady}>Ready</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartSync}>
          <Text style={styles.startButtonText}>Start Synced Run</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveSync}>
          <Text style={styles.leaveButtonText}>Leave Sync</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.syncStatus}>Running with 2 partners</Text>

      <View style={styles.myMetrics}>
        <MetricBlock label="Your Progress" value="60%" size="medium" />
        <MetricBlock label="Your Pace" value="7:52" unit="/mi" size="medium" />
      </View>

      <View style={styles.partnerProgress}>
        <Text style={styles.sectionTitle}>Partner Progress</Text>
        {partners.map((partner) => (
          <View key={partner.id} style={styles.partnerProgressRow}>
            <Text style={styles.partnerName}>{partner.name}</Text>
            <Text style={styles.partnerProgressText}>{partner.progress}%</Text>
            <Text style={styles.partnerPace}>{partner.pace}/mi</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveSync}>
        <Text style={styles.leaveButtonText}>Run Solo</Text>
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
  availablePartners: {
    marginBottom: Spacing.xl,
  },
  partnerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  partnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  partnerProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  partnerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    flex: 1,
  },
  partnerStatus: {
    fontSize: Typography.fontSize.sm,
    color: Colors.green[600],
  },
  partnerReady: {
    fontSize: Typography.fontSize.sm,
    color: Colors.green[600],
    fontWeight: '500',
  },
  partnerProgressText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
    marginRight: Spacing.md,
  },
  partnerPace: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  syncedTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.green[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  syncStatus: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.green[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  partnersList: {
    marginBottom: Spacing.xl,
  },
  myMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
  },
  partnerProgress: {
    marginBottom: Spacing.xl,
  },
  connectButton: {
    backgroundColor: Colors.green[600],
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Spacing.md,
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
    marginBottom: Spacing.md,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
  },
  leaveButton: {
    backgroundColor: Colors.gray[200],
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: Colors.gray[700],
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});