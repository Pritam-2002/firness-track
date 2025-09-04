import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type DateRange = 'today' | 'yesterday' | 'last7' | 'last15' | 'last30';

export default function NutritionDetailsScreen() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('today');

  const dateRanges = [
    { key: 'today' as DateRange, label: 'Today' },
    { key: 'yesterday' as DateRange, label: 'Yesterday' },
    { key: 'last7' as DateRange, label: 'Last 7 Days' },
    { key: 'last15' as DateRange, label: 'Last 15 Days' },
    { key: 'last30' as DateRange, label: 'Last 30 Days' },
  ];

  const mockData = {
    today: { calories: 1847, protein: 92, carbs: 234, fat: 67, water: 1.8 },
    yesterday: { calories: 2156, protein: 105, carbs: 267, fat: 78, water: 2.1 },
    last7: { calories: 1923, protein: 98, carbs: 245, fat: 71, water: 1.9 },
    last15: { calories: 1876, protein: 94, carbs: 238, fat: 69, water: 1.8 },
    last30: { calories: 1901, protein: 96, carbs: 241, fat: 70, water: 1.9 },
  };

  const data = mockData[selectedRange];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.title}>Nutrition Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Range Selector */}
        <View style={styles.rangeSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dateRanges.map((range) => (
              <TouchableOpacity
                key={range.key}
                style={[
                  styles.rangeButton,
                  selectedRange === range.key && styles.activeRange
                ]}
                onPress={() => setSelectedRange(range.key)}
              >
                <Text style={[
                  styles.rangeText,
                  selectedRange === range.key && styles.activeRangeText
                ]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Ionicons name="flame" size={24} color="#FF6B35" />
            <Text style={styles.summaryValue}>{data.calories}</Text>
            <Text style={styles.summaryLabel}>Avg Calories</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Ionicons name="water" size={24} color={Colors.primary} />
            <Text style={styles.summaryValue}>{data.water}L</Text>
            <Text style={styles.summaryLabel}>Avg Water</Text>
          </View>
        </View>

        {/* Detailed Macros */}
        <View style={styles.macrosCard}>
          <Text style={styles.cardTitle}>Macronutrient Breakdown</Text>
          
          <View style={styles.macroDetail}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>Protein</Text>
              <Text style={styles.macroValue}>{data.protein}g</Text>
            </View>
            <View style={styles.macroBar}>
              <View style={[styles.macroFill, styles.proteinFill, { width: '65%' }]} />
            </View>
            <Text style={styles.macroPercentage}>65% of goal (140g)</Text>
          </View>

          <View style={styles.macroDetail}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>Carbohydrates</Text>
              <Text style={styles.macroValue}>{data.carbs}g</Text>
            </View>
            <View style={styles.macroBar}>
              <View style={[styles.macroFill, styles.carbsFill, { width: '78%' }]} />
            </View>
            <Text style={styles.macroPercentage}>78% of goal (300g)</Text>
          </View>

          <View style={styles.macroDetail}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>Fat</Text>
              <Text style={styles.macroValue}>{data.fat}g</Text>
            </View>
            <View style={styles.macroBar}>
              <View style={[styles.macroFill, styles.fatFill, { width: '52%' }]} />
            </View>
            <Text style={styles.macroPercentage}>52% of goal (130g)</Text>
          </View>
        </View>

        {/* Trends */}
        <View style={styles.trendsCard}>
          <Text style={styles.cardTitle}>Trends & Insights</Text>
          
          <View style={styles.trendItem}>
            <Ionicons name="trending-up" size={20} color="#059669" />
            <View style={styles.trendContent}>
              <Text style={styles.trendTitle}>Protein intake improving</Text>
              <Text style={styles.trendSubtitle}>+12g compared to last period</Text>
            </View>
          </View>

          <View style={styles.trendItem}>
            <Ionicons name="trending-down" size={20} color="#DC2626" />
            <View style={styles.trendContent}>
              <Text style={styles.trendTitle}>Hydration needs attention</Text>
              <Text style={styles.trendSubtitle}>-0.3L below recommended intake</Text>
            </View>
          </View>

          <View style={styles.trendItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
            <View style={styles.trendContent}>
              <Text style={styles.trendTitle}>Calorie goals on track</Text>
              <Text style={styles.trendSubtitle}>Within 5% of daily target</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: Typography.fontSize.xl,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  rangeSelector: {
    marginBottom: Spacing.lg,
  },
  rangeButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    ...Shadows.sm,
  },
  activeRange: {
    backgroundColor: Colors.primary,
  },
  rangeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[600],
  },
  activeRangeText: {
    color: Colors.white,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  summaryValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginTop: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
  macrosCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.lg,
  },
  macroDetail: {
    marginBottom: Spacing.lg,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  macroName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[900],
  },
  macroValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.primary,
  },
  macroBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  macroFill: {
    height: '100%',
  },
  proteinFill: {
    backgroundColor: '#EF4444',
  },
  carbsFill: {
    backgroundColor: '#F59E0B',
  },
  fatFill: {
    backgroundColor: Colors.primary,
  },
  macroPercentage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  trendsCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  trendContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  trendTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[900],
  },
  trendSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
});