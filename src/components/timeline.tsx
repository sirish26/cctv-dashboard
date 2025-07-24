'use client';

import { useEffect, useState } from 'react';
import { Camera} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Incident } from '@/app/page';
import { Badge } from "@/components/ui/badge"


const hours = Array.from({ length: 25 }, (_, i) => i);

export default function IncidentTimeline() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch('/api/incidents')
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  const grouped = incidents.reduce<Record<string, Incident[]>>((acc, incident) => {
    const camera = incident.camera.name;
    if (!acc[camera]) acc[camera] = [];
    acc[camera].push(incident);
    return acc;
  }, {});

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(24, 0, 0, 0);
  const dayDuration = endOfDay.getTime() - startOfDay.getTime();

  return (
    <div className="bg-[#151515]">
      <h2 className="text-sm font-semibold mb-3">🎥 Camera List</h2>

      <div className="relative border-b border-gray-700 mb-2 ml-[140px]">
        <div className="flex absolute w-full justify-between text-xs text-gray-400 pr-4">
          {hours.map((h) => (
            <div key={h} className="w-[60px] text-center">
              {String(h).padStart(2, '0')}:00
            </div>
          ))}
        </div>
        <div className="ml-[140px] h-6 border-t border-gray-600" />
      </div>

      <div className="space-y-2">
        {Object.entries(grouped).map(([camera, incs]) => (
          <div key={camera} className="flex items-center">
            <div className="w-[140px] flex items-center gap-2 text-sm font-medium text-gray-200">
              <Camera className="w-4 h-4" />
              {camera}
            </div>
            <div className="relative h-full w-full border-t border-gray-700">
              {incs.map((incident) => {
                const start = new Date(incident.tsStart).getTime();
                const end = new Date(incident.tsEnd).getTime();

                const startPercent = ((start - startOfDay.getTime()) / dayDuration) * 100;
                const widthPercent = ((end - start) / dayDuration) * 100;
                const label = incident.type;
                const time = new Date(incident.tsStart).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <Badge
                    key={incident.id}
                    className={cn(
                      'absolute top-1 px-2 py-1 text-xs  whitespace-nowrap',
                    )}
                    style={{
                      left: `${startPercent}%`,
                      width: `${Math.max(widthPercent, 2)}%`,
                      minWidth: 80,
                    }}
                    title={`${label} at ${time}`}
                  >
                    {label} {label === 'Face Recognised' ? time : ''}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

