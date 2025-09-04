import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  isActive: boolean;
}

export default function ChallengesTab() {
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Run 40 miles this week',
      description: 'Complete your weekly mileage goal',
      progress: 23,
      total: 40,
      isActive: true,
    },
    {
      id: '2',
      title: 'Complete 3 tempo runs',
      description: 'Build your lactate threshold',
      progress: 1,
      total: 3,
      isActive: true,
    },
    {
      id: '3',
      title: 'Join a local 5K race',
      description: 'Test your fitness in competition',
      progress: 0,
      total: 1,
      isActive: false,
    },
  ];

  const renderChallenge = (challenge: Challenge) => (
    <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeProgress}>
          {challenge.progress}/{challenge.total}
        </Text>
      </View>
      <Text style={styles.challengeDescription}>{challenge.description}</Text>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(challenge.progress / challenge.total) * 100}%` }
          ]} 
        />
      </View>
      
      {!challenge.isActive && (
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Challenge</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {challenges.map(renderChallenge)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  challengeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    ...Shadows.sm,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  challengeTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[900],
    flex: 1,
  },
  challengeProgress: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.gray[200],
    borderRadius: 2,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
});