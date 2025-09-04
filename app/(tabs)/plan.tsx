import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TopNavigation from '../../components/TopNavigation';
import WeeklyPlanTab from '../../components/plan/WeeklyPlanTab';
import AdaptPlanTab from '../../components/plan/AdaptPlanTab';
import ChallengesTab from '../../components/plan/ChallengesTab';
import WorkoutModal from '../../components/plan/WorkoutModal';
import CompletionModal from '../../components/plan/CompletionModal';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { Workout } from '../../components/plan/WeeklyPlanTab';

type TabType = 'weekly' | 'adapt' | 'challenges';

export default function PlanScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('weekly');
  const [modalVisible, setModalVisible] = useState(false);
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleNotificationsPress = () => {
    console.log('Notifications pressed');
  };

  const handleWorkoutPress = (day: string, workout?: Workout) => {
    setSelectedDay(day);
    setSelectedWorkout(workout);
    if (workout && !workout.completed && !workout.missed) {
      setCompletionModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleWorkoutSave = (workout: Workout) => {
    console.log('Saving workout:', workout);
    // Here you would update the workout in your state/context
  };

  const handleMarkComplete = () => {
    console.log('Marking workout as complete');
    setCompletionModalVisible(false);
  };

  const handleMarkMissed = () => {
    console.log('Marking workout as missed');
    setCompletionModalVisible(false);
  };
  const tabs = [
    { id: 'weekly', label: 'Weekly Plan' },
    { id: 'adapt', label: 'Adapt Plan' },
    { id: 'challenges', label: 'Challenges' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'weekly':
        return <WeeklyPlanTab onWorkoutPress={handleWorkoutPress} />;
      case 'adapt':
        return <AdaptPlanTab />;
      case 'challenges':
        return <ChallengesTab />;
      default:
        return <WeeklyPlanTab onWorkoutPress={handleWorkoutPress} />;
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigation 
        onProfilePress={handleProfilePress}
        onNotificationsPress={handleNotificationsPress}
      />
      
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id as TabType)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.label}
              </Text>
              {activeTab === tab.id && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>
      </View>

      <WorkoutModal
        visible={modalVisible}
        workout={selectedWorkout}
        day={selectedDay}
        onClose={() => setModalVisible(false)}
        onSave={handleWorkoutSave}
      />

      <CompletionModal
        visible={completionModalVisible}
        workout={selectedWorkout}
        day={selectedDay}
        onClose={() => setCompletionModalVisible(false)}
        onMarkComplete={handleMarkComplete}
        onMarkMissed={handleMarkMissed}
      />
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // No background color needed for segmented control
  },
  tabText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[500],
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.gray[900],
    fontWeight: 'bold',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
  tabContent: {
    flex: 1,
  },
});