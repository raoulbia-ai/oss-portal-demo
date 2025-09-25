import React, { useState, useEffect } from 'react';
import { ExternalLink, AlertTriangle, TrendingDown, MapPin, FileText, Zap } from 'lucide-react';

const NewsArticle = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-blue-600 text-white px-3 py-1 text-xs font-medium">
        News → {data.category}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
          <span className="text-blue-600 font-black">BLAZE BATTLE</span>{' '}
          <span className="text-gray-900">Busy shopping centre evacuated after blaze breaks out - fire trucks line the street as incident ongoing</span>
        </h3>
        <p className="text-gray-600 text-sm mb-3">{data.summary}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">{data.author}</span>
          <div className="space-x-2">
            <span>Published: {data.published}</span>
            <span>Updated: {data.updated}</span>
          </div>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          {expanded ? 'Show Less' : 'Read Full Article'}
        </button>
        {expanded && (
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
            <p>Emergency services responded to a major fire at the Atherton Central Shopping Complex at approximately 11:30 PM. The blaze, which started in the electrical substation, caused a complete power outage affecting the surrounding area including critical telecommunications infrastructure.</p>
            <p className="mt-2">Fire crews worked through the night to contain the blaze, with power restoration expected by morning. Local authorities have confirmed no injuries, but significant disruption to services is expected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AlarmTable = ({ data }) => {
  const [animatedRows, setAnimatedRows] = useState([]);
  
  useEffect(() => {
    // Animate rows appearing one by one
    data.alarms.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedRows(prev => [...prev, index]);
      }, index * 500);
    });
  }, [data.alarms]);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-red-600 text-white px-4 py-2 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span className="font-medium">{data.title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Network Element</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event Time</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Specific Problem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.alarms.map((alarm, index) => (
              <tr 
                key={index} 
                className={`transition-all duration-500 ${
                  animatedRows.includes(index) 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-4'
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-medium text-gray-900">{alarm.networkElement}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {alarm.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-mono">{alarm.eventTime}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{alarm.specificProblem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PerformanceChart = ({ data }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-yellow-600 text-white px-4 py-2 flex items-center">
        <TrendingDown className="w-5 h-5 mr-2" />
        <span className="font-medium">{data.title}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          {data.metrics.map((metric, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: metric.color }}
              ></div>
              <span className="text-sm text-gray-600">{metric.name}</span>
            </div>
          ))}
        </div>
        <div className="relative h-32 bg-gray-50 rounded border">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 400 120" className="overflow-visible">
              {/* Grid lines */}
              {[20, 40, 60, 80, 100].map(y => (
                <line key={y} x1="40" y1={y} x2="380" y2={y} stroke="#e5e7eb" strokeWidth="1"/>
              ))}
              
              {/* Performance drop visualization */}
              <path
                d="M40,30 L120,30 L140,35 L160,45 L180,80 L200,85 L220,82 L240,78 L260,75 L280,70 L300,65 L320,45 L340,35 L360,32 L380,30"
                fill="none"
                stroke={data.metrics[0].color}
                strokeWidth="2"
                className={`transition-all duration-2000 ${animated ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: animated ? 'none' : '1000',
                  strokeDashoffset: animated ? '0' : '1000'
                }}
              />
              
              {/* Critical incident marker */}
              <circle cx="180" cy="80" r="4" fill="#ef4444" className={`${animated ? 'animate-pulse' : ''}`} />
              <text x="185" y="95" fontSize="10" fill="#374151">11:32 PM</text>
              <text x="185" y="107" fontSize="8" fill="#6b7280">Power Loss</text>
            </svg>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Time Range: {data.timeRange} | Impact: Significant service degradation detected
        </div>
      </div>
    </div>
  );
};

const NetworkTopology = ({ data }) => {
  const [showCompensation, setShowCompensation] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setShowCompensation(true), 1000);
  }, []);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-green-600 text-white px-4 py-2 flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        <span className="font-medium">{data.title}</span>
      </div>
      <div className="p-4">
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded border overflow-hidden">
          {/* Network topology visualization */}
          <svg width="100%" height="100%" viewBox="0 0 400 200" className="absolute inset-0">
            {/* Affected site (center) */}
            <circle 
              cx="200" 
              cy="100" 
              r="8" 
              fill="#ef4444" 
              className="animate-pulse"
            />
            <text x="200" y="125" textAnchor="middle" fontSize="10" fill="#374151">
              Ath-Cent-01
            </text>
            <text x="200" y="135" textAnchor="middle" fontSize="8" fill="#ef4444">
              OFFLINE
            </text>
            
            {/* Compensating sites */}
            {[
              { x: 120, y: 60, id: '02' },
              { x: 280, y: 60, id: '03' },
              { x: 120, y: 140, id: '04' },
              { x: 280, y: 140, id: '05' }
            ].map((site, index) => (
              <g key={site.id}>
                <circle 
                  cx={site.x} 
                  cy={site.y} 
                  r="6" 
                  fill={showCompensation ? "#10b981" : "#6b7280"}
                  className={showCompensation ? "animate-pulse" : ""}
                />
                <text x={site.x} y={site.y + 20} textAnchor="middle" fontSize="8" fill="#374141">
                  Site-{site.id}
                </text>
                {showCompensation && (
                  <>
                    <line 
                      x1={site.x} 
                      y1={site.y} 
                      x2="200" 
                      y2="100" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                    <circle 
                      cx={site.x} 
                      cy={site.y} 
                      r="15" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="1" 
                      opacity="0.3"
                      className="animate-ping"
                    />
                  </>
                )}
              </g>
            ))}
          </svg>
          
          {showCompensation && (
            <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              <Zap className="w-3 h-3 inline mr-1" />
              Compensation Active
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">Automated Actions Taken:</h4>
          <ul className="space-y-1">
            {data.actions.map((action, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SLAReport = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-purple-600 text-white px-4 py-2 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        <span className="font-medium">{data.title}</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Incident</div>
            <div className="font-medium text-gray-900">{data.incident}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Duration</div>
            <div className="font-medium text-gray-900">{data.duration}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Affected Services</div>
            <div className="font-medium text-gray-900">{data.affectedServices}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Service Restoration</div>
            <div className="font-medium text-green-600">{data.serviceRestoration}</div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">
              Compensation Status: {data.compensationStatus}
            </span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            Automated network optimization maintained service levels within acceptable thresholds.
          </p>
        </div>
        
        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
          View Full SLA Report
        </button>
      </div>
    </div>
  );
};

const RichMedia = ({ type, data }) => {
  if (!type || !data) return null;
  
  switch (type) {
    case 'news_article':
      return <NewsArticle data={data} />;
    case 'alarm_table':
      return <AlarmTable data={data} />;
    case 'performance_chart':
      return <PerformanceChart data={data} />;
    case 'network_topology':
      return <NetworkTopology data={data} />;
    case 'sla_report':
      return <SLAReport data={data} />;
    default:
      return null;
  }
};

export default RichMedia;
