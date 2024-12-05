import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckIcon, 
  PencilIcon, 
  TrashIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { useTasks } from '../context/TaskContext';
import ConfirmationModal from '../components/ConfirmationModal';

const TaskList = () => {
  const { tasks, toggleTaskStatus, deleteTask } = useTasks();
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks;

    // Search filter
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      result = result.filter(task => 
        task.title.toLowerCase().includes(lowercaseQuery) || 
        task.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Status filter
    if (filter !== 'All') {
      result = result.filter(task => task.status === filter);
    }

    // Sort tasks
    return result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tasks, filter, sortBy, sortDirection, searchQuery]);

  const renderPriorityBadge = (priority) => {
    const badgeColors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badgeColors[priority]}`}>
        {priority}
      </span>
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
        
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
            <button 
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="text-gray-600 hover:text-gray-900"
            >
              {sortDirection === 'asc' ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          {searchQuery ? `No tasks found matching "${searchQuery}"` : 'No tasks found'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`
                flex justify-between items-center p-4 border rounded-lg 
                ${task.status === 'Completed' ? 'bg-gray-100 opacity-70' : 'bg-white'}
              `}
            >
                
              <div className="flex-grow">
                <div className="flex items-center space-x-3">
                  <h3 className={`font-semibold ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  {renderPriorityBadge(task.priority)}
                </div>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <div className="text-sm text-gray-500 mt-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`
                    p-2 rounded-full 
                    ${task.status === 'Completed' 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <Link 
                  to={`/edit-task/${task.id}`}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <ConfirmationModal title="Delete Task" message="Are you sure you want to delete this task?" onConfirm={() => deleteTask(task.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;