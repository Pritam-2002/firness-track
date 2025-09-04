import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScheduledWorkout } from '../../types';

interface TodayWorkoutCardProps {
  scheduledWorkout?: ScheduledWorkout;
  onStartWorkout?: () => void;
  onScheduleWorkout?: () => void;
}

export default function TodayWorkoutCard({ 
  scheduledWorkout, 
  onStartWorkout, 
  onScheduleWorkout 
}: TodayWorkoutCardProps) {
  
  if (!scheduledWorkout) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color={Colors.gray[400]} />
          <Text style={styles.emptyTitle}>No workout scheduled</Text>
          <Text style={styles.emptySubtitle}>Plan your workout for today</Text>
          <TouchableOpacity style={styles.scheduleButton} onPress={onScheduleWorkout}>
            <Ionicons name="add" size={16} color={Colors.white} />
            <Text style={styles.scheduleButtonText}>Schedule Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { template, scheduledTime, status } = scheduledWorkout;
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return Colors.secondary;
      case 'in-progress': return Colors.orange[500];
      case 'skipped': return Colors.gray[500];
      default: return Colors.primary;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in-progress': return 'play-circle';
      case 'skipped': return 'close-circle';
      default: return 'time-outline';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'skipped': return 'Skipped';
      default: return 'Scheduled';
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutTitle}>{template.name}</Text>
          <View style={styles.workoutMeta}>
            {scheduledTime && (
              <Text style={styles.workoutTime}>{formatTime(scheduledTime)}</Text>
            )}
            <Text style={styles.workoutDuration}>
              {template.estimatedDuration} min • {template.exercises.length} exercises
            </Text>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      <View style={styles.workoutDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="fitness-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.detailText}>{template.category}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="flame-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.detailText}>{template.estimatedCalories} cal</Text>
        </View>
      </View>

      <View style={styles.exercisePreview}>
        <Text style={styles.exerciseTitle}>Exercises:</Text>
        <View style={styles.exerciseList}>
          {template.exercises.slice(0, 3).map((exercise, index) => (
            <Text key={exercise.id} style={styles.exerciseName}>
              {exercise.name}{index < Math.min(template.exercises.length, 3) - 1 ? ', ' : ''}
            </Text>
          ))}
          {template.exercises.length > 3 && (
            <Text style={styles.moreExercises}> +{template.exercises.length - 3} more</Text>
          )}
        </View>
      </View>

      {!isCompleted && (
        <TouchableOpacity 
          style={[
            styles.startButton,
            isInProgress && styles.continueButton
          ]} 
          onPress={onStartWorkout}
        >
          <Ionicons 
            name={isInProgress ? "play-skip-forward" : "play"} 
            size={16} 
            color={Colors.white} 
          />
          <Text style={styles.startButtonText}>
            {isInProgress ? 'Continue Workout' : 'Start Workout'}
          </Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedSection}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.secondary} />
          <Text style={styles.completedText}>Great job! Workout completed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  workoutInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  workoutTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  workoutTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  workoutDuration: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    textTransform: 'capitalize',
  },
  exercisePreview: {
    marginBottom: Spacing.md,
  },
  exerciseTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: Spacing.xs,
  },
  exerciseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exerciseName: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  moreExercises: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  continueButton: {
    backgroundColor: Colors.orange[500],
  },
  startButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  completedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.secondary + '10',
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  completedText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[700],
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[500],
    marginBottom: Spacing.lg,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  scheduleButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});