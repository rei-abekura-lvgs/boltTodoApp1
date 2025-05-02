import React, { useState } from 'react';
import { ArrowDownAZ, Calendar, Clock, Search } from 'lucide-react';
import TodoItem from './TodoItem';
import { Todo, SortOption } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  categories: { id: string; name: string; color: string; }[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, description: string, category: string, assignee: string, dueDate: Date | null, priority: Todo['priority']) => void;
  onChangePriority: (id: string, priority: Todo['priority']) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  categories,
  onToggleComplete,
  onDelete,
  onEdit,
  onChangePriority,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTodos = (todos: Todo[]) => {
    if (!searchQuery.trim()) return todos;
    
    const query = searchQuery.toLowerCase();
    return todos.filter(todo => 
      todo.text.toLowerCase().includes(query) ||
      todo.description.toLowerCase().includes(query) ||
      todo.category.toLowerCase().includes(query) ||
      todo.assignee.toLowerCase().includes(query)
    );
  };

  const getSortedTodos = () => {
    const filteredTodos = filterTodos(todos);
    return [...filteredTodos].sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { high: 2, medium: 1, low: 0 };
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
        }
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * direction;
        }
        case 'createdAt':
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction;
        default:
          return 0;
      }
    });
  };

  const sortOptions = [
    { value: 'priority', label: '優先度', icon: ArrowDownAZ },
    { value: 'dueDate', label: '期限', icon: Calendar },
    { value: 'createdAt', label: '作成日', icon: Clock },
  ];

  return (
    <div>
      <div className="mb-4 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="タスク、詳細、カテゴリ、担当者で検索..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">並び替え:</span>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                if (sortBy === option.value) {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy(option.value as SortOption);
                  setSortDirection('desc');
                }
              }}
              className={`flex items-center rounded-lg px-3 py-1 text-sm ${
                sortBy === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <option.icon className="mr-1 h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {getSortedTodos().length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <p className="text-center text-gray-500">
            {searchQuery.trim() ? "検索条件に一致するタスクがありません。" : "タスクがありません。新しいタスクを追加してください。"}
          </p>
        </div>
      ) : (
        getSortedTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            categories={categories}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangePriority={onChangePriority}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;