import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/theme';

interface TopNavigationProps {
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
}

export default function TopNavigation({ 
  onProfilePress, 
  onNotificationsPress 
}: TopNavigationProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={onNotificationsPress}
      >
        <Ionicons 
          name="notifications-outline" 
          size={24} 
          color={Colors.gray[700]} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={onProfilePress}
      >
        <Ionicons 
          name="person-circle-outline" 
          size={24} 
          color={Colors.gray[700]} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    backgroundColor: Colors.white,
  },
  iconButton: {
    padding: Spacing.xs,
    borderRadius: 20,
  },
});