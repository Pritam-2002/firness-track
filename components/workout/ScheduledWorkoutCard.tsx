import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScheduledWorkout } from '../../types';

interface ScheduledWorkoutCardProps {
  scheduledWorkout: ScheduledWorkout;
  onStart: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}

export default function ScheduledWorkoutCard({ 
  scheduledWorkout, 
  onStart, 
  onReschedule, 
  onCancel 
}: ScheduledWorkoutCardProps) {
  const isToday = scheduledWorkout.scheduledDate === new Date().toISOString().split('T')[0];
  const isPast = new Date(scheduledWorkout.scheduledDate) < new Date();
  const isCompleted = scheduledWorkout.status === 'completed';

  const getStatusColor = () => {
    if (isCompleted) return Colors.success;
    if (isPast && !isCompleted) return Colors.error;
    if (isToday) return Colors.primary;
    return Colors.gray[600];
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (isPast && !isCompleted) return 'Missed';
    if (isToday) return 'Today';
    return 'Scheduled';
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.workoutName}>{scheduledWorkout.template.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.timeText}>
            {scheduledWorkout.scheduledTime} • {scheduledWorkout.template.estimatedDuration} min
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.exerciseCount}>
          {scheduledWorkout.template.exercises.length} exercises • {scheduledWorkout.template.estimatedCalories} cal
        </Text>
        <Text style={styles.category}>{scheduledWorkout.template.category}</Text>
      </View>

      <View style={styles.actions}>
        {!isCompleted && (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.startButton]}
              onPress={onStart}
            >
              <Ionicons name="play" size={16} color={Colors.white} />
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.rescheduleButton]}
              onPress={onReschedule}
            >
              <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
              <Text style={styles.rescheduleButtonText}>Reschedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Ionicons name="close" size={16} color={Colors.gray[500]} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  workoutName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  details: {
    marginBottom: Spacing.md,
  },
  exerciseCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  category: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  startButton: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  rescheduleButton: {
    backgroundColor: Colors.primary + '20',
    flex: 1,
  },
  rescheduleButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  cancelButton: {
    padding: Spacing.sm,
  },
});