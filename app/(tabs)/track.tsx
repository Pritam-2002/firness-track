import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNavigation from '../../components/TopNavigation';
import { Colors, Typography, Spacing } from '../../constants/theme';
import PerformanceTab from '../../components/track/PerformanceTab';
import BiomechanicsTab from '../../components/track/BiomechanicsTab';
import NutritionTab from '../../components/track/NutritionTab';
import SleepRecoveryTab from '../../components/track/SleepRecoveryTab';
import QuickAddTab from '../../components/track/QuickAddTab';

const tabs = [
  { id: 'performance', title: 'Performance', icon: 'analytics' as const },
  { id: 'biomechanics', title: 'Biomechanics', icon: 'body' as const },
  { id: 'nutrition', title: 'Nutrition', icon: 'restaurant' as const },
  { id: 'sleep', title: 'Sleep & Recovery', icon: 'moon' as const },
  { id: 'quickadd', title: 'Quick Add', icon: 'add-circle' as const },
];

const getTabIcon = (tabId: string): keyof typeof Ionicons.glyphMap => {
  const tab = tabs.find(t => t.id === tabId);
  return tab?.icon || 'analytics';
};

export default function TrackScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('performance');

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleNotificationsPress = () => {
    console.log('Notifications pressed');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return <PerformanceTab />;
      case 'biomechanics':
        return <BiomechanicsTab />;
      case 'nutrition':
        return <NutritionTab />;
      case 'sleep':
        return <SleepRecoveryTab />;
      case 'quickadd':
        return <QuickAddTab />;
      default:
        return <PerformanceTab />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopNavigation 
        onProfilePress={handleProfilePress}
        onNotificationsPress={handleNotificationsPress}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Track</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={getTabIcon(tab.id)} 
              size={24} 
              color={activeTab === tab.id ? Colors.primary : Colors.gray[600]} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    marginHorizontal: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    minHeight: 44,
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginVertical: 2,
    marginHorizontal: 1,
  },

  content: {
    flex: 1,
  },
});