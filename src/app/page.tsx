'use client';

import IncidentPlayer from '@/components/incidentplayer';
import IncidentList from '@/components/incidentlist';
import Navbar from '@/components/navbar';
import TimeLine from '@/components/timeline';
import { useState } from 'react';

export type Incident = {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  videoUrl: string;
  resolved: boolean;
  camera: {
    name: string;
    location: string;
  };
};

export default function Home() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  return (
    <div className="flex flex-col bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex flex-col w-4/5 bg-[#1a1a1a] rounded-lg p-2">
          <IncidentPlayer selectedIncident={selectedIncident} />
        </div>
        <div className="flex flex-col w-2/5 bg-[#1a1a1a] rounded-lg p-2">
          <IncidentList setSelectedIncident={setSelectedIncident} />
        </div>
      </div>
      <div className="bg-[#1a1a1a] border-t border-gray-700 p-2">
        <TimeLine />
      </div>
    </div>
  );
}
