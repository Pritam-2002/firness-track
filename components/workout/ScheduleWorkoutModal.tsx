import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutTemplate, ScheduledWorkout } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ScheduleWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ScheduleWorkoutModal({ visible, onClose }: ScheduleWorkoutModalProps) {
  const { state, scheduleWorkout } = useAppContext();
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('18:00');

  const handleSchedule = () => {
    if (!selectedTemplate) {
      Alert.alert('Error', 'Please select a workout template');
      return;
    }

    const scheduledWorkout: ScheduledWorkout = {
      id: Date.now().toString(),
      templateId: selectedTemplate.id,
      template: selectedTemplate,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      status: 'scheduled',
    };

    scheduleWorkout(scheduledWorkout);
    onClose();
    setSelectedTemplate(null);
  };

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
        dayName: date.toLocaleDateString('en', { weekday: 'long' })
      });
    }
    
    return days;
  };

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  const nextDays = getNextDays(7);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.title}>Schedule Workout</Text>
          <TouchableOpacity onPress={handleSchedule} style={styles.scheduleButton}>
            <Text style={styles.scheduleText}>Schedule</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Select Workout */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Workout</Text>
            {state.workoutTemplates.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="fitness-outline" size={48} color={Colors.gray[400]} />
                <Text style={styles.emptyText}>No workout templates available</Text>
                <Text style={styles.emptySubtext}>Create a workout first in the Builder tab</Text>
              </View>
            ) : (
              state.workoutTemplates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateCard,
                    selectedTemplate?.id === template.id && styles.selectedTemplate
                  ]}
                  onPress={() => setSelectedTemplate(template)}
                >
                  <View style={styles.templateHeader}>
                    <Text style={styles.templateName}>{template.name}</Text>
                    <View style={styles.templateBadge}>
                      <Text style={styles.templateCategory}>{template.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.templateDetails}>
                    {template.exercises.length} exercises • {template.estimatedDuration} min • {template.estimatedCalories} cal
                  </Text>
                  {selectedTemplate?.id === template.id && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Select Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {nextDays.map((day) => (
                <TouchableOpacity
                  key={day.date}
                  style={[
                    styles.dateCard,
                    selectedDate === day.date && styles.selectedDate
                  ]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text style={[
                    styles.dateLabel,
                    selectedDate === day.date && styles.selectedDateText
                  ]}>
                    {day.label}
                  </Text>
                  <Text style={[
                    styles.dayName,
                    selectedDate === day.date && styles.selectedDateText
                  ]}>
                    {day.dayName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Select Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTime
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
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
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  scheduleButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  scheduleText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[700],
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  templateCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.sm,
  },
  selectedTemplate: {
    borderColor: Colors.primary,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  templateName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  templateBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  templateCategory: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  templateDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  selectedIndicator: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  dateScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  dateCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.sm,
  },
  selectedDate: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  dateLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  dayName: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
  selectedDateText: {
    color: Colors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeSlot: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    minWidth: 70,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  selectedTimeText: {
    color: Colors.white,
  },
});