// Network Management Assistant Story Data
// Based on slides 16-38 narrative sequence

export const storySequence = [
  {
    id: 1,
    trigger: "initial", // Auto-start
    type: 'bot',
    content: 'Hi Hannah',
    timestamp: 'Tuesday 08:34',
    hasAudio: false
  },
  {
    id: 2,
    trigger: "initial", // Auto-start after delay
    type: 'bot',
    content: 'Did you listen to the Podcast report I sent this morning after the events of last night',
    timestamp: 'Tuesday 08:34',
    hasAudio: true,
    audioPlaying: false
  },
  {
    id: 3,
    trigger: ["yes", "listened", "did", "podcast", "show me", "details"],
    type: 'user',
    content: 'I did, it helped get my head around last night\'s incident on the train ride over, can you show me details?',
    timestamp: null // Will be set dynamically
  },
  {
    id: 4,
    trigger: "auto", // Follows user message
    type: 'bot',
    content: 'Sure, at 11:32pm, we lost connectivity to cell tower Ath-Cent-01. We think it was caused by a power cut due to a fire breaking out in an adjacent shopping center. Here\'s the context on that:',
    timestamp: null,
    hasAudio: false,
    richMedia: {
      type: 'news_article',
      data: {
        category: 'Breaking News',
        headline: 'BLAZE BATTLE Busy shopping centre evacuated after blaze breaks out - fire trucks line the street as incident ongoing',
        summary: 'Images and video on social media show shoppers and staff on the street after being evacuated from the building',
        author: 'Paddy Farrell',
        published: '20:12, 16 Sept 2025',
        updated: '20:18, 16 Sept 2025'
      }
    }
  },
  {
    id: 5,
    trigger: "auto",
    type: 'bot',
    content: 'There were a number of critical alarms pointing towards synch issues from the site.',
    timestamp: null,
    hasAudio: false,
    richMedia: {
      type: 'alarm_table',
      data: {
        title: 'Critical Network Alarms',
        alarms: [
          {
            networkElement: 'Ath-Cent-01',
            severity: 'MAJOR',
            eventTime: '11:32:01',
            specificProblem: 'TU Synch Reference Loss of Signal'
          },
          {
            networkElement: 'Ath-Cent-01',
            severity: 'MAJOR',
            eventTime: '11:32:24',
            specificProblem: 'External Alarm'
          },
          {
            networkElement: 'Ath-Cent-01',
            severity: 'MAJOR',
            eventTime: '11:33:01',
            specificProblem: 'PowerLoss'
          }
        ]
      }
    }
  },
  {
    id: 6,
    trigger: "auto",
    type: 'bot',
    content: 'Subscriber connectivity KPIs dropped considerably and stayed low for some time.',
    timestamp: null,
    hasAudio: false,
    richMedia: {
      type: 'performance_chart',
      data: {
        title: 'Network Performance Impact',
        metrics: [
          { name: 'Mobile Broadband Throughput', color: '#3B82F6' },
          { name: 'Remote Driving Car Slice', color: '#EF4444' }
        ],
        timeRange: '22:30 - 01:00',
        impact: 'significant_drop'
      }
    }
  },
  {
    id: 7,
    trigger: "auto",
    type: 'bot',
    content: 'I took some compensation measures by increasing coverage for the nearby sites; primarily by increasing cell power and triggering the Remote Electrical Tilt feature',
    timestamp: null,
    hasAudio: false,
    richMedia: {
      type: 'network_topology',
      data: {
        title: 'Compensation Coverage Map',
        affectedSite: 'Ath-Cent-01',
        compensatingSites: ['Site-02', 'Site-03', 'Site-04', 'Site-05'],
        actions: [
          'Increased cell power',
          'Remote Electrical Tilt activated',
          'Coverage optimization applied'
        ]
      }
    }
  },
  {
    id: 8,
    trigger: "auto",
    type: 'bot',
    content: 'I sent details of the SLA breach to the BSS system so they could schedule a reboot, with my compensation measures their service was back without much interruption.',
    timestamp: null,
    hasAudio: false,
    richMedia: {
      type: 'sla_report',
      data: {
        title: 'SLA Breach Report',
        incident: 'Power Loss - Ath-Cent-01',
        duration: '47 minutes',
        affectedServices: 'Mobile Broadband, IoT Slices',
        compensationStatus: 'Applied',
        serviceRestoration: '99.2% uptime maintained'
      }
    }
  }
];

export const getNextStoryStep = (currentStep, userInput) => {
  const nextStep = currentStep + 1;
  const storyItem = storySequence[nextStep];
  
  if (!storyItem) return null;
  
  // Check if user input matches trigger conditions
  if (storyItem.trigger === "auto") {
    return storyItem;
  }
  
  if (Array.isArray(storyItem.trigger)) {
    const inputLower = userInput.toLowerCase();
    const matchesTrigger = storyItem.trigger.some(trigger => 
      inputLower.includes(trigger.toLowerCase())
    );
    
    if (matchesTrigger) {
      return storyItem;
    }
  }
  
  return null;
};

export const getStoryResponse = (userInput, currentStep) => {
  const nextStep = getNextStoryStep(currentStep, userInput);
  
  if (nextStep) {
    return nextStep;
  }
  
  // Fallback responses to keep conversation flowing
  const fallbackResponses = [
    "I can provide more details about the network incident. What specific aspect would you like to explore?",
    "The automated response systems worked well during this incident. Would you like to see the technical analysis?",
    "This incident demonstrates our proactive network management capabilities. Any questions about the resolution process?"
  ];
  
  return {
    id: Date.now(),
    type: 'bot',
    content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hasAudio: false
  };
};
