import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import DayRow from './DayRow';
import { Colors, Typography, Spacing } from '../../constants/theme';

export interface Workout {
  id: string;
  distance: string;
  type: string;
  paceTarget?: string;
  warmup?: string;
  mainSet?: string;
  cooldown?: string;
  notes?: string;
  completed?: boolean;
  missed?: boolean;
}

interface WeeklyPlanTabProps {
  onWorkoutPress: (day: string, workout?: Workout) => void;
}

export default function WeeklyPlanTab({ onWorkoutPress }: WeeklyPlanTabProps) {
  const weekData = [
    { day: 'Mon', date: 'Dec 9', workout: { id: '1', distance: '3 miles', type: 'Easy Run', paceTarget: '8:30/mi', completed: true } },
    { day: 'Tue', date: 'Dec 10', isRestDay: true },
    { day: 'Wed', date: 'Dec 11', workout: { id: '2', distance: '5 miles', type: 'Tempo Run', paceTarget: '7:45/mi' } },
    { day: 'Thu', date: 'Dec 12', workout: { id: '3', distance: '4 miles', type: 'Intervals', paceTarget: '7:00/mi', missed: true } },
    { day: 'Fri', date: 'Dec 13', isRestDay: true },
    { day: 'Sat', date: 'Dec 14', workout: { id: '4', distance: '8 miles', type: 'Long Run', paceTarget: '8:45/mi' } },
    { day: 'Sun', date: 'Dec 15', isRestDay: true },
  ];

  const completedMiles = weekData.reduce((sum, day) => {
    if (day.workout?.completed && day.workout?.distance) {
      return sum + parseFloat(day.workout.distance.split(' ')[0]);
    }
    return sum;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Goal: 25 miles · Completed: {completedMiles} miles
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedMiles / 25) * 100}%` }]} />
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {weekData.map((day, index) => (
          <DayRow
            key={index}
            day={day.day}
            date={day.date}
            workout={day.workout}
            isRestDay={day.isRestDay}
            onPress={() => onWorkoutPress(day.day, day.workout)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  summaryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
});