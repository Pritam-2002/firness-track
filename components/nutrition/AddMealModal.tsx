import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
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

interface AddMealModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (category: string, foods: FoodItem[]) => void;
}

type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'other';

export default function AddMealModal({ visible, onClose, onSave }: AddMealModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('breakfast');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [currentFood, setCurrentFood] = useState({
    name: '',
    quantity: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const categories = [
    { key: 'breakfast' as MealCategory, label: 'Breakfast', icon: 'sunny' },
    { key: 'lunch' as MealCategory, label: 'Lunch', icon: 'partly-sunny' },
    { key: 'dinner' as MealCategory, label: 'Dinner', icon: 'moon' },
    { key: 'snacks' as MealCategory, label: 'Snacks', icon: 'fast-food' },
    { key: 'other' as MealCategory, label: 'Other', icon: 'restaurant' },
  ];

  const resetModal = () => {
    setStep(1);
    setSelectedCategory('breakfast');
    setFoods([]);
    setCurrentFood({ name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const addFood = () => {
    if (!currentFood.name || !currentFood.calories) {
      Alert.alert('Error', 'Please enter food name and calories');
      return;
    }

    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: currentFood.name,
      quantity: currentFood.quantity || '1 serving',
      calories: parseInt(currentFood.calories) || 0,
      protein: parseInt(currentFood.protein) || 0,
      carbs: parseInt(currentFood.carbs) || 0,
      fat: parseInt(currentFood.fat) || 0,
    };

    setFoods([...foods, newFood]);
    setCurrentFood({ name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const saveMeal = () => {
    if (foods.length === 0) {
      Alert.alert('Error', 'Please add at least one food item');
      return;
    }
    onSave(selectedCategory, foods);
    handleClose();
  };

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = foods.reduce((sum, food) => sum + food.fat, 0);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color={Colors.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Meal</Text>
          <View style={styles.placeholder} />
        </View>

        {step === 1 && (
          <ScrollView style={styles.content}>
            <Text style={styles.stepTitle}>Select Category</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={24} 
                  color={selectedCategory === category.key ? Colors.white : Colors.gray[600]} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.selectedCategoryText
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.nextButton} onPress={() => setStep(2)}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {step === 2 && (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "10%" }}>
            <Text style={styles.stepTitle}>Add Food Items</Text>
            
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Food name"
                value={currentFood.name}
                onChangeText={(text) => setCurrentFood({...currentFood, name: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity (e.g., 1 cup, 100g)"
                value={currentFood.quantity}
                onChangeText={(text) => setCurrentFood({...currentFood, quantity: text})}
              />
              <View style={styles.macroRow}>
                <TextInput
                  style={[styles.input, styles.macroInput]}
                  placeholder="Calories"
                  keyboardType="numeric"
                  value={currentFood.calories}
                  onChangeText={(text) => setCurrentFood({...currentFood, calories: text})}
                />
                <TextInput
                  style={[styles.input, styles.macroInput]}
                  placeholder="Protein (g)"
                  keyboardType="numeric"
                  value={currentFood.protein}
                  onChangeText={(text) => setCurrentFood({...currentFood, protein: text})}
                />
              </View>
              <View style={styles.macroRow}>
                <TextInput
                  style={[styles.input, styles.macroInput]}
                  placeholder="Carbs (g)"
                  keyboardType="numeric"
                  value={currentFood.carbs}
                  onChangeText={(text) => setCurrentFood({...currentFood, carbs: text})}
                />
                <TextInput
                  style={[styles.input, styles.macroInput]}
                  placeholder="Fat (g)"
                  keyboardType="numeric"
                  value={currentFood.fat}
                  onChangeText={(text) => setCurrentFood({...currentFood, fat: text})}
                />
              </View>
              
              <TouchableOpacity style={styles.addFoodButton} onPress={addFood}>
                <Ionicons name="add" size={20} color={Colors.white} />
                <Text style={styles.addFoodText}>Add Food</Text>
              </TouchableOpacity>
            </View>

            {foods.length > 0 && (
              <View style={styles.foodList}>
                <Text style={styles.foodListTitle}>Added Foods</Text>
                {foods.map((food) => (
                  <View key={food.id} style={styles.foodItem}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodMacros}>
                      {food.calories} kcal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                    </Text>
                  </View>
                ))}
                
                <View style={styles.totalSummary}>
                  <Text style={styles.totalText}>
                    Total: {totalCalories} kcal | P: {totalProtein}g | C: {totalCarbs}g | F: {totalFat}g
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.saveButton} onPress={saveMeal}>
                  <Text style={styles.saveButtonText}>Save Meal</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
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
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  stepTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[900],
    marginLeft: Spacing.md,
  },
  selectedCategoryText: {
    color: Colors.white,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  nextButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.white,
  },
  form: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.fontSize.base,
    marginBottom: Spacing.md,
  },
  macroRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  macroInput: {
    flex: 1,
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  addFoodText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  foodList: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  foodListTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: Spacing.md,
  },
  foodItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  foodName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500',
    color: Colors.gray[900],
  },
  foodMacros: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: Spacing.xs,
  },
  totalSummary: {
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  totalText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.gray[900],
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.white,
  },
});