import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const TYPES = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    iconColor: 'text-green-500'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    iconColor: 'text-red-500'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    iconColor: 'text-blue-500'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500'
  }
};

function Notification({ type = 'info', message, onClose, autoClose = true, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);
  
  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = TYPES[type] || TYPES.info;

  useEffect(() => {
    let timer;
    if (autoClose && isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300);
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, duration, onClose, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className={`${bgColor} border ${borderColor} ${textColor} rounded-lg p-4 shadow-md flex items-start`}>
        <div className={`${iconColor} mr-3 flex-shrink-0 mt-0.5`}>
          <Icon size={18} />
        </div>
        <div className="flex-grow">
          <p className="text-sm">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className={`ml-3 flex-shrink-0 ${textColor} hover:text-gray-700 transition-colors`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default Notification;