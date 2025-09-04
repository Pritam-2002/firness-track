import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

export default function AdaptPlanTab() {
  const [weeklyMileage, setWeeklyMileage] = useState('25');

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Mileage Cap</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={weeklyMileage}
            onChangeText={setWeeklyMileage}
            keyboardType="numeric"
            placeholder="25"
          />
          <Text style={styles.inputLabel}>miles per week</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule Adjustments</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Shift Workout Days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pause This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Skip to Next Week</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recalculate Plan</Text>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            Update Plan Based on Goal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.sm,
    padding: Spacing.xs,
    fontSize: Typography.fontSize.sm,
    width: 60,
    textAlign: 'center',
    marginRight: Spacing.sm,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  button: {
    backgroundColor: Colors.gray[50],
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  buttonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[700],
    textAlign: 'center',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  primaryButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});