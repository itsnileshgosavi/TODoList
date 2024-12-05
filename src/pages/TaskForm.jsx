import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find(task => task.id === id);
      if (taskToEdit) {
        setFormData(taskToEdit);
      }
    }
  }, [id, tasks]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    const today = new Date();
    const selectedDate = new Date(formData.dueDate);
    if (selectedDate < today) newErrors.dueDate = 'Due date cannot be in the past';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        updateTask(formData);
      } else {
        addTask(formData);
      }
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.title ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.description ? 'border-red-500' : 'border-gray-300'}
            `}
            rows="3"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Priority
          </label>
          <div className="flex space-x-4">
            {['Low', 'Medium', 'High'].map(priority => (
              <label key={priority} className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <div className="flex space-x-4">
            {['Pending', 'Completed'].map(status => (
              <label key={status} className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;