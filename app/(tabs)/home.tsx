import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.subtitle}>You're on a 5-day streak 🔥</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color={Colors.accent} />
          <Text style={styles.statNumber}>1,847</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="water" size={24} color={Colors.primary} />
          <Text style={styles.statNumber}>6/8</Text>
          <Text style={styles.statLabel}>Glasses</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="fitness" size={24} color={Colors.secondary} />
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>

      {/* Today's Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="restaurant" size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Nutrition</Text>
          </View>
          <Text style={styles.cardSubtitle}>2 meals logged • 3 remaining</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="barbell" size={20} color={Colors.secondary} />
            <Text style={styles.cardTitle}>Workout</Text>
          </View>
          <Text style={styles.cardSubtitle}>Upper body • 6:30 PM scheduled</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="walk" size={20} color={Colors.accent} />
            <Text style={styles.cardTitle}>Activity</Text>
          </View>
          <Text style={styles.cardSubtitle}>Morning run completed ✓</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    marginTop: Spacing.xs,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginLeft: Spacing.sm,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
});