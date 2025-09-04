import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, UserProfile, FitnessGoals, WorkoutData, WorkoutTemplate, ScheduledWorkout, WorkoutSession } from '../types';

interface AppContextType {
  state: AppState;
  updateUserProfile: (profile: UserProfile) => void;
  updateFitnessGoals: (goals: FitnessGoals) => void;
  addWorkout: (workout: WorkoutData) => void;
  createWorkoutTemplate: (template: WorkoutTemplate) => void;
  scheduleWorkout: (scheduledWorkout: ScheduledWorkout) => void;
  cancelScheduledWorkout: (workoutId: string) => void;
  rescheduleWorkout: (workoutId: string, newDate: string, newTime: string) => void;
  startWorkoutSession: (session: WorkoutSession) => void;
  updateWorkoutSession: (session: WorkoutSession) => void;
  completeWorkoutSession: (session: WorkoutSession) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'UPDATE_USER_PROFILE'; payload: UserProfile }
  | { type: 'UPDATE_FITNESS_GOALS'; payload: FitnessGoals }
  | { type: 'ADD_WORKOUT'; payload: WorkoutData }
  | { type: 'CREATE_WORKOUT_TEMPLATE'; payload: WorkoutTemplate }
  | { type: 'SCHEDULE_WORKOUT'; payload: ScheduledWorkout }
  | { type: 'CANCEL_SCHEDULED_WORKOUT'; payload: string }
  | { type: 'RESCHEDULE_WORKOUT'; payload: { workoutId: string; newDate: string; newTime: string } }
  | { type: 'START_WORKOUT_SESSION'; payload: WorkoutSession }
  | { type: 'UPDATE_WORKOUT_SESSION'; payload: WorkoutSession }
  | { type: 'COMPLETE_WORKOUT_SESSION'; payload: WorkoutSession }
  | { type: 'SET_LOADING'; payload: boolean };
const initialState: AppState = {
  userProfile: null,
  fitnessGoals: null,
  workouts: [],
  workoutTemplates: [
    {
      id: '1',
      name: 'Upper Body Strength',
      exercises: [
        { id: '1', name: 'Push-ups', sets: 3, reps: 12, estimatedCalories: 50 },
        { id: '2', name: 'Pull-ups', sets: 3, reps: 8, estimatedCalories: 60 },
        { id: '3', name: 'Bench Press', sets: 3, reps: 10, weight: 80, estimatedCalories: 70 }
      ],
      estimatedDuration: 45,
      estimatedCalories: 180,
      category: 'strength',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Cardio Blast',
      exercises: [
        { id: '4', name: 'Burpees', sets: 4, reps: 15, estimatedCalories: 80 },
        { id: '5', name: 'Mountain Climbers', sets: 3, reps: 20, estimatedCalories: 60 },
        { id: '6', name: 'Jump Squats', sets: 3, reps: 15, estimatedCalories: 70 }
      ],
      estimatedDuration: 30,
      estimatedCalories: 210,
      category: 'cardio',
      createdAt: new Date().toISOString()
    }
  ],
  scheduledWorkouts: [
    {
      id: '1',
      templateId: '1',
      template: {
        id: '1',
        name: 'Upper Body Strength',
        exercises: [
          { id: '1', name: 'Push-ups', sets: 3, reps: 12, estimatedCalories: 50 },
          { id: '2', name: 'Pull-ups', sets: 3, reps: 8, estimatedCalories: 60 }
        ],
        estimatedDuration: 45,
        estimatedCalories: 180,
        category: 'strength',
        createdAt: new Date().toISOString()
      },
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '18:30',
      status: 'scheduled'
    }
  ],
  workoutSessions: [
    {
      id: '1',
      templateId: '1',
      templateName: 'Full Body Circuit',
      startTime: new Date(Date.now() - 86400000).toISOString(),
      duration: 40,
      exercises: [
        { id: '1', name: 'Squats', sets: 3, reps: 15, completed: true, estimatedCalories: 60 }
      ],
      totalCalories: 320,
      completedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  currentWorkoutSession: null,
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'UPDATE_FITNESS_GOALS':
      return { ...state, fitnessGoals: action.payload };
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] };
    case 'CREATE_WORKOUT_TEMPLATE':
      return { ...state, workoutTemplates: [...state.workoutTemplates, action.payload] };
    case 'SCHEDULE_WORKOUT':
      return { ...state, scheduledWorkouts: [...state.scheduledWorkouts, action.payload] };
    case 'CANCEL_SCHEDULED_WORKOUT':
      return { 
        ...state, 
        scheduledWorkouts: state.scheduledWorkouts.filter(sw => sw.id !== action.payload) 
      };
    case 'RESCHEDULE_WORKOUT':
      return {
        ...state,
        scheduledWorkouts: state.scheduledWorkouts.map(sw =>
          sw.id === action.payload.workoutId
            ? { ...sw, scheduledDate: action.payload.newDate, scheduledTime: action.payload.newTime }
            : sw
        )
      };
    case 'START_WORKOUT_SESSION':
      return { ...state, currentWorkoutSession: action.payload };
    case 'UPDATE_WORKOUT_SESSION':
      return { ...state, currentWorkoutSession: action.payload };
    case 'COMPLETE_WORKOUT_SESSION':
      return { 
        ...state, 
        workoutSessions: [...state.workoutSessions, action.payload],
        currentWorkoutSession: null,
        scheduledWorkouts: state.scheduledWorkouts.map(sw => 
          sw.templateId === action.payload.templateId && 
          sw.scheduledDate === action.payload.completedAt.split('T')[0]
            ? { ...sw, status: 'completed' as const }
            : sw
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateUserProfile = (profile: UserProfile) => {
    dispatch({ type: 'UPDATE_USER_PROFILE', payload: profile });
  };

  const updateFitnessGoals = (goals: FitnessGoals) => {
    dispatch({ type: 'UPDATE_FITNESS_GOALS', payload: goals });
  };

  const addWorkout = (workout: WorkoutData) => {
    dispatch({ type: 'ADD_WORKOUT', payload: workout });
  };

  const createWorkoutTemplate = (template: WorkoutTemplate) => {
    dispatch({ type: 'CREATE_WORKOUT_TEMPLATE', payload: template });
  };

  const scheduleWorkout = (scheduledWorkout: ScheduledWorkout) => {
    dispatch({ type: 'SCHEDULE_WORKOUT', payload: scheduledWorkout });
  };

  const cancelScheduledWorkout = (workoutId: string) => {
    dispatch({ type: 'CANCEL_SCHEDULED_WORKOUT', payload: workoutId });
  };

  const rescheduleWorkout = (workoutId: string, newDate: string, newTime: string) => {
    dispatch({ type: 'RESCHEDULE_WORKOUT', payload: { workoutId, newDate, newTime } });
  };

  const startWorkoutSession = (session: WorkoutSession) => {
    dispatch({ type: 'START_WORKOUT_SESSION', payload: session });
  };

  const updateWorkoutSession = (session: WorkoutSession) => {
    dispatch({ type: 'UPDATE_WORKOUT_SESSION', payload: session });
  };

  const completeWorkoutSession = (session: WorkoutSession) => {
    dispatch({ type: 'COMPLETE_WORKOUT_SESSION', payload: session });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <AppContext.Provider value={{
      state,
      updateUserProfile,
      updateFitnessGoals,
      addWorkout,
      createWorkoutTemplate,
      scheduleWorkout,
      cancelScheduledWorkout,
      rescheduleWorkout,
      startWorkoutSession,
      updateWorkoutSession,
      completeWorkoutSession,
      setLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}