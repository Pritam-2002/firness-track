import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import CreateWorkoutModal from '../../components/workout/CreateWorkoutModal';
import ScheduleWorkoutModal from '../../components/workout/ScheduleWorkoutModal';
import ScheduledWorkoutCard from '../../components/workout/ScheduledWorkoutCard';
import WorkoutSession from '../../components/workout/WorkoutSession';
type WorkoutTab = 'today' | 'builder' | 'history';

export default function WorkoutScreen() {
  const [activeTab, setActiveTab] = useState<WorkoutTab>('today');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showWorkoutSession, setShowWorkoutSession] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  try {
    const { state, startWorkoutSession } = useAppContext();

    // Get today's scheduled workouts
    const todaysWorkouts = state.scheduledWorkouts.filter(
      sw => sw.scheduledDate === new Date().toISOString().split('T')[0]
    );

    const handleStartWorkout = (scheduledWorkout: any) => {
      const session = {
        id: Date.now().toString(),
        templateId: scheduledWorkout.templateId,
        templateName: scheduledWorkout.template.name,
        startTime: new Date().toISOString(),
        exercises: scheduledWorkout.template.exercises.map((ex: any) => ({
          ...ex,
          completed: false
        })),
        totalCalories: 0,
        duration: 0
      };
      setSelectedWorkout(session);
      setShowWorkoutSession(true);
    };

    const tabs = [
      { key: 'today' as const, label: 'Today', icon: 'today' },
      { key: 'builder' as const, label: 'Builder', icon: 'build' },
      { key: 'history' as const, label: 'History', icon: 'time' },
    ];

    const weeklyStats = {
      workouts: state.workoutSessions?.length || 0,
      minutes: state.workoutSessions?.reduce((total, session) => total + session.duration, 0) || 0,
      calories: state.workoutSessions?.reduce((total, session) => total + session.totalCalories, 0) || 0,
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Workout</Text>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={16} color={Colors.accent} />
            <Text style={styles.streakText}>5 day streak</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={activeTab === tab.key ? Colors.white : Colors.gray[600]}
              />
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'today' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Workouts</Text>
              
              {todaysWorkouts.length > 0 ? (
                todaysWorkouts.map((scheduledWorkout) => (
                  <ScheduledWorkoutCard
                    key={scheduledWorkout.id}
                    scheduledWorkout={scheduledWorkout}
                    onStart={() => handleStartWorkout(scheduledWorkout)}
                    onReschedule={() => setShowScheduleModal(true)}
                    onCancel={() => Alert.alert('Cancel', 'Cancel this workout?')}
                  />
                ))
              ) : (
                <View style={styles.card}>
                  <Text style={styles.cardText}>No workout scheduled for today</Text>
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setShowScheduleModal(true)}
                  >
                    <Text style={styles.buttonText}>Schedule Workout</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.sectionTitle}>Upcoming Workouts</Text>
              {state.scheduledWorkouts
                .filter(sw => sw.scheduledDate > new Date().toISOString().split('T')[0])
                .slice(0, 3)
                .map((scheduledWorkout) => (
                  <ScheduledWorkoutCard
                    key={scheduledWorkout.id}
                    scheduledWorkout={scheduledWorkout}
                    onStart={() => handleStartWorkout(scheduledWorkout)}
                    onReschedule={() => setShowScheduleModal(true)}
                    onCancel={() => Alert.alert('Cancel', 'Cancel this workout?')}
                  />
                ))}
              
              <TouchableOpacity 
                style={styles.scheduleButton}
                onPress={() => setShowScheduleModal(true)}
              >
                <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
                <Text style={styles.scheduleButtonText}>Schedule New Workout</Text>
              </TouchableOpacity>

              <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>This Week</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{weeklyStats.workouts}</Text>
                    <Text style={styles.statLabel}>Workouts</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{weeklyStats.minutes}</Text>
                    <Text style={styles.statLabel}>Minutes</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{weeklyStats.calories}</Text>
                    <Text style={styles.statLabel}>Calories</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'builder' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Workout Builder</Text>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => setShowCreateModal(true)}
              >
                <Ionicons name="add" size={20} color={Colors.white} />
                <Text style={styles.createButtonText}>Create New Workout</Text>
              </TouchableOpacity>
              
              <Text style={styles.templatesTitle}>
                Your Workouts ({state.workoutTemplates?.length || 0})
              </Text>
              {state.workoutTemplates?.map((template) => (
                <View key={template.id} style={styles.templateCard}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDetails}>
                    {template.exercises?.length || 0} exercises • {template.estimatedDuration} min
                  </Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'history' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Workout History</Text>
              <Text style={styles.historyStats}>
                {state.workoutSessions?.length || 0} workouts completed
              </Text>
              {state.workoutSessions?.map((session) => (
                <View key={session.id} style={styles.historyCard}>
                  <Text style={styles.historyName}>{session.templateName}</Text>
                  <Text style={styles.historyDetails}>
                    {session.duration} min • {session.totalCalories} cal
                  </Text>
                </View>
               ))}
            </View>
          )}
        </ScrollView>
        {showCreateModal && (
          <CreateWorkoutModal
            visible={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        )}

        {showScheduleModal && (
          <ScheduleWorkoutModal
            visible={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
          />
        )}

        {showWorkoutSession && selectedWorkout && (
          <WorkoutSession
            visible={showWorkoutSession}
            workout={selectedWorkout}
            onClose={() => {
              setShowWorkoutSession(false);
              setSelectedWorkout(null);
            }}
          />
        )}
      </View>
    );
  } catch (error) {
    console.error('Workout screen error:', error);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Workout</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: Spacing.lg, 
    paddingTop: Spacing.xl 
  },
  title: { 
    fontSize: Typography.fontSize['2xl'], 
    fontWeight: 'bold', 
    color: Colors.gray[900] 
  },
  streakBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.white, 
    paddingHorizontal: Spacing.sm, 
    paddingVertical: Spacing.xs, 
    borderRadius: BorderRadius.full, 
    ...Shadows.sm 
  },
  streakText: { 
    marginLeft: Spacing.xs, 
    fontSize: Typography.fontSize.sm, 
    fontWeight: '600', 
    color: Colors.gray[700] 
  },
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: Spacing.lg, 
    marginBottom: Spacing.md, 
    gap: Spacing.sm 
  },
  tab: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: Spacing.sm, 
    backgroundColor: Colors.white, 
    borderRadius: BorderRadius.lg, 
    ...Shadows.sm 
  },
  activeTab: { backgroundColor: Colors.primary },
  tabText: { 
    marginLeft: Spacing.xs, 
    fontSize: Typography.fontSize.sm, 
    fontWeight: '600', 
    color: Colors.gray[600] 
  },
  activeTabText: { color: Colors.white },
  content: { flex: 1, paddingHorizontal: Spacing.lg },
  section: { paddingBottom: Spacing.xl },
  sectionTitle: { 
    fontSize: Typography.fontSize.lg, 
    fontWeight: '600', 
    color: Colors.gray[900], 
    marginBottom: Spacing.md 
  },
  card: { 
    backgroundColor: Colors.white, 
    padding: Spacing.md, 
    borderRadius: BorderRadius.lg, 
    marginBottom: Spacing.md, 
    ...Shadows.sm 
  },
  cardText: { 
    fontSize: Typography.fontSize.base, 
    color: Colors.gray[600], 
    marginBottom: Spacing.md 
  },
  button: { 
    backgroundColor: Colors.primary, 
    paddingVertical: Spacing.sm, 
    borderRadius: BorderRadius.lg, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: Colors.white, 
    fontSize: Typography.fontSize.base, 
    fontWeight: '600' 
  },
  statsCard: { 
    backgroundColor: Colors.white, 
    padding: Spacing.md, 
    borderRadius: BorderRadius.lg, 
    ...Shadows.sm 
  },
  statsTitle: { 
    fontSize: Typography.fontSize.lg, 
    fontWeight: '600', 
    color: Colors.gray[900], 
    marginBottom: Spacing.md 
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { 
    fontSize: Typography.fontSize.xl, 
    fontWeight: 'bold', 
    color: Colors.primary 
  },
  statLabel: { 
    fontSize: Typography.fontSize.sm, 
    color: Colors.gray[600], 
    marginTop: Spacing.xs 
  },
  createButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.primary, 
    paddingVertical: Spacing.md, 
    borderRadius: BorderRadius.lg, 
    marginBottom: Spacing.lg, 
    gap: Spacing.sm 
  },
  createButtonText: { 
    color: Colors.white, 
    fontSize: Typography.fontSize.base, 
    fontWeight: '600' 
  },
  templatesTitle: { 
    fontSize: Typography.fontSize.base, 
    fontWeight: '600', 
    color: Colors.gray[700], 
    marginBottom: Spacing.md 
  },
  templateCard: { 
    backgroundColor: Colors.white, 
    padding: Spacing.md, 
    borderRadius: BorderRadius.lg, 
    marginBottom: Spacing.sm, 
    ...Shadows.sm 
  },
  templateName: { 
    fontSize: Typography.fontSize.base, 
    fontWeight: '600', 
    color: Colors.gray[900], 
    marginBottom: Spacing.xs 
  },
  templateDetails: { 
    fontSize: Typography.fontSize.sm, 
    color: Colors.gray[600] 
  },
  historyStats: { 
    fontSize: Typography.fontSize.base, 
    color: Colors.primary, 
    fontWeight: '600', 
    marginBottom: Spacing.lg, 
    textAlign: 'center' 
  },
  historyCard: { 
    backgroundColor: Colors.white, 
    padding: Spacing.md, 
    borderRadius: BorderRadius.lg, 
    marginBottom: Spacing.sm, 
    ...Shadows.sm 
  },
  historyName: { 
    fontSize: Typography.fontSize.base, 
    fontWeight: '600', 
    color: Colors.gray[900], 
    marginBottom: Spacing.xs 
  },
  historyDetails: { 
    fontSize: Typography.fontSize.sm, 
    color: Colors.gray[600] 
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Spacing.lg 
  },
  errorText: { 
    fontSize: Typography.fontSize.base, 
    color: Colors.gray[600], 
    textAlign: 'center' 
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  scheduleButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
});