import React, { useState, useEffect } from 'react';
import { Settings, Clock, Target, Info } from 'lucide-react';

const ConfigLogs = ({ data }) => {
  const [animatedRows, setAnimatedRows] = useState([]);
  
  useEffect(() => {
    // Animate rows appearing one by one
    data.logs.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedRows(prev => [...prev, index]);
      }, index * 300);
    });
  }, [data.logs]);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-cyan-600 text-white px-4 py-2 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        <span className="font-medium">{data.title}</span>
      </div>
      
      {/* Context Banner */}
      <div className="bg-cyan-50 border-b border-cyan-200 px-4 py-2">
        <div className="flex items-center text-cyan-800">
          <Info className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Context: {data.context}</span>
        </div>
      </div>
      
      {/* Configuration Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Time
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  CM Target
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.logs.map((log, index) => (
              <tr 
                key={index} 
                className={`transition-all duration-500 ${
                  animatedRows.includes(index) 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-4'
                } hover:bg-gray-50`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">{log.time}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {log.cmTarget}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">
                    {log.details.includes('→') ? (
                      <div className="flex items-center space-x-2">
                        <span>{log.details.split(' → ')[0]}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-semibold text-green-600">
                          {log.details.split(' → ')[1]}
                        </span>
                      </div>
                    ) : (
                      log.details
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {data.logs.length} configuration changes
          </div>
          <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
            View network logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigLogs;
