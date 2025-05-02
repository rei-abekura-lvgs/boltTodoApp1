import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, Category } from '../types/todo';

interface TodoContextProps {
  todos: Todo[];
  categories: Category[];
  addTodo: (
    text: string,
    description: string,
    priority: Todo['priority'],
    category: string,
    assignee: string,
    dueDate: Date | null
  ) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, description: string, category: string, assignee: string, dueDate: Date | null, priority: Todo['priority']) => void;
  changePriority: (id: string, priority: Todo['priority']) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

// テストデータ
const initialCategories: Category[] = [
  { id: '1', name: '仕事', color: '#3B82F6' },
  { id: '2', name: '個人', color: '#10B981' },
  { id: '3', name: '買い物', color: '#F59E0B' },
  { id: '4', name: '勉強', color: '#8B5CF6' }
];

const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'プロジェクト提案書の作成',
    description: 'クライアントミーティング用の提案書を作成する',
    completed: false,
    priority: 'high',
    category: '仕事',
    assignee: '山田太郎',
    dueDate: new Date('2025-05-01'),
    createdAt: new Date('2025-04-20')
  },
  {
    id: '2',
    text: 'JavaScriptの学習',
    description: 'React Hooksの使い方を理解する',
    completed: false,
    priority: 'medium',
    category: '勉強',
    assignee: '山田太郎',
    dueDate: new Date('2025-05-05'),
    createdAt: new Date('2025-04-21')
  },
  {
    id: '3',
    text: '週次ミーティング',
    description: 'チームの進捗確認と今後の計画について',
    completed: true,
    priority: 'medium',
    category: '仕事',
    assignee: '鈴木花子',
    dueDate: new Date('2025-04-25'),
    createdAt: new Date('2025-04-22')
  },
  {
    id: '4',
    text: '買い物リストの作成',
    description: '週末の買い出し用のリストを作成',
    completed: false,
    priority: 'low',
    category: '買い物',
    assignee: '佐藤次郎',
    dueDate: null,
    createdAt: new Date('2025-04-23')
  },
  {
    id: '5',
    text: 'ジムに行く',
    description: '有酸素運動30分、筋トレ30分',
    completed: false,
    priority: 'medium',
    category: '個人',
    assignee: '山田太郎',
    dueDate: new Date('2025-04-26'),
    createdAt: new Date('2025-04-24')
  },
  {
    id: '6',
    text: 'プレゼンテーション資料の作成',
    description: '新製品発表会用の資料を準備',
    completed: false,
    priority: 'high',
    category: '仕事',
    assignee: '田中美咲',
    dueDate: new Date('2025-05-10'),
    createdAt: new Date('2025-04-25')
  },
  {
    id: '7',
    text: '読書',
    description: '「エンジニアリングマネジメント」を読む',
    completed: false,
    priority: 'low',
    category: '勉強',
    assignee: '山田太郎',
    dueDate: null,
    createdAt: new Date('2025-04-26')
  },
  {
    id: '8',
    text: 'コードレビュー',
    description: 'チームメンバーのプルリクエストを確認',
    completed: false,
    priority: 'high',
    category: '仕事',
    assignee: '鈴木花子',
    dueDate: new Date('2025-04-28'),
    createdAt: new Date('2025-04-27')
  },
  {
    id: '9',
    text: '散歩',
    description: '近所の公園を1時間歩く',
    completed: true,
    priority: 'low',
    category: '個人',
    assignee: '山田太郎',
    dueDate: new Date('2025-04-27'),
    createdAt: new Date('2025-04-27')
  },
  {
    id: '10',
    text: 'オンライン英会話',
    description: 'ビジネス英語の練習',
    completed: false,
    priority: 'medium',
    category: '勉強',
    assignee: '佐藤次郎',
    dueDate: new Date('2025-04-29'),
    createdAt: new Date('2025-04-28')
  },
  {
    id: '11',
    text: 'デザインミーティング',
    description: 'UI/UXの改善案について討議',
    completed: false,
    priority: 'high',
    category: '仕事',
    assignee: '田中美咲',
    dueDate: new Date('2025-05-02'),
    createdAt: new Date('2025-04-28')
  },
  {
    id: '12',
    text: '食材の買い出し',
    description: '週末の料理用の材料を購入',
    completed: false,
    priority: 'medium',
    category: '買い物',
    assignee: '山田太郎',
    dueDate: new Date('2025-04-30'),
    createdAt: new Date('2025-04-28')
  },
  {
    id: '13',
    text: 'バグ修正',
    description: '本番環境で報告された不具合の対応',
    completed: false,
    priority: 'high',
    category: '仕事',
    assignee: '鈴木花子',
    dueDate: new Date('2025-04-29'),
    createdAt: new Date('2025-04-28')
  },
  {
    id: '14',
    text: 'ヨガ',
    description: 'オンラインヨガクラスに参加',
    completed: false,
    priority: 'low',
    category: '個人',
    assignee: '田中美咲',
    dueDate: new Date('2025-05-01'),
    createdAt: new Date('2025-04-28')
  },
  {
    id: '15',
    text: 'TypeScriptチュートリアル',
    description: 'ジェネリクスとユーティリティ型について学習',
    completed: false,
    priority: 'medium',
    category: '勉強',
    assignee: '山田太郎',
    dueDate: new Date('2025-05-05'),
    createdAt: new Date('2025-04-28')
  }
];

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null
        }));
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
        return initialTodos;
      }
    }
    return initialTodos;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      try {
        return JSON.parse(savedCategories);
      } catch (error) {
        console.error('Failed to parse categories from localStorage', error);
        return initialCategories;
      }
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = (
    text: string,
    description: string,
    priority: Todo['priority'],
    category: string,
    assignee: string,
    dueDate: Date | null
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      description,
      completed: false,
      priority,
      category,
      assignee,
      dueDate,
      createdAt: new Date()
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (
    id: string,
    text: string,
    description: string,
    category: string,
    assignee: string,
    dueDate: Date | null,
    priority: Todo['priority']
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text, description, category, assignee, dueDate, priority }
          : todo
      )
    );
  };

  const changePriority = (id: string, priority: Todo['priority']) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...category,
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    setTodos(
      todos.map((todo) => {
        const category = categories.find((c) => c.id === id);
        return todo.category === category?.name
          ? { ...todo, category: '' }
          : todo;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        addTodo,
        toggleComplete,
        deleteTodo,
        editTodo,
        changePriority,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export default TodoProvider;