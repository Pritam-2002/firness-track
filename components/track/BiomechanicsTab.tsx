import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function BiomechanicsTab() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.alertCard}>
          <Text style={styles.alertText}>No wearable device connected</Text>
          <Text style={styles.alertSubtext}>Connect a device to see biomechanics data</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Stride Length</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.metricUnit}>cm</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Cadence</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.metricUnit}>steps/min</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Impact Asymmetry</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.metricUnit}>%</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Foot Strike Pattern</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.metricUnit}>Not available</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.md },
  alertCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.warning,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  alertText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  alertSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    textAlign: 'center',
  },
  metricCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: Spacing.sm,
  },
  metricTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  metricValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: Colors.gray[400],
  },
  metricUnit: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
});