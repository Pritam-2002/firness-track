// Global type definitions for RunCoach AI

export type UserRole = 'client' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  weeklyAvailability: number; // hours per week
  role: UserRole;
  syncPreferences: {
    garmin: boolean;
    appleWatch: boolean;
    strava: boolean;
  };
}

// User interface for admin management
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: string;
  lastActive: string;
}

export interface FitnessGoals {
  primaryGoal: 'marathon' | 'weightLoss' | 'speedImprovement' | 'general';
  targetMetrics: {
    pace?: string; // e.g., "5:30/km"
    weight?: number;
    vo2Max?: number;
  };
  weeklyGoals: {
    distance: number;
    workouts: number;
  };
  longTermGoals: {
    targetDate?: string;
    targetEvent?: string;
  };
}

// Exercise definition for workout creation
export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  restTime?: number; // seconds
  rounds?: number;
  estimatedCalories?: number;
  completed?: boolean;
  actualSets?: number;
  actualReps?: number;
  actualWeight?: number;
}

// Workout template for creation/scheduling
export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: Exercise[];
  estimatedDuration: number; // minutes
  estimatedCalories: number;
  category: 'strength' | 'cardio' | 'flexibility' | 'mixed';
  createdAt: string;
}

// Scheduled workout instance
export interface ScheduledWorkout {
  id: string;
  templateId: string;
  template: WorkoutTemplate;
  scheduledDate: string;
  scheduledTime?: string;
  status: 'scheduled' | 'completed' | 'skipped' | 'in-progress';
}

// Completed workout session
export interface WorkoutSession {
  id: string;
  templateId: string;
  templateName: string;
  startTime: string;
  endTime?: string;
  duration: number; // actual minutes
  exercises: Exercise[]; // with completed data
  totalCalories: number;
  notes?: string;
  completedAt: string;
}

export interface WorkoutData {
  id: string;
  date: string;
  type: 'run' | 'strength' | 'recovery';
  duration: number; // minutes
  distance?: number; // km
  pace?: string;
  heartRate?: number;
  calories?: number;
}

export interface AppState {
  userProfile: UserProfile | null;
  fitnessGoals: FitnessGoals | null;
  workouts: WorkoutData[];
  workoutTemplates: WorkoutTemplate[];
  scheduledWorkouts: ScheduledWorkout[];
  workoutSessions: WorkoutSession[];
  currentWorkoutSession: WorkoutSession | null;
  isLoading: boolean;
}