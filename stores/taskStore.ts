import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  priority: number | null;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  clearTasks: () => set({ tasks: [] }),
}));

export default null; // or export default {} if you prefer
