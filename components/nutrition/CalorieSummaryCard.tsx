import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface CalorieSummaryCardProps {
  consumed: number;
  goal: number;
  remaining: number;
  protein: number;
  carbs: number;
  fat: number;
  onDetailPress: () => void;
}

export default function CalorieSummaryCard({
  consumed,
  goal,
  remaining,
  protein,
  carbs,
  fat,
  onDetailPress
}: CalorieSummaryCardProps) {
  const progress = (consumed / goal) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Summary</Text>
        <TouchableOpacity style={styles.detailButton} onPress={onDetailPress}>
          <Text style={styles.detailText}>Detailed</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.calorieSection}>
        <Text style={styles.consumedText}>{consumed}</Text>
        <Text style={styles.goalText}>of {goal} kcal</Text>
        <Text style={styles.remainingText}>{remaining} kcal left today</Text>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
      </View>

      <View style={styles.macrosSection}>
        <View style={styles.macroItem}>
          <View style={[styles.macroBar, styles.proteinBar]}>
            <View style={[styles.macroFill, { width: '65%' }]} />
          </View>
          <Text style={styles.macroValue}>{protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroBar, styles.carbsBar]}>
            <View style={[styles.macroFill, { width: '78%' }]} />
          </View>
          <Text style={styles.macroValue}>{carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroBar, styles.fatBar]}>
            <View style={[styles.macroFill, { width: '52%' }]} />
          </View>
          <Text style={styles.macroValue}>{fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: Spacing.xs,
  },
  calorieSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  consumedText: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: Colors.primary,
  },
  goalText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  remainingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[700],
    fontWeight: '500',
    marginBottom: Spacing.md,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  macrosSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  macroBar: {
    width: '100%',
    height: 4,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  proteinBar: {
    backgroundColor: '#FEE2E2',
  },
  carbsBar: {
    backgroundColor: '#FEF3C7',
  },
  fatBar: {
    backgroundColor: '#E0F2FE',
  },
  macroFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  macroValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  macroLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
});