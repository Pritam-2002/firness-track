import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutTemplate, Exercise } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface CreateWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateWorkoutModal({ visible, onClose }: CreateWorkoutModalProps) {
  const { createWorkoutTemplate } = useAppContext();
  const [workoutName, setWorkoutName] = useState('');
  const [category, setCategory] = useState<'strength' | 'cardio' | 'flexibility' | 'mixed'>('strength');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showAddExercise, setShowAddExercise] = useState(false);

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
    setShowAddExercise(false);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (!workoutName.trim() || exercises.length === 0) {
        Alert.alert('Error', 'Please enter a workout name and add at least one exercise');
        return;
      }

      const estimatedDuration = exercises.reduce((total, ex) => {
        const exerciseTime = (ex.sets || 1) * ((ex.reps || 10) * 2 + (ex.restTime || 60)) / 60;
        return total + exerciseTime;
      }, 0);

      const estimatedCalories = exercises.reduce((total, ex) => total + (ex.estimatedCalories || 50), 0);

      const template: WorkoutTemplate = {
        id: Date.now().toString(),
        name: workoutName,
        exercises,
        estimatedDuration: Math.round(estimatedDuration),
        estimatedCalories,
        category,
        createdAt: new Date().toISOString(),
      };

      await createWorkoutTemplate(template);
      
      // Reset form
      setWorkoutName('');
      setExercises([]);
      setCategory('strength');
      onClose();
      
      Alert.alert('Success', 'Workout created successfully!');
    } catch (error) {
      console.error('Error creating workout:', error);
      Alert.alert('Error', 'Failed to create workout. Please try again.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Workout</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.label}>Workout Name</Text>
            <TextInput
              style={styles.input}
              value={workoutName}
              onChangeText={setWorkoutName}
              placeholder="Enter workout name"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryRow}>
              {(['strength', 'cardio', 'flexibility', 'mixed'] as const).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryButton, category === cat && styles.activeCategoryButton]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.categoryText, category === cat && styles.activeCategoryText]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Exercises ({exercises.length})</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setShowAddExercise(true)}
              >
                <Ionicons name="add" size={20} color={Colors.primary} />
                <Text style={styles.addButtonText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>

            {exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <TouchableOpacity onPress={() => removeExercise(index)}>
                    <Ionicons name="trash-outline" size={18} color={Colors.red[500]} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight && ` @ ${exercise.weight}kg`}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {showAddExercise && (
          <AddExerciseForm
            onAdd={addExercise}
            onCancel={() => setShowAddExercise(false)}
          />
        )}
      </View>
    </Modal>
  );
}

function AddExerciseForm({ onAdd, onCancel }: { onAdd: (exercise: Exercise) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('');
  const [restTime, setRestTime] = useState('60');

  const handleAdd = () => {
    if (!name.trim()) return;

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: name.trim(),
      sets: parseInt(sets) || 3,
      reps: parseInt(reps) || 10,
      weight: weight ? parseInt(weight) : undefined,
      restTime: parseInt(restTime) || 60,
      estimatedCalories: 50, // Default estimate
    };

    onAdd(exercise);
    
    // Reset form
    setName('');
    setSets('3');
    setReps('10');
    setWeight('');
    setRestTime('60');
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.exerciseForm}>
        <Text style={styles.formTitle}>Add Exercise</Text>
        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Exercise name"
          placeholderTextColor={Colors.gray[400]}
        />
        
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Sets</Text>
            <TextInput
              style={styles.smallInput}
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reps</Text>
            <TextInput
              style={styles.smallInput}
              value={reps}
              onChangeText={setReps}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <TextInput
              style={styles.smallInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="Optional"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addExerciseButton} onPress={handleAdd}>
            <Text style={styles.addExerciseButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  saveText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.gray[900],
  },
  categoryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  activeCategoryText: {
    color: Colors.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  addButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  exerciseName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  exerciseDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
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
  exerciseForm: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxHeight: '80%',
  },
  formTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  smallInput: {
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[900],
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.gray[700],
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
  },
  addExerciseButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  addExerciseButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});