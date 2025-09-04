import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Workout } from './WeeklyPlanTab';

interface DayRowProps {
  day: string;
  date: string;
  workout?: Workout;
  isRestDay?: boolean;
  onPress: () => void;
}

export default function DayRow({ day, date, workout, isRestDay, onPress }: DayRowProps) {
  const getSuggestion = (workout?: Workout) => {
    if (!workout) return 'Tap to add workout';
    const suggestions = [
      'Move to AM for cooler temps',
      'Try hills today',
      'Focus on form',
      'Stay hydrated',
      'Listen to your body'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const getStatusIcon = () => {
    if (workout?.completed) return '✓';
    if (workout?.missed) return '✗';
    return '';
  };

  const getStatusStyle = () => {
    if (workout?.completed) return styles.completed;
    if (workout?.missed) return styles.missed;
    return {};
  };

  return (
    <TouchableOpacity style={[styles.container, getStatusStyle()]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {getStatusIcon() && (
          <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.leftColumn}>
          {isRestDay ? (
            <View style={styles.restContent}>
              <Text style={styles.restText}>Rest Day</Text>
            </View>
          ) : workout ? (
            <View style={styles.workoutContent}>
              <Text style={styles.distance}>{workout.distance}</Text>
              <Text style={styles.type}>{workout.type}</Text>
              {workout.paceTarget && (
                <Text style={styles.pace}>{workout.paceTarget}</Text>
              )}
            </View>
          ) : (
            <View style={styles.emptyContent}>
              <Text style={styles.emptyText}>No workout planned</Text>
            </View>
          )}
        </View>
        
        <View style={styles.rightColumn}>
          <Text style={styles.suggestion}>{getSuggestion(workout)}</Text>
          <Text style={styles.notePrompt}>Add note</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  completed: {
    borderColor: Colors.green[300],
    backgroundColor: Colors.green[50],
  },
  missed: {
    borderColor: Colors.red[300],
    backgroundColor: Colors.red[50],
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  day: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  statusIcon: {
    fontSize: Typography.fontSize.lg,
    color: Colors.primary,
  },
  content: {
    flexDirection: 'row',
    padding: Spacing.sm,
  },
  leftColumn: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: Spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: Colors.gray[100],
  },
  workoutContent: {
    alignItems: 'flex-start',
  },
  distance: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: 2,
  },
  type: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  pace: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  restContent: {
    paddingVertical: Spacing.xs,
  },
  restText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[500],
    fontStyle: 'italic',
  },
  emptyContent: {
    paddingVertical: Spacing.xs,
  },
  emptyText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[400],
    fontStyle: 'italic',
  },
  suggestion: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
    fontStyle: 'italic',
  },
  notePrompt: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[400],
  },
});