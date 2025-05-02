import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface TodoFormProps {
  onAdd: (
    text: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    category: string,
    assignee: string,
    dueDate: Date | null
  ) => void;
  categories: { id: string; name: string; color: string; }[];
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, categories }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('タスク名を入力してください');
      return;
    }
    
    onAdd(
      text,
      description,
      priority,
      category,
      assignee,
      dueDate ? new Date(dueDate) : null
    );
    
    toast.success('タスクを追加しました');
    setText('');
    setDescription('');
    setCategory('');
    setAssignee('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="タスクのタイトルを入力..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {!text.trim() && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500">*必須</span>
          )}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="タスクの詳細を入力..."
          className="h-24 rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">カテゴリを選択...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="担当者を入力..."
          className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="group flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
          <span>タスクを追加</span>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;