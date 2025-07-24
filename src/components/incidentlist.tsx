'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Incident } from '@/app/page';

const getIncidentIcon = (type: string) => {
  switch (type) {
    case 'Face Recognised':
      return '👤';
    case 'Gun Threat':
      return '🔫';
    case 'Unauthorized Entry':
      return '🚪';
    case 'Multiple Events':
      return '⚠️';
    default:
      return '❓';
  }
};

export default function IncidentList({
  setSelectedIncident,
}: {
  setSelectedIncident: (incident: Incident) => void;
}) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    fetch(`/api/incidents?resolved=${showResolved}`)
      .then((res) => res.json())
      .then((data) => setIncidents(data));
  }, [showResolved]);

  useEffect(() => {
    fetch('/api/incidents?resolved=true')
      .then((res) => res.json())
      .then((data) => setResolvedCount(data.length));
  }, [incidents]);

  const resolveIncident = async (id: number) => {
    await fetch(`/api/incidents/${id}/reslove`, { method: 'PATCH' });
    fetch('/api/incidents?resolved=false')
      .then((res) => res.json())
      .then((data) => setIncidents(data));
    fetch('/api/incidents?resolved=true')
      .then((res) => res.json())
      .then((data) => setResolvedCount(data.length));
  };

  return (
    <div className="bg-[#151515] p-4 rounded-xl text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="text-red-500" size={20} />
          {showResolved
            ? `${resolvedCount} Resolved Incidents`
            : `${incidents.length} Unresolved Incidents`}
        </div>
        <div
          className="flex items-center gap-1 bg-[#222] px-3 py-1 rounded-full text-sm cursor-pointer"
          onClick={() => setShowResolved((prev) => !prev)}
        >
          <span className="ml-1 text-gray-300 underline">
            {resolvedCount} Resolved
          </span>
        </div>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex bg-[#1f1f1f] rounded-lg shadow-md cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              onClick={() => setSelectedIncident(incident)}
            >
              <img
                src={incident.thumbnailUrl}
                alt={incident.type}
                className="w-[150px] h-[100px] object-cover border-r border-gray-800"
              />
              <div className="flex flex-col justify-between p-3 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <span className="text-xl">{getIncidentIcon(incident.type)}</span>
                    {incident.type}
                  </div>
                  {!showResolved && (
                    <button
                      className="text-yellow-400 hover:underline text-sm flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        resolveIncident(incident.id);
                      }}
                    >
                      Resolve <ChevronRight size={14} />
                    </button>
                  )}
                </div>

                <div className="text-sm text-gray-300 mt-1 flex items-center gap-2">
                  <Camera size={14} />
                  {incident.camera.name}
                </div>

                <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                  <Clock size={14} />
                  {formatTime(incident.tsStart)} – {formatTime(incident.tsEnd)} on {formatDate(incident.tsStart)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
