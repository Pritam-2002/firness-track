import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

interface MetricBlockProps {
  label: string;
  value: string;
  unit?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function MetricBlock({ 
  label, 
  value, 
  unit, 
  size = 'medium' 
}: MetricBlockProps) {
  return (
    <View style={[styles.container, styles[size]]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, styles[`${size}Value`]]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    padding: Spacing.sm,
    minWidth: 80,
  },
  medium: {
    padding: Spacing.md,
    minWidth: 100,
  },
  large: {
    padding: Spacing.lg,
    minWidth: 120,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  smallValue: {
    fontSize: Typography.fontSize.lg,
  },
  mediumValue: {
    fontSize: Typography.fontSize.xl,
  },
  largeValue: {
    fontSize: Typography.fontSize['2xl'],
  },
  unit: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    marginLeft: 2,
  },
});