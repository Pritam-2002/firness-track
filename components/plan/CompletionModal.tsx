import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Workout } from './WeeklyPlanTab';

interface CompletionModalProps {
  visible: boolean;
  workout?: Workout;
  day: string;
  onClose: () => void;
  onMarkComplete: () => void;
  onMarkMissed: () => void;
}

export default function CompletionModal({ 
  visible, 
  workout, 
  day, 
  onClose, 
  onMarkComplete, 
  onMarkMissed 
}: CompletionModalProps) {
  if (!workout) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{day} Workout</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.workoutSummary}>
              <Text style={styles.distance}>{workout.distance}</Text>
              <Text style={styles.type}>{workout.type}</Text>
              {workout.paceTarget && (
                <Text style={styles.pace}>Target: {workout.paceTarget}</Text>
              )}
            </View>

            <View style={styles.statusSection}>
              <Text style={styles.statusLabel}>Mark this workout as:</Text>
              
              <View style={styles.statusButtons}>
                <TouchableOpacity 
                  style={[styles.statusButton, styles.completeButton]} 
                  onPress={onMarkComplete}
                >
                  <Text style={styles.completeButtonText}>✓ Completed</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.statusButton, styles.missedButton]} 
                  onPress={onMarkMissed}
                >
                  <Text style={styles.missedButtonText}>✗ Missed</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    width: '85%',
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
  content: {
    padding: Spacing.md,
  },
  workoutSummary: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  distance: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  type: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  pace: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  statusSection: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[700],
    marginBottom: Spacing.md,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statusButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: Colors.green[500],
  },
  completeButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  missedButton: {
    backgroundColor: Colors.red[500],
  },
  missedButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});