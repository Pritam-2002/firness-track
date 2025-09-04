import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutTemplate, Exercise, WorkoutSession } from '../../types';

interface WorkoutSessionProps {
  template: WorkoutTemplate;
  onComplete: (session: WorkoutSession) => void;
  onCancel: () => void;
}

export default function WorkoutSessionComponent({ template, onComplete, onCancel }: WorkoutSessionProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>(
    template.exercises.map(ex => ({ ...ex, completed: false }))
  );
  const [startTime] = useState(new Date().toISOString());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      if (isResting && restTimeLeft > 0) {
        setRestTimeLeft(prev => prev - 1);
      } else if (isResting && restTimeLeft === 0) {
        setIsResting(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completeSet = () => {
    const currentExercise = exercises[currentExerciseIndex];
    const updatedExercises = [...exercises];
    
    if (!updatedExercises[currentExerciseIndex].actualSets) {
      updatedExercises[currentExerciseIndex].actualSets = 0;
    }
    
    updatedExercises[currentExerciseIndex].actualSets! += 1;
    
    if (updatedExercises[currentExerciseIndex].actualSets! >= (currentExercise.sets || 1)) {
      updatedExercises[currentExerciseIndex].completed = true;
      
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      }
    }
    
    setExercises(updatedExercises);
    
    // Start rest timer
    if (currentExercise.restTime && currentExercise.restTime > 0) {
      setIsResting(true);
      setRestTimeLeft(currentExercise.restTime);
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const finishWorkout = () => {
    const completedExercises = exercises.filter(ex => ex.completed).length;
    const totalExercises = exercises.length;
    
    if (completedExercises === 0) {
      Alert.alert('No Exercises Completed', 'Are you sure you want to finish without completing any exercises?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Finish', onPress: createSession }
      ]);
    } else {
      createSession();
    }
  };

  const createSession = () => {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      templateId: template.id,
      templateName: template.name,
      startTime,
      endTime: new Date().toISOString(),
      duration: Math.floor(elapsedTime / 60),
      exercises,
      totalCalories: exercises.reduce((total, ex) => total + (ex.estimatedCalories || 0), 0),
      completedAt: new Date().toISOString(),
    };
    
    onComplete(session);
  };

  const currentExercise = exercises[currentExerciseIndex];
  const completedExercises = exercises.filter(ex => ex.completed).length;
  const progress = (completedExercises / exercises.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="close" size={24} color={Colors.gray[600]} />
        </TouchableOpacity>
        <Text style={styles.title}>{template.name}</Text>
        <TouchableOpacity onPress={finishWorkout}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedExercises}/{exercises.length}</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.round(progress)}%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {isResting ? (
        <View style={styles.restContainer}>
          <Text style={styles.restTitle}>Rest Time</Text>
          <Text style={styles.restTimer}>{formatTime(restTimeLeft)}</Text>
          <TouchableOpacity style={styles.skipButton} onPress={skipRest}>
            <Text style={styles.skipButtonText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      ) : currentExercise ? (
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={styles.exerciseTarget}>
            Target: {currentExercise.sets} sets × {currentExercise.reps} reps
            {currentExercise.weight && ` @ ${currentExercise.weight}kg`}
          </Text>
          <Text style={styles.exerciseProgress}>
            Completed: {currentExercise.actualSets || 0}/{currentExercise.sets} sets
          </Text>
          
          <TouchableOpacity style={styles.completeButton} onPress={completeSet}>
            <Text style={styles.completeButtonText}>Complete Set</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.completedContainer}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.green[500]} />
          <Text style={styles.completedTitle}>Workout Complete!</Text>
          <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
            <Text style={styles.finishButtonText}>Finish Workout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.exerciseList}>
        {exercises.map((exercise, index) => (
          <View key={index} style={[
            styles.exerciseItem,
            index === currentExerciseIndex && styles.currentExerciseItem,
            exercise.completed && styles.completedExerciseItem
          ]}>
            <View style={styles.exerciseInfo}>
              <Text style={[
                styles.exerciseItemName,
                exercise.completed && styles.completedText
              ]}>
                {exercise.name}
              </Text>
              <Text style={styles.exerciseItemDetails}>
                {exercise.actualSets || 0}/{exercise.sets} sets
              </Text>
            </View>
            {exercise.completed && (
              <Ionicons name="checkmark-circle" size={20} color={Colors.green[500]} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  finishText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray[200],
    marginHorizontal: Spacing.lg,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  restContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  restTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  restTimer: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  skipButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.md,
  },
  skipButtonText: {
    color: Colors.gray[700],
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  exerciseContainer: {
    padding: Spacing.lg,
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  exerciseName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  exerciseTarget: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  exerciseProgress: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  completeButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
  },
  completedContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  completedTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  finishButton: {
    backgroundColor: Colors.green[500],
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  finishButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  currentExerciseItem: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  completedExerciseItem: {
    backgroundColor: Colors.green[50],
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseItemName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.gray[500],
  },
  exerciseItemDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
});