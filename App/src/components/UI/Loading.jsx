import { useState } from 'react';

export default function LoadingComponent({type, title}) {
  const [activeLoader, setActiveLoader] = useState(type || 'spinner');
  
  return (
    <div className="flex items-center justify-center w-full h-64 bg-white rounded-lg">
        {activeLoader === 'spinner' && <SpinnerLoader />}
        {activeLoader === 'dots' && <DotsLoader />}
        {activeLoader === 'pulse' && <PulseLoader title={title} />}
        {activeLoader === 'skeleton' && <SkeletonLoader />}
    </div>
  );
}

function SpinnerLoader() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}

function DotsLoader() {
  return (
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}

function PulseLoader({title}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
        <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{title}</p>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
}