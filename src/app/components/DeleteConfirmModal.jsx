"use client";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-red-500">Confirm Delete</h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete this tutor? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
