import React, { useState } from 'react';
import { Check, Trash2, Edit, ChevronUp, ChevronDown, ChevronRight, Calendar, User, Tag } from 'lucide-react';
import { Todo } from '../types/todo';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface TodoItemProps {
  todo: Todo;
  categories: { id: string; name: string; color: string; }[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, description: string, category: string, assignee: string, dueDate: Date | null, priority: Todo['priority']) => void;
  onChangePriority: (id: string, priority: Todo['priority']) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  categories,
  onToggleComplete,
  onDelete,
  onEdit,
  onChangePriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editAssignee, setEditAssignee] = useState(todo.assignee);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  );
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    if (!editText.trim()) {
      toast.error('タスク名を入力してください');
      return;
    }
    onEdit(
      todo.id,
      editText,
      editDescription,
      editCategory,
      editAssignee,
      editDueDate ? new Date(editDueDate) : null,
      editPriority
    );
    setIsEditing(false);
    toast.success('タスクを更新しました');
  };

  const priorityIcon = {
    low: <ChevronDown className="h-4 w-4 text-blue-400" />,
    medium: <ChevronRight className="h-4 w-4 text-yellow-500" />,
    high: <ChevronUp className="h-4 w-4 text-red-500" />,
  };

  const priorityColors = {
    low: 'bg-blue-50 border-blue-200',
    medium: 'bg-yellow-50 border-yellow-200',
    high: 'bg-red-50 border-red-200',
  };

  return (
    <>
      <div
        className={`group mb-3 rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
          priorityColors[todo.priority]
        } ${todo.completed ? 'opacity-70' : ''}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start space-x-3">
            <button
              onClick={() => onToggleComplete(todo.id)}
              className={`mt-1 h-6 w-6 flex-shrink-0 rounded-full border transition-colors ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {todo.completed && <Check className="h-5 w-5" />}
            </button>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      autoFocus
                    />
                    {!editText.trim() && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500">*必須</span>
                    )}
                  </div>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="タスクの詳細..."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="low">低</option>
                      <option value="medium">中</option>
                      <option value="high">高</option>
                    </select>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                      value={editAssignee}
                      onChange={(e) => setEditAssignee(e.target.value)}
                      placeholder="担当者..."
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleEdit}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setEditText(todo.text);
                        setEditDescription(todo.description);
                        setEditCategory(todo.category);
                        setEditAssignee(todo.assignee);
                        setEditDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
                        setEditPriority(todo.priority);
                        setIsEditing(false);
                      }}
                      className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3
                    className={`text-lg font-medium text-gray-800 ${
                      todo.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {todo.text}
                  </h3>
                  {todo.description && (
                    <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {todo.category && (
                      <span className="flex items-center text-xs text-gray-500">
                        <Tag className="mr-1 h-3 w-3" />
                        {todo.category}
                      </span>
                    )}
                    {todo.assignee && (
                      <span className="flex items-center text-xs text-gray-500">
                        <User className="mr-1 h-3 w-3" />
                        {todo.assignee}
                      </span>
                    )}
                    {todo.dueDate && (
                      <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(todo.dueDate).toLocaleDateString('ja-JP')}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="rounded p-1 text-gray-500 hover:bg-red-100 hover:text-red-700"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {!isEditing && (
              <div className="relative">
                <button
                  onClick={() => {
                    const priorities: Todo['priority'][] = ['low', 'medium', 'high'];
                    const currentIndex = priorities.indexOf(todo.priority);
                    const nextIndex = (currentIndex + 1) % priorities.length;
                    onChangePriority(todo.id, priorities[nextIndex]);
                  }}
                  className="flex items-center rounded p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Change priority"
                  title={`Priority: ${todo.priority}`}
                >
                  {priorityIcon[todo.priority]}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          作成日: {new Date(todo.createdAt).toLocaleDateString('ja-JP')}
        </div>
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => onDelete(todo.id)}
        title="タスクの削除"
        message={`「${todo.text}」を削除してもよろしいですか？この操作は取り消せません。`}
      />
    </>
  );
};

export default TodoItem;