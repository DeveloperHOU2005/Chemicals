import { useState, useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle, X, Check } from 'lucide-react';

// Component Toast Notification 
const ToastNotification = ({
  message = "Notification message",
  title,
  type = 'success',
  duration = 3000,
  position = 'top-right',
  onClose,
  showProgress = true,
}) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let progressInterval;
    let exitTimeout;
    
    if (showProgress && duration > 0) {
      const updateRate = 10; // Update every 10ms
      const step = (updateRate / duration) * 100;
      
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prevProgress - step;
        });
      }, updateRate);
    }

    if (duration > 0) {
      exitTimeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Match animation duration
      }, duration);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimeout);
    };
  }, [duration, onClose, showProgress]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Match animation duration
  };

  // Configure positions
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  // Type configurations
  const types = {
    success: {
      bgColor: 'bg-emerald-50',
      borderColor: 'border-l-4 border-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      icon: <Check className="w-5 h-5 text-emerald-500" />,
      progressColor: 'bg-emerald-500'
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-l-4 border-red-500',
      textColor: 'text-red-700 dark:text-red-300',
      icon: <X className="w-5 h-5 text-red-500" />,
      progressColor: 'bg-red-500'
    },
    warning: {
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-l-4 border-amber-500',
      textColor: 'text-amber-700 dark:text-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      progressColor: 'bg-amber-500'
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-4 border-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      progressColor: 'bg-blue-500'
    }
  };

  const typeConfig = types[type] || types.info;

  return (
    <div 
      className={`fixed ${positions[position] || positions['top-right']} z-50 max-w-md w-full md:w-96 
        transform transition-all duration-300 ease-in-out 
        ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
    >
      <div className={`${typeConfig.bgColor} ${typeConfig.borderColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              {typeConfig.icon}
            </div>
            <div className="ml-3 w-full">
              <div className="flex justify-between items-start">
                <div>
                  {title && (
                    <h3 className={`text-sm font-medium ${typeConfig.textColor}`}>
                      {title}
                    </h3>
                  )}
                  <div className={`text-sm ${typeConfig.textColor} mt-1`}>
                    {message}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {showProgress && duration > 0 && (
          <div className="h-1 w-full bg-gray-200">
            <div 
              className={`h-full ${typeConfig.progressColor} transition-all ease-linear`} 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastNotification