import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function QuickAddTab() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  const quickAddItems = [
    { id: 'run', title: '+ Run', subtitle: 'Log a completed run', icon: '🏃‍♂️' },
    { id: 'meal', title: '+ Meal', subtitle: 'Add macro breakdown', icon: '🍽️' },
    { id: 'hydration', title: '+ Hydration', subtitle: 'Track water intake', icon: '💧' },
    { id: 'sleep', title: '+ Sleep', subtitle: 'Enter sleep duration', icon: '😴' },
    { id: 'symptom', title: '+ Symptom', subtitle: 'Log pain or fatigue', icon: '⚠️' },
  ];

  const handleQuickAdd = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const renderModal = () => (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add {modalType}</Text>
          
          {modalType === 'run' && (
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder="Duration (minutes)" />
              <TextInput style={styles.input} placeholder="Distance (km)" />
              <TextInput style={styles.input} placeholder="Perceived effort (1-10)" />
            </View>
          )}
          
          {modalType === 'hydration' && (
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder="Cups of water" />
            </View>
          )}
          
          {modalType === 'sleep' && (
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder="Hours slept" />
            </View>
          )}
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Quick Add</Text>
        <Text style={styles.sectionSubtitle}>
          Quickly log new data to track your progress
        </Text>
        
        <View style={styles.quickAddGrid}>
          {quickAddItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickAddCard}
              onPress={() => handleQuickAdd(item.id)}
            >
              <Text style={styles.quickAddIcon}>{item.icon}</Text>
              <Text style={styles.quickAddTitle}>{item.title}</Text>
              <Text style={styles.quickAddSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {renderModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
    marginBottom: Spacing.lg,
  },
  quickAddGrid: {
    gap: Spacing.md,
  },
  quickAddCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    alignItems: 'center',
  },
  quickAddIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  quickAddTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  quickAddSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 16,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  inputGroup: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    padding: Spacing.sm,
    fontSize: Typography.fontSize.base,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  button: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray[200],
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.gray[700],
    fontWeight: '600',
  },
  saveButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});