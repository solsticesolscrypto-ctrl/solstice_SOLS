import React from 'react';

const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl text-white shadow-lg border ${
      isSuccess
        ? 'bg-emerald-600/90 border-emerald-400/40'
        : 'bg-rose-600/90 border-rose-400/40'
    } backdrop-blur`}
      role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-2 w-2 rounded-full ${isSuccess ? 'bg-emerald-300' : 'bg-rose-300'}`}></span>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66fcf1]/40 rounded"
          aria-label="Cerrar mensaje"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
