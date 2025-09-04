import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Workout } from './WeeklyPlanTab';

interface WorkoutModalProps {
  visible: boolean;
  workout?: Workout;
  day: string;
  onClose: () => void;
  onSave: (workout: Workout) => void;
}

export default function WorkoutModal({ visible, workout, day, onClose, onSave }: WorkoutModalProps) {
  const [distance, setDistance] = useState(workout?.distance || '');
  const [type, setType] = useState(workout?.type || '');
  const [paceTarget, setPaceTarget] = useState(workout?.paceTarget || '');
  const [notes, setNotes] = useState(workout?.notes || '');

  const handleSave = () => {
    const updatedWorkout: Workout = {
      id: workout?.id || Date.now().toString(),
      distance,
      type,
      paceTarget,
      notes,
    };
    onSave(updatedWorkout);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{day} Workout</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Distance</Text>
              <TextInput
                style={styles.input}
                value={distance}
                onChangeText={setDistance}
                placeholder="e.g., 5 miles"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Type</Text>
              <TextInput
                style={styles.input}
                value={type}
                onChangeText={setType}
                placeholder="e.g., Tempo Run"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Pace Target</Text>
              <TextInput
                style={styles.input}
                value={paceTarget}
                onChangeText={setPaceTarget}
                placeholder="e.g., 8:00/mi"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Additional notes..."
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    margin: Spacing.md,
    width: '90%',
    maxHeight: '80%',
    ...Shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  closeButton: {
    fontSize: Typography.fontSize.lg,
    color: Colors.gray[500],
    padding: Spacing.xs,
  },
  form: {
    padding: Spacing.md,
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: Typography.fontSize.base,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.gray[700],
    fontSize: Typography.fontSize.base,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});