import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function NutritionTab() {
  const macros = {
    protein: { current: 85, target: 120, unit: 'g' },
    carbs: { current: 180, target: 250, unit: 'g' },
    fat: { current: 45, target: 70, unit: 'g' },
  };

  const waterIntake = { current: 6, target: 8, unit: 'cups' };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.reminderCard}>
          <Text style={styles.reminderText}>
            You haven't logged today's intake
          </Text>
        </View>

        <View style={styles.macrosSection}>
          <Text style={styles.sectionTitle}>Daily Macros</Text>
          
          <View style={styles.macroCard}>
            <Text style={styles.macroTitle}>Protein</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${getProgressPercentage(macros.protein.current, macros.protein.target)}%`, backgroundColor: Colors.info }
                  ]} 
                />
              </View>
              <Text style={styles.macroValue}>
                {macros.protein.current}/{macros.protein.target}{macros.protein.unit}
              </Text>
            </View>
          </View>

          <View style={styles.macroCard}>
            <Text style={styles.macroTitle}>Carbs</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${getProgressPercentage(macros.carbs.current, macros.carbs.target)}%`, backgroundColor: Colors.success }
                  ]} 
                />
              </View>
              <Text style={styles.macroValue}>
                {macros.carbs.current}/{macros.carbs.target}{macros.carbs.unit}
              </Text>
            </View>
          </View>

          <View style={styles.macroCard}>
            <Text style={styles.macroTitle}>Fat</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${getProgressPercentage(macros.fat.current, macros.fat.target)}%`, backgroundColor: Colors.warning }
                  ]} 
                />
              </View>
              <Text style={styles.macroValue}>
                {macros.fat.current}/{macros.fat.target}{macros.fat.unit}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.hydrationSection}>
          <Text style={styles.sectionTitle}>Water Intake</Text>
          <View style={styles.macroCard}>
            <Text style={styles.macroTitle}>Hydration</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${getProgressPercentage(waterIntake.current, waterIntake.target)}%`, backgroundColor: Colors.info }
                  ]} 
                />
              </View>
              <Text style={styles.macroValue}>
                {waterIntake.current}/{waterIntake.target} {waterIntake.unit}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
  reminderCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.warning,
    marginBottom: Spacing.lg,
  },
  reminderText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[700],
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  macrosSection: {
    marginBottom: Spacing.lg,
  },
  hydrationSection: {
    marginBottom: Spacing.lg,
  },
  macroCard: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: Spacing.sm,
  },
  macroTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    gap: Spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  macroValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    fontWeight: '500',
  },
});