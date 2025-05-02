import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Category } from '../types/todo';
import Modal from './Modal';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory({
        name: newCategoryName.trim(),
        color: newCategoryColor,
      });
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete.id);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">カテゴリ管理</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          カテゴリを追加
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="カテゴリ名"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
            className="w-12 h-9 rounded-lg border border-gray-300 p-1"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            追加
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center rounded-full px-3 py-1 text-sm"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <span style={{ color: category.color }}>{category.name}</span>
            <button
              onClick={() => handleDeleteClick(category)}
              className="ml-2 rounded-full p-1 hover:bg-gray-200"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="カテゴリの削除"
        message={`「${categoryToDelete?.name}」を削除してもよろしいですか？このカテゴリを使用しているタスクは、カテゴリなしになります。`}
      />
    </div>
  );
};

export default CategoryManager;