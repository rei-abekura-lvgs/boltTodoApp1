export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  assignee: string;
  dueDate: Date | null;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type SortOption = 'priority' | 'dueDate' | 'createdAt';