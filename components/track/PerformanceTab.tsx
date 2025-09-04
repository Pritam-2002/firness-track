import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function PerformanceTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>VO2 Max</Text>
          <Text style={styles.metricValue}>52.3</Text>
          <Text style={styles.metricUnit}>ml/kg/min</Text>
          <Text style={styles.trendText}>↗ +2.1 this month</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Weekly Distance</Text>
          <Text style={styles.metricValue}>42.5</Text>
          <Text style={styles.metricUnit}>km</Text>
          <Text style={styles.trendText}>↗ +5.2km vs last week</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Average Pace</Text>
          <Text style={styles.metricValue}>4:32</Text>
          <Text style={styles.metricUnit}>min/km</Text>
          <Text style={styles.trendText}>↗ 8s faster</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Heart Rate Zones</Text>
          <View style={styles.hrZones}>
            <View style={[styles.hrBar, { backgroundColor: Colors.info, flex: 1 }]} />
            <View style={[styles.hrBar, { backgroundColor: Colors.success, flex: 2 }]} />
            <View style={[styles.hrBar, { backgroundColor: Colors.warning, flex: 3 }]} />
            <View style={[styles.hrBar, { backgroundColor: Colors.accent, flex: 2 }]} />
            <View style={[styles.hrBar, { backgroundColor: Colors.error, flex: 1 }]} />
          </View>
          <Text style={styles.metricUnit}>Zone 3 dominant</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  metricsGrid: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  metricCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  metricTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  metricValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  metricUnit: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    marginBottom: Spacing.xs,
  },
  trendText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.success,
    fontWeight: '600',
  },
  hrZones: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: Spacing.xs,
    gap: 1,
  },
  hrBar: {
    height: '100%',
  },
});