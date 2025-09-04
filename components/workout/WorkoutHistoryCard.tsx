import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutSession } from '../../types';

interface WorkoutHistoryCardProps {
  session: WorkoutSession;
  onPress?: () => void;
}

export default function WorkoutHistoryCard({ session, onPress }: WorkoutHistoryCardProps) {
  const completedDate = new Date(session.completedAt);
  const completedExercises = session.exercises.filter(ex => ex.completed).length;
  const completionRate = Math.round((completedExercises / session.exercises.length) * 100);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate === 100) return Colors.secondary;
    if (rate >= 80) return Colors.yellow[500];
    return Colors.orange[500];
  };

  const getCompletionIcon = (rate: number) => {
    if (rate === 100) return 'checkmark-circle';
    if (rate >= 80) return 'checkmark-circle-outline';
    return 'time-outline';
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{session.templateName}</Text>
          <Text style={styles.workoutDate}>{formatDate(completedDate)}</Text>
        </View>
        
        <View style={styles.completionBadge}>
          <Ionicons 
            name={getCompletionIcon(completionRate)} 
            size={16} 
            color={getCompletionColor(completionRate)} 
          />
          <Text style={[styles.completionText, { color: getCompletionColor(completionRate) }]}>
            {completionRate}%
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.statText}>{session.duration} min</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="fitness-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.statText}>{completedExercises}/{session.exercises.length} exercises</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="flame-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.statText}>{session.totalCalories} cal</Text>
        </View>
      </View>

      {session.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notes} numberOfLines={2}>
            "{session.notes}"
          </Text>
        </View>
      )}

      <View style={styles.exercisePreview}>
        {session.exercises.slice(0, 3).map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseTag}>
            <Text style={styles.exerciseTagText}>{exercise.name}</Text>
            {exercise.completed && (
              <Ionicons name="checkmark" size={12} color={Colors.secondary} />
            )}
          </View>
        ))}
        {session.exercises.length > 3 && (
          <Text style={styles.moreExercises}>+{session.exercises.length - 3} more</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
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
  },
  workoutName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  workoutDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  completionText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  notesSection: {
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  notes: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[700],
    fontStyle: 'italic',
  },
  exercisePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  exerciseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  exerciseTagText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '500',
  },
  moreExercises: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[500],
    fontWeight: '500',
  },
});