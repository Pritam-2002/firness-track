import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function SleepRecoveryTab() {
  const sleepData = { duration: 7.5, quality: 85 };
  const recoveryScore = 78;
  const weeklyTrend = [75, 82, 68, 90, 85, 78, 85];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>You're well rested!</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Sleep Duration</Text>
          <Text style={styles.metricValue}>{sleepData.duration}h</Text>
          <Text style={styles.metricUnit}>Last night</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Sleep Quality</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${sleepData.quality}%`,
              backgroundColor: sleepData.quality >= 80 ? Colors.success : 
                             sleepData.quality >= 60 ? Colors.warning : Colors.error
            }]} />
          </View>
          <Text style={styles.metricUnit}>{sleepData.quality}% quality</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Recovery Score</Text>
          <Text style={styles.metricValue}>{recoveryScore}</Text>
          <Text style={styles.metricUnit}>HRV-based</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>7-Day Trend</Text>
          <View style={styles.trendChart}>
            {weeklyTrend.map((value, index) => (
              <View key={index} style={styles.trendBar}>
                <View style={[styles.trendFill, { 
                  height: `${value}%`,
                  backgroundColor: value >= 80 ? Colors.success : 
                                 value >= 60 ? Colors.warning : Colors.error
                }]} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.md },
  messageCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.success,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    color: Colors.success,
    fontWeight: '600',
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
    color: Colors.gray[900],
  },
  metricUnit: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: Spacing.xs,
  },
  progressFill: { height: '100%', borderRadius: 4 },
  trendChart: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-end',
    gap: 4,
    marginTop: Spacing.xs,
  },
  trendBar: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.gray[200],
    borderRadius: 2,
    justifyContent: 'flex-end',
  },
  trendFill: { borderRadius: 2 },
});