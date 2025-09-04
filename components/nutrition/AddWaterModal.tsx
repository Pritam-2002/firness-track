import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface AddWaterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
}

export default function AddWaterModal({ visible, onClose, onSave }: AddWaterModalProps) {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'ml' | 'oz'>('ml');

  const quickAmounts = unit === 'ml' ? [250, 500, 750, 1000] : [8, 16, 24, 32];

  const handleSave = () => {
    const numAmount = parseInt(amount);
    if (numAmount > 0) {
      const mlAmount = unit === 'ml' ? numAmount : numAmount * 29.5735; // Convert oz to ml
      onSave(mlAmount);
      setAmount('');
      onClose();
    }
  };

  const handleQuickAdd = (quickAmount: number) => {
    const mlAmount = unit === 'ml' ? quickAmount : quickAmount * 29.5735;
    onSave(mlAmount);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.gray[600]} />
            </TouchableOpacity>
            <Text style={styles.title}>Add Water</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <View style={styles.unitSelector}>
              <TouchableOpacity
                style={[styles.unitButton, unit === 'ml' && styles.activeUnit]}
                onPress={() => setUnit('ml')}
              >
                <Text style={[styles.unitText, unit === 'ml' && styles.activeUnitText]}>
                  ml
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, unit === 'oz' && styles.activeUnit]}
                onPress={() => setUnit('oz')}
              >
                <Text style={[styles.unitText, unit === 'oz' && styles.activeUnitText]}>
                  fl oz
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Custom Amount</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount in ${unit}`}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <TouchableOpacity 
                  style={[styles.saveButton, !amount && styles.disabledButton]}
                  onPress={handleSave}
                  disabled={!amount}
                >
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.quickSection}>
              <Text style={styles.quickTitle}>Quick Add</Text>
              <View style={styles.quickGrid}>
                {quickAmounts.map((quickAmount) => (
                  <TouchableOpacity
                    key={quickAmount}
                    style={styles.quickButton}
                    onPress={() => handleQuickAdd(quickAmount)}
                  >
                    <Ionicons name="water" size={24} color={Colors.primary} />
                    <Text style={styles.quickButtonText}>
                      {quickAmount}{unit}
                    </Text>
                  </TouchableOpacity>
                ))}
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '80%',
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
  placeholder: {
    width: 24,
  },
  content: {
    padding: Spacing.lg,
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  unitButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  activeUnit: {
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  unitText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[600],
  },
  activeUnitText: {
    color: Colors.primary,
  },
  inputSection: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.fontSize.base,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray[300],
  },
  saveButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.white,
  },
  quickSection: {},
  quickTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: Spacing.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  quickButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
});