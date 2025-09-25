import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  MapPin, 
  FileText, 
  ExternalLink, 
  User, 
  Calendar,
  Zap
} from 'lucide-react';
import ConfigLogs from './ConfigLogs';

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
      <div className="bg-blue-600 text-white px-4 py-2 flex items-center">
        <TrendingDown className="w-5 h-5 mr-2" />
        <span className="font-medium">Network Performance Impact</span>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-blue-500"></div>
            <span className="text-sm text-gray-600">Mobile Broadband Throughput</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-purple-500"></div>
            <span className="text-sm text-gray-600">Remote Driving Car Slice</span>
          </div>
        </div>
        
        <div className="relative h-40 bg-gray-50 rounded border p-4">
          <svg width="100%" height="100%" viewBox="0 0 500 160" className="overflow-visible">
            {/* Y-axis labels */}
            <text x="10" y="20" fontSize="10" fill="#6b7280">60</text>
            <text x="10" y="45" fontSize="10" fill="#6b7280">50</text>
            <text x="10" y="70" fontSize="10" fill="#6b7280">40</text>
            <text x="10" y="95" fontSize="10" fill="#6b7280">30</text>
            <text x="10" y="120" fontSize="10" fill="#6b7280">20</text>
            <text x="10" y="145" fontSize="10" fill="#6b7280">10</text>
            <text x="15" y="160" fontSize="10" fill="#6b7280">0</text>
            
            {/* X-axis labels */}
            <text x="40" y="155" fontSize="9" fill="#6b7280">22:30</text>
            <text x="80" y="155" fontSize="9" fill="#6b7280">23:00</text>
            <text x="120" y="155" fontSize="9" fill="#6b7280">23:30</text>
            <text x="160" y="155" fontSize="9" fill="#6b7280">00:00</text>
            <text x="200" y="155" fontSize="9" fill="#6b7280">00:30</text>
            <text x="240" y="155" fontSize="9" fill="#6b7280">01:00</text>
            <text x="280" y="155" fontSize="9" fill="#6b7280">01:30</text>
            <text x="320" y="155" fontSize="9" fill="#6b7280">02:00</text>
            <text x="360" y="155" fontSize="9" fill="#6b7280">02:30</text>
            <text x="400" y="155" fontSize="9" fill="#6b7280">03:00</text>
            
            {/* Grid lines */}
            {[20, 45, 70, 95, 120, 145].map(y => (
              <line key={y} x1="30" y1={y} x2="450" y2={y} stroke="#e5e7eb" strokeWidth="0.5"/>
            ))}
            
            {/* Mobile Broadband Throughput line */}
            <path
              d="M30,30 L70,32 L110,35 L150,38 L190,95 L230,100 L270,98 L310,85 L350,70 L390,55 L430,45 L450,40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className={`transition-all duration-3000 ${animated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: animated ? 'none' : '1000',
                strokeDashoffset: animated ? '0' : '1000'
              }}
            />
            
            {/* Remote Driving Car Slice line */}
            <path
              d="M30,25 L70,28 L110,30 L150,32 L190,110 L230,115 L270,112 L310,95 L350,80 L390,65 L430,50 L450,45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              className={`transition-all duration-3000 ${animated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: animated ? 'none' : '1000',
                strokeDashoffset: animated ? '0' : '1000',
                animationDelay: '0.5s'
              }}
            />
            
            {/* Critical incident marker */}
            <line x1="190" y1="10" x2="190" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" className={`${animated ? 'animate-pulse' : ''}`} />
            <circle cx="190" cy="95" r="4" fill="#ef4444" className={`${animated ? 'animate-pulse' : ''}`} />
            <text x="195" y="15" fontSize="10" fill="#ef4444" fontWeight="bold">11:32 PM</text>
            <text x="195" y="25" fontSize="8" fill="#ef4444">Power Loss Event</text>
          </svg>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          Subscriber connectivity KPIs dropped considerably and stayed low for some time.
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
        <span className="font-medium">Compensation Coverage Map</span>
      </div>
      <div className="p-4">
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-blue-50 rounded border overflow-hidden">
          {/* Geographic background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 250">
              {/* Street pattern */}
              <line x1="0" y1="80" x2="400" y2="80" stroke="#d1d5db" strokeWidth="2"/>
              <line x1="0" y1="170" x2="400" y2="170" stroke="#d1d5db" strokeWidth="2"/>
              <line x1="100" y1="0" x2="100" y2="250" stroke="#d1d5db" strokeWidth="2"/>
              <line x1="300" y1="0" x2="300" y2="250" stroke="#d1d5db" strokeWidth="2"/>
              
              {/* Building blocks */}
              <rect x="50" y="40" width="40" height="30" fill="#e5e7eb" opacity="0.5"/>
              <rect x="310" y="40" width="40" height="30" fill="#e5e7eb" opacity="0.5"/>
              <rect x="50" y="180" width="40" height="30" fill="#e5e7eb" opacity="0.5"/>
              <rect x="310" y="180" width="40" height="30" fill="#e5e7eb" opacity="0.5"/>
            </svg>
          </div>
          
          {/* Network topology visualization */}
          <svg width="100%" height="100%" viewBox="0 0 400 250" className="absolute inset-0">
            {/* Affected site (center) - Ath-Cent-01 */}
            <circle 
              cx="200" 
              cy="125" 
              r="12" 
              fill="#ef4444" 
              stroke="#fff"
              strokeWidth="2"
              className="animate-pulse"
            />
            <text x="200" y="130" textAnchor="middle" fontSize="3" fill="white" fontWeight="bold">
              X
            </text>
            <text x="200" y="150" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="medium">
              Ath-Cent-01
            </text>
            <text x="200" y="162" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold">
              OFFLINE
            </text>
            
            {/* Compensating sites with exact positioning from slide 22 */}
            {[
              { x: 120, y: 80, id: '02', label: 'Site-02' },
              { x: 280, y: 80, id: '03', label: 'Site-03' },
              { x: 120, y: 170, id: '04', label: 'Site-04' },
              { x: 280, y: 170, id: '05', label: 'Site-05' },
              { x: 350, y: 60, id: '06', label: 'Site-06' }
            ].map((site, index) => (
              <g key={site.id}>
                <circle 
                  cx={site.x} 
                  cy={site.y} 
                  r="8" 
                  fill={showCompensation ? "#10b981" : "#6b7280"}
                  stroke="#fff"
                  strokeWidth="2"
                  className={showCompensation ? "animate-pulse" : ""}
                />
                <text x={site.x} y={site.y + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                  {site.id}
                </text>
                <text x={site.x} y={site.y + 20} textAnchor="middle" fontSize="8" fill="#374151">
                  {site.label}
                </text>
                
                {showCompensation && (
                  <>
                    {/* Connection lines to failed site */}
                    <line 
                      x1={site.x} 
                      y1={site.y} 
                      x2="200" 
                      y2="125" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                    
                    {/* Coverage expansion circles */}
                    <circle 
                      cx={site.x} 
                      cy={site.y} 
                      r="25" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="1" 
                      opacity="0.4"
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                    <circle 
                      cx={site.x} 
                      cy={site.y} 
                      r="35" 
                      fill="rgba(16, 185, 129, 0.1)" 
                      stroke="#10b981" 
                      strokeWidth="1" 
                      opacity="0.3"
                    />
                  </>
                )}
              </g>
            ))}
            
            {/* Coverage area highlight */}
            {showCompensation && (
              <ellipse 
                cx="200" 
                cy="125" 
                rx="120" 
                ry="80" 
                fill="rgba(16, 185, 129, 0.1)" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeDasharray="10,5"
                opacity="0.6"
              />
            )}
          </svg>
          
          {showCompensation && (
            <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-300">
              <Zap className="w-3 h-3 inline mr-1" />
              Compensation Active
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-3">
          <h4 className="font-medium text-gray-900">Automated Actions Taken:</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Increased cell power on nearby sites</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Remote Electrical Tilt feature activated</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Coverage optimization applied automatically</span>
            </div>
          </div>
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
    case 'config_logs':
      return <ConfigLogs data={data} />;
    default:
      return null;
  }
};

export default RichMedia;
