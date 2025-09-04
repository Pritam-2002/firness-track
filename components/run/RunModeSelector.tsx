import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

export type RunMode = 'free' | 'workout' | 'partner' | 'form';

interface RunModeSelectorProps {
  selectedMode: RunMode;
  onModeChange: (mode: RunMode) => void;
}

const modes = [
  { key: 'free' as RunMode, label: 'Free Run' },
  { key: 'workout' as RunMode, label: 'Workout' },
  { key: 'partner' as RunMode, label: 'Partner' },
  { key: 'form' as RunMode, label: 'Form' },
];

export default function RunModeSelector({ 
  selectedMode, 
  onModeChange 
}: RunModeSelectorProps) {
  return (
    <View style={styles.container}>
      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.key}
          style={[
            styles.tab,
            selectedMode === mode.key && styles.activeTab,
          ]}
          onPress={() => onModeChange(mode.key)}
        >
          <Text
            style={[
              styles.tabText,
              selectedMode === mode.key && styles.activeTabText,
            ]}
          >
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
    padding: 2,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[600],
  },
  activeTabText: {
    color: Colors.gray[900],
  },
});