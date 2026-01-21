import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TreePine } from 'lucide-react';

interface Location {
  name: string;
  trees: number;
  coordinates: [number, number];
}

const treeLocations: Location[] = [
  { name: "Marereni & Kurawa, Kenya", trees: 1639, coordinates: [39.9, -2.8] },
  { name: "Haiti", trees: 33639, coordinates: [-72.3, 18.9] },
  { name: "Williams Lake, British Columbia, Canada", trees: 1000, coordinates: [-122.1, 52.1] },
  { name: "Amazon Rainforest, Brazil", trees: 5000, coordinates: [-60.0, -3.4] },
  { name: "Borneo, Indonesia", trees: 2500, coordinates: [116.0, 0.5] },
];

export function CalculatorMap() {
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
      style: 'mapbox://styles/mapbox/outdoors-v12',
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
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-tree-marker';
        markerEl.style.cssText = `
          width: 36px;
          height: 36px;
          background: hsl(142, 76%, 36%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 2px solid white;
        `;
        markerEl.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-3-3 3 3 0 0 1 3-3h1a7 7 0 0 1 14 0 3 3 0 0 1 3 3 3 3 0 0 1-3 3h-3.9a3 3 0 0 1-2.1-.8"/>
            <path d="M12 2v10"/>
            <path d="m8 22 4-10 4 10"/>
          </svg>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; text-align: center;">
            <strong style="font-size: 14px; color: #1a1a1a;">${location.name}</strong>
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
      <div className="p-4 flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <TreePine className="h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox token to view where your trees will be planted around the world.
            </p>
          </div>
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
          <p className="text-xs text-muted-foreground">
            Get your free token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] flex-1 min-h-[200px]">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
