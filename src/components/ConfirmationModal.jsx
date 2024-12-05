import React, { useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const ConfirmationModal = ({ 
  title, 
  message, 
  onConfirm, 
}) => {
  const dialogRef = useRef(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleConfirm = () => {
    onConfirm();
    dialogRef.current?.close();
  };

  const handleCancel = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button 
        onClick={handleOpen} 
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        <TrashIcon className="h-5 w-5" />
      </button>

      <dialog 
        ref={dialogRef} 
        className="rounded-lg shadow-xl backdrop:bg-gray-500 backdrop:opacity-50 p-6 w-96 fixed left-1/2 -translate-x-1/2 m-0"
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmationModal;