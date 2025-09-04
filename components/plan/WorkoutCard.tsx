import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Shadows, BorderRadius } from '../../constants/theme';

export interface Workout {
  id: string;
  distance: string;
  type: string;
  paceTarget?: string;
  warmup?: string;
  mainSet?: string;
  cooldown?: string;
  notes?: string;
}

interface WorkoutCardProps {
  day: string;
  date: string;
  workout?: Workout;
  isRestDay?: boolean;
  onPress: () => void;
}

export default function WorkoutCard({ day, date, workout, isRestDay, onPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      
      {isRestDay ? (
        <View style={styles.restContent}>
          <Text style={styles.restText}>Rest Day</Text>
          <Text style={styles.restSubtext}>Tap to add workout</Text>
        </View>
      ) : workout ? (
        <View style={styles.workoutContent}>
          <Text style={styles.distance}>{workout.distance}</Text>
          <Text style={styles.type}>{workout.type}</Text>
          {workout.paceTarget && (
            <Text style={styles.pace}>{workout.paceTarget}</Text>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginHorizontal: Spacing.xs,
    width: 120,
    ...Shadows.sm,
  },
  header: {
    marginBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
    paddingBottom: Spacing.xs,
  },
  day: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.gray[500],
    textTransform: 'uppercase',
  },
  date: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[400],
  },
  workoutContent: {
    alignItems: 'flex-start',
    minHeight: 60,
  },
  distance: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: 2,
  },
  type: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  pace: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[500],
  },
  restContent: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    minHeight: 60,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderStyle: 'dashed',
    borderRadius: BorderRadius.sm,
  },
  restText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    marginBottom: 2,
  },
  restSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[400],
  },
});