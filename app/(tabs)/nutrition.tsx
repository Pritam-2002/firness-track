import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CalorieSummaryCard from '../../components/nutrition/CalorieSummaryCard';
import MealCard from '../../components/nutrition/MealCard';
import HydrationTracker from '../../components/nutrition/HydrationTracker';
import AddMealModal from '../../components/nutrition/AddMealModal';
import AddWaterModal from '../../components/nutrition/AddWaterModal';
import AdminUserManagement from '../../components/nutrition/AdminUserManagement';
import { UserRole, User } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  id: string;
  category: string;
  title: string;
  foods: FoodItem[];
}

export default function NutritionScreen() {
  const { state, updateUserProfile } = useAppContext();
  
  // Get user role from context, default to 'client' if not set
  // const userRole: UserRole = state.userProfile?.role || 'client';
  const userRole: UserRole = 'admin'; // Change 'client' to 'admin'

  
  
  // Mock users data for admin functionality
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'client',
      profile: {
        id: '1',
        name: 'John Doe',
        age: 28,
        height: 175,
        weight: 70,
        fitnessLevel: 'intermediate',
        weeklyAvailability: 5,
        role: 'client',
        syncPreferences: {
          garmin: true,
          appleWatch: false,
          strava: true
        }
      },
      createdAt: '2024-01-15T10:00:00Z',
      lastActive: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'client',
      profile: {
        id: '2',
        name: 'Jane Smith',
        age: 32,
        height: 165,
        weight: 60,
        fitnessLevel: 'advanced',
        weeklyAvailability: 7,
        role: 'client',
        syncPreferences: {
          garmin: false,
          appleWatch: true,
          strava: false
        }
      },
      createdAt: '2024-01-10T09:00:00Z',
      lastActive: '2024-01-20T12:15:00Z'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'client',
      profile: {
        id: '3',
        name: 'Mike Johnson',
        age: 25,
        height: 180,
        weight: 75,
        fitnessLevel: 'beginner',
        weeklyAvailability: 3,
        role: 'client',
        syncPreferences: {
          garmin: true,
          appleWatch: true,
          strava: true
        }
      },
      createdAt: '2024-01-18T14:00:00Z',
      lastActive: '2024-01-19T18:45:00Z'
    }
  ];
  
  const users = userRole === 'admin' ? mockUsers : [];
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      category: 'breakfast',
      title: 'Breakfast',
      foods: [
        { id: '1', name: 'Oatmeal with berries', quantity: '1 bowl', calories: 320, protein: 12, carbs: 58, fat: 6 },
        { id: '2', name: 'Greek yogurt', quantity: '150g', calories: 130, protein: 15, carbs: 8, fat: 4 }
      ]
    }
  ]);
  
  const [hydration, setHydration] = useState({ current: 1.8, goal: 2.5, streak: 5 });
  const [showMealModal, setShowMealModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  
  // Admin state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Calculate totals
  const totals = meals.reduce((acc, meal) => {
    const mealTotals = meal.foods.reduce((mealAcc, food) => ({
      calories: mealAcc.calories + food.calories,
      protein: mealAcc.protein + food.protein,
      carbs: mealAcc.carbs + food.carbs,
      fat: mealAcc.fat + food.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    return {
      calories: acc.calories + mealTotals.calories,
      protein: acc.protein + mealTotals.protein,
      carbs: acc.carbs + mealTotals.carbs,
      fat: acc.fat + mealTotals.fat,
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const calorieGoal = 2200;
  const remaining = calorieGoal - totals.calories;

  const handleAddMeal = (category: string, foods: FoodItem[]) => {
    const categoryCount = meals.filter(m => m.category === category).length;
    const title = categoryCount > 0 ? `${category} #${categoryCount + 1}` : category;
    
    const newMeal: Meal = {
      id: Date.now().toString(),
      category,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      foods
    };
    
    setMeals([...meals, newMeal]);
  };

  const handleAddWater = (amount: number) => {
    const newCurrent = hydration.current + (amount / 1000); // Convert ml to L
    const newStreak = newCurrent >= hydration.goal ? hydration.streak + 1 : hydration.streak;
    setHydration({ ...hydration, current: newCurrent, streak: newStreak });
  };

  const handleQuickAddWater = (amount: number) => {
    handleAddWater(amount);
  };

  // Admin handlers
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleUserDeselect = () => {
    setSelectedUserId(null);
  };

  // Group meals by category
  const mealsByCategory = meals.reduce((acc, meal) => {
    if (!acc[meal.category]) acc[meal.category] = [];
    acc[meal.category].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  const categories = ['breakfast', 'lunch', 'dinner', 'snacks', 'other'];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "10%" }}>
        {/* Admin User Management Section */}
        {userRole === 'admin' && (
          <AdminUserManagement
            users={users}
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
            onUserDeselect={handleUserDeselect}
          />
        )}

        {/* Calorie Summary */}
        <CalorieSummaryCard
          consumed={totals.calories}
          goal={calorieGoal}
          remaining={remaining}
          protein={totals.protein}
          carbs={totals.carbs}
          fat={totals.fat}
          onDetailPress={() => router.push('/nutrition-details')}
        />

        {/* Meal Cards */}
        {categories.map((category) => {
          const categoryMeals = mealsByCategory[category] || [];
          if (categoryMeals.length === 0) {
            // Show empty meal card
            return (
              <MealCard
                key={category}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                totalCalories={0}
                totalProtein={0}
                totalCarbs={0}
                totalFat={0}
                foods={[]}
                onAddFood={() => setShowMealModal(true)}
              />
            );
          }
          
          return categoryMeals.map((meal) => {
            const mealTotals = meal.foods.reduce((acc, food) => ({
              calories: acc.calories + food.calories,
              protein: acc.protein + food.protein,
              carbs: acc.carbs + food.carbs,
              fat: acc.fat + food.fat,
            }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

            return (
              <MealCard
                key={meal.id}
                title={meal.title}
                totalCalories={mealTotals.calories}
                totalProtein={mealTotals.protein}
                totalCarbs={mealTotals.carbs}
                totalFat={mealTotals.fat}
                foods={meal.foods}
                onAddFood={() => setShowMealModal(true)}
              />
            );
          });
        })}

        {/* Hydration Tracker */}
        <HydrationTracker
          current={hydration.current}
          goal={hydration.goal}
          streak={hydration.streak}
          onQuickAdd={handleQuickAddWater}
          onAddWater={() => setShowWaterModal(true)}
        />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.floatingContainer}>
        {showFloatingMenu && (
          <View style={styles.floatingMenu}>
            <TouchableOpacity 
              style={styles.floatingMenuItem}
              onPress={() => {
                setShowMealModal(true);
                setShowFloatingMenu(false);
              }}
            >
              <Ionicons name="restaurant" size={20} color={Colors.white} />
              <Text style={styles.floatingMenuText}>Add Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.floatingMenuItem}
              onPress={() => {
                setShowWaterModal(true);
                setShowFloatingMenu(false);
              }}
            >
              <Ionicons name="water" size={20} color={Colors.white} />
              <Text style={styles.floatingMenuText}>Add Water</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => setShowFloatingMenu(!showFloatingMenu)}
        >
          <Ionicons 
            name={showFloatingMenu ? "close" : "add"} 
            size={24} 
            color={Colors.white} 
          />
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <AddMealModal
        visible={showMealModal}
        onClose={() => setShowMealModal(false)}
        onSave={handleAddMeal}
      />
      
      <AddWaterModal
        visible={showWaterModal}
        onClose={() => setShowWaterModal(false)}
        onSave={handleAddWater}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 150, // Increased bottom padding to prevent overlap with tab bar
  },
  floatingContainer: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.lg,
    alignItems: 'flex-end',
  },
  floatingMenu: {
    marginBottom: Spacing.md,
  },
  floatingMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    ...Shadows.lg,
  },
  floatingMenuText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
});