import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface HydrationTrackerProps {
  current: number;
  goal: number;
  streak: number;
  onQuickAdd: (amount: number) => void;
  onAddWater: () => void;
}

export default function HydrationTracker({
  current,
  goal,
  streak,
  onQuickAdd,
  onAddWater
}: HydrationTrackerProps) {
  const progress = (current / goal) * 100;
  const isGoalMet = current >= goal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="water" size={24} color={Colors.primary} />
          <Text style={styles.title}>Hydration</Text>
          {streak > 0 && (
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#FF6B35" />
              <Text style={styles.streakText}>{streak}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddWater}>
          <Ionicons name="add" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          {current.toFixed(1)}L of {goal}L
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        {isGoalMet && (
          <Text style={styles.goalMetText}>🎉 Daily goal achieved!</Text>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickTitle}>Quick Add</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.quickButton}
            onPress={() => onQuickAdd(250)}
          >
            <Text style={styles.quickButtonText}>+250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickButton}
            onPress={() => onQuickAdd(500)}
          >
            <Text style={styles.quickButtonText}>+500ml</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickButton}
            onPress={() => onQuickAdd(1000)}
          >
            <Text style={styles.quickButtonText}>+1L</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginLeft: Spacing.sm,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  streakText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: Spacing.xs,
  },
  addButton: {
    padding: Spacing.xs,
  },
  progressSection: {
    marginBottom: Spacing.lg,
  },
  progressText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[700],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  goalMetText: {
    fontSize: Typography.fontSize.sm,
    color: '#059669',
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActions: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingTop: Spacing.md,
  },
  quickTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.primary,
  },
});