import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNavigation from '../../components/TopNavigation';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { useAppContext } from '../../context/AppContext';
import RunModeSelector, { RunMode } from '../../components/run/RunModeSelector';
import FreeRunMode from '../../components/run/FreeRunMode';
import WorkoutMode from '../../components/run/WorkoutMode';
import PartnerSyncMode from '../../components/run/PartnerSyncMode';
import FormCoachingMode from '../../components/run/FormCoachingMode';

export default function RunScreen() {
  const { state } = useAppContext();
  const insets = useSafeAreaInsets();
  const [selectedMode, setSelectedMode] = useState<RunMode>('free');

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleNotificationsPress = () => {
    console.log('Notifications pressed');
  };

  const handleRunComplete = (data: any) => {
    console.log('Run completed:', data);
    // Here you would update the context/state with completed run data
  };

  const renderModeContent = () => {
    switch (selectedMode) {
      case 'free':
        return <FreeRunMode onRunComplete={handleRunComplete} />;
      case 'workout':
        return <WorkoutMode onRunComplete={handleRunComplete} />;
      case 'partner':
        return <PartnerSyncMode onRunComplete={handleRunComplete} />;
      case 'form':
        return <FormCoachingMode onRunComplete={handleRunComplete} />;
      default:
        return <FreeRunMode onRunComplete={handleRunComplete} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopNavigation 
        onProfilePress={handleProfilePress}
        onNotificationsPress={handleNotificationsPress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Run</Text>
        
        <View style={styles.todaysPlan}>
          <Text style={styles.planLabel}>Today's Plan</Text>
          <Text style={styles.planText}>5 miles – Tempo Run</Text>
        </View>

        <RunModeSelector 
          selectedMode={selectedMode}
          onModeChange={setSelectedMode}
        />

        <View style={styles.modeContent}>
          {renderModeContent()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: Spacing.lg,
  },
  todaysPlan: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
  },
  planLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  planText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  modeContent: {
    flex: 1,
    minHeight: 400,
  },
});