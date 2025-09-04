import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseLibraryProps {
  onSelectExercise: (exercise: any) => void;
  onClose: () => void;
}

const EXERCISE_CATEGORIES = {
  chest: [
    { name: 'Push-ups', muscle: 'Chest', difficulty: 'Beginner' },
    { name: 'Bench Press', muscle: 'Chest', difficulty: 'Intermediate' },
    { name: 'Dumbbell Flyes', muscle: 'Chest', difficulty: 'Intermediate' },
    { name: 'Incline Press', muscle: 'Chest', difficulty: 'Advanced' },
  ],
  back: [
    { name: 'Pull-ups', muscle: 'Back', difficulty: 'Intermediate' },
    { name: 'Rows', muscle: 'Back', difficulty: 'Beginner' },
    { name: 'Lat Pulldown', muscle: 'Back', difficulty: 'Intermediate' },
    { name: 'Deadlift', muscle: 'Back', difficulty: 'Advanced' },
  ],
  legs: [
    { name: 'Squats', muscle: 'Legs', difficulty: 'Beginner' },
    { name: 'Lunges', muscle: 'Legs', difficulty: 'Beginner' },
    { name: 'Leg Press', muscle: 'Legs', difficulty: 'Intermediate' },
    { name: 'Bulgarian Split Squats', muscle: 'Legs', difficulty: 'Advanced' },
  ],
  arms: [
    { name: 'Bicep Curls', muscle: 'Arms', difficulty: 'Beginner' },
    { name: 'Tricep Dips', muscle: 'Arms', difficulty: 'Intermediate' },
    { name: 'Hammer Curls', muscle: 'Arms', difficulty: 'Intermediate' },
    { name: 'Close-Grip Press', muscle: 'Arms', difficulty: 'Advanced' },
  ],
  shoulders: [
    { name: 'Shoulder Press', muscle: 'Shoulders', difficulty: 'Intermediate' },
    { name: 'Lateral Raises', muscle: 'Shoulders', difficulty: 'Beginner' },
    { name: 'Front Raises', muscle: 'Shoulders', difficulty: 'Beginner' },
    { name: 'Rear Delt Flyes', muscle: 'Shoulders', difficulty: 'Intermediate' },
  ],
  core: [
    { name: 'Plank', muscle: 'Core', difficulty: 'Beginner' },
    { name: 'Crunches', muscle: 'Core', difficulty: 'Beginner' },
    { name: 'Russian Twists', muscle: 'Core', difficulty: 'Intermediate' },
    { name: 'Hanging Leg Raises', muscle: 'Core', difficulty: 'Advanced' },
  ],
};

export default function ExerciseLibrary({ onSelectExercise, onClose }: ExerciseLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof EXERCISE_CATEGORIES>('chest');

  const categories = Object.keys(EXERCISE_CATEGORIES) as Array<keyof typeof EXERCISE_CATEGORIES>;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Exercise Library</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.activeCategoryTab
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText
                ]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.exerciseList}>
          {EXERCISE_CATEGORIES[selectedCategory].map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exerciseItem}
              onPress={() => onSelectExercise({
                id: Date.now().toString() + index,
                name: exercise.name,
                sets: 3,
                reps: 10,
                estimatedCalories: 50
              })}
            >
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.muscle} • {exercise.difficulty}
                </Text>
              </View>
              <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    width: '100%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  categoryTabs: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  categoryTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray[100],
  },
  activeCategoryTab: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  activeCategoryText: {
    color: Colors.white,
  },
  exerciseList: {
    flex: 1,
    padding: Spacing.lg,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  exerciseDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
});