import { Incident } from '@/app/page';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';

export default function IncidentPlayer({ selectedIncident }: { selectedIncident: Incident | null }) {
  return (
    <div className="w-full h-[75vh] relative">
      <div className="rounded-md border">
        {selectedIncident ? (
          <video
            src={selectedIncident.videoUrl}
            controls
            className="w-full h-[75vh] object-cover bg-black"
            poster={selectedIncident.thumbnailUrl}
          />
        ) : (
          <div className="w-full h-[75vh] bg-black flex items-center justify-center">
            <p className="text-gray-400">Select an incident to view</p>
          </div>
        )}
      </div>
      {selectedIncident && (
        <>
          <div className="absolute top-4 left-4">
            <Badge variant="destructive">{selectedIncident.type}</Badge>
            <Badge className="ml-2">{new Date(selectedIncident.tsStart).toLocaleString()}</Badge>
          </div>
          <div className="absolute bottom-20 right-4 flex gap-2">
            <Card className="w-40 h-24 bg-black/50 backdrop-blur-sm">
              <CardContent className="p-2">
                <p className="text-sm font-semibold">South Exit</p>
              </CardContent>
            </Card>
            <Card className="w-40 h-24 bg-black/50 backdrop-blur-sm">
              <CardContent className="p-2">
                <p className="text-sm font-semibold">North Gate</p>
              </CardContent>
            </Card>
          </div>
          <div className="absolute bottom-20 left-4 flex items-center gap-2 text-white">
            <Camera size={16} />
            <p className="font-semibold">{selectedIncident.camera.name}</p>
          </div>
        </>
      )}
    </div>
  );
}
