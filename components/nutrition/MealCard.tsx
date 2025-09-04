import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealCardProps {
  title: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  foods: FoodItem[];
  onAddFood: () => void;
}

export default function MealCard({
  title,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  foods,
  onAddFood
}: MealCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.summary}>
            {totalCalories} kcal • P: {totalProtein}g • C: {totalCarbs}g • F: {totalFat}g
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.addButton} onPress={onAddFood}>
            <Ionicons name="add" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <Ionicons 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={Colors.gray[600]} 
          />
        </View>
      </TouchableOpacity>

      {expanded && foods.length > 0 && (
        <View style={styles.foodList}>
          {foods.map((food) => (
            <View key={food.id} style={styles.foodItem}>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodQuantity}>{food.quantity}</Text>
              </View>
              <View style={styles.foodMacros}>
                <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                <Text style={styles.foodMacroText}>
                  P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {expanded && foods.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="restaurant-outline" size={32} color={Colors.gray[400]} />
          <Text style={styles.emptyText}>No foods logged yet</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={onAddFood}>
            <Text style={styles.emptyButtonText}>Add your first item</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.xs,
  },
  summary: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  addButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  foodList: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingTop: Spacing.sm,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.gray[900],
  },
  foodQuantity: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginTop: 2,
  },
  foodMacros: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  foodMacroText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  emptyText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  emptyButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.white,
  },
});