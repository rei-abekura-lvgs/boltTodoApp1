import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CategoryManager from './components/CategoryManager';
import Footer from './components/Footer';
import { TodoProvider, useTodoContext } from './context/TodoContext';

const TodoApp: React.FC = () => {
  const {
    todos,
    categories,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    changePriority,
    addCategory,
    deleteCategory,
  } = useTodoContext();

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-6 text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              タスク管理
            </h2>
            <TodoForm onAdd={addTodo} categories={categories} />
            <TodoList
              todos={todos}
              categories={categories}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onChangePriority={changePriority}
            />
          </div>
          <div className="glass-card rounded-xl p-6">
            <CategoryManager
              categories={categories}
              onAddCategory={addCategory}
              onDeleteCategory={deleteCategory}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;