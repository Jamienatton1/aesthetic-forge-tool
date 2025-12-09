import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface Location {
  name: string;
  trees: number;
  coordinates: [number, number];
}

const treeLocations: Location[] = [
  { name: "Marereni & Kurawa, Kenya", trees: 1639, coordinates: [39.9, -2.8] },
  { name: "Haiti", trees: 33639, coordinates: [-72.3, 18.9] },
  { name: "Williams Lake, British Columbia, Canada", trees: 1000, coordinates: [-122.1, 52.1] },
];

export function TreesMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem('mapbox_token') || '');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [inputToken, setInputToken] = useState(token);

  const initializeMap = (accessToken: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 1.5,
      center: [-20, 20],
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);

      // Add markers for each location
      treeLocations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'tree-marker';
        el.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 14V2"/>
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
              </svg>
            </div>
          </div>
        `;

        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-tree-marker';
        markerEl.style.cssText = `
          width: 40px;
          height: 40px;
          background: hsl(142, 76%, 36%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 3px solid white;
        `;
        markerEl.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-3-3 3 3 0 0 1 3-3h1a7 7 0 0 1 14 0 3 3 0 0 1 3 3 3 3 0 0 1-3 3h-3.9a3 3 0 0 1-2.1-.8"/>
            <path d="M12 2v10"/>
            <path d="m8 22 4-10 4 10"/>
          </svg>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; text-align: center;">
            <strong style="font-size: 14px;">${location.name}</strong>
            <div style="color: hsl(142, 76%, 36%); font-weight: 600; font-size: 16px; margin-top: 4px;">
              🌳 ${location.trees.toLocaleString()} trees
            </div>
          </div>
        `);

        new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };

  const handleSaveToken = () => {
    localStorage.setItem('mapbox_token', inputToken);
    setToken(inputToken);
  };

  useEffect(() => {
    if (token) {
      initializeMap(token);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [token]);

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Tree Planting Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the interactive map. Get your token from{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Mapbox public token"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveToken} disabled={!inputToken}>
                Load Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </CardContent>
    </Card>
  );
}
