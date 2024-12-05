import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ListBulletIcon } from '@heroicons/react/24/solid';

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ListBulletIcon className="h-6 w-6" />
          <span className="font-bold text-xl">To Do List</span>
        </Link>
        <Link 
          to="/add-task" 
          className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-50 transition"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Task</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;