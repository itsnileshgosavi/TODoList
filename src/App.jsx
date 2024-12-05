import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import Navigation from './components/Navigation';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add-task" element={<TaskForm />} />
              <Route path="/edit-task/:id" element={<TaskForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;