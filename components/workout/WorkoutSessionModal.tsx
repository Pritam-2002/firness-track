import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutSession, Exercise } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface WorkoutSessionModalProps {
  visible: boolean;
  onClose: () => void;
  session: WorkoutSession;
}

export default function WorkoutSessionModal({ visible, onClose, session }: WorkoutSessionModalProps) {
  const { updateWorkoutSession, completeWorkoutSession } = useAppContext();
  const [currentSession, setCurrentSession] = useState<WorkoutSession>(session);
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && visible) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, visible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExerciseComplete = (exerciseIndex: number) => {
    const updatedExercises = currentSession.exercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        return { ...exercise, completed: !exercise.completed };
      }
      return exercise;
    });

    const updatedSession = {
      ...currentSession,
      exercises: updatedExercises,
    };

    setCurrentSession(updatedSession);
    updateWorkoutSession(updatedSession);
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleEndWorkout = () => {
    Alert.alert(
      'End Workout',
      'Are you sure you want to end this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Workout', 
          style: 'destructive',
          onPress: () => {
            const completedSession: WorkoutSession = {
              ...currentSession,
              endTime: new Date().toISOString(),
              duration: Math.round(elapsedTime / 60),
              completedAt: new Date().toISOString(),
            };
            
            completeWorkoutSession(completedSession);
            onClose();
          }
        },
      ]
    );
  };

  const completedExercises = currentSession.exercises.filter(ex => ex.completed).length;
  const progressPercentage = (completedExercises / currentSession.exercises.length) * 100;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handlePauseResume} style={styles.pauseButton}>
              <Ionicons 
                name={isRunning ? "pause" : "play"} 
                size={20} 
                color={Colors.white} 
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.workoutTitle}>{currentSession.templateName}</Text>
              <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleEndWorkout} style={styles.endButton}>
            <Text style={styles.endButtonText}>End</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {completedExercises} of {currentSession.exercises.length} exercises completed
            </Text>
            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Exercises */}
        <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
          {currentSession.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              onToggleComplete={() => toggleExerciseComplete(index)}
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

function ExerciseCard({ 
  exercise, 
  index, 
  onToggleComplete 
}: { 
  exercise: Exercise; 
  index: number; 
  onToggleComplete: () => void;
}) {
  return (
    <View style={[styles.exerciseCard, exercise.completed && styles.completedCard]}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseNumber}>#{index + 1}</Text>
          <View>
            <Text style={[styles.exerciseName, exercise.completed && styles.completedText]}>
              {exercise.name}
            </Text>
            <Text style={[styles.exerciseDetails, exercise.completed && styles.completedText]}>
              {exercise.sets} sets × {exercise.reps} reps
              {exercise.weight && ` @ ${exercise.weight}kg`}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.checkButton, exercise.completed && styles.checkedButton]}
          onPress={onToggleComplete}
        >
          {exercise.completed && (
            <Ionicons name="checkmark" size={20} color={Colors.white} />
          )}
        </TouchableOpacity>
      </View>

      {exercise.restTime && (
        <View style={styles.restInfo}>
          <Ionicons name="time-outline" size={16} color={Colors.gray[500]} />
          <Text style={styles.restText}>Rest: {exercise.restTime}s</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[900],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.primary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.white,
  },
  timer: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  endButton: {
    backgroundColor: Colors.red[500],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  endButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  progressSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
  },
  progressPercentage: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  exercisesList: {
    flex: 1,
    padding: Spacing.lg,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  completedCard: {
    backgroundColor: Colors.gray[50],
    opacity: 0.8,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  exerciseNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: 'bold',
    color: Colors.primary,
    backgroundColor: Colors.primary + '20',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
  },
  exerciseName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  exerciseDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.gray[500],
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedButton: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  restInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  restText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
});