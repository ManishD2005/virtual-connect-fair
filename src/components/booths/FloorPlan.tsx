
import { useState } from 'react';
import { Search, Filter, Grid } from 'lucide-react';
import { BoothProps } from './BoothCard';

interface FloorPlanProps {
  booths: BoothProps[];
  onBoothClick: (id: string) => void;
}

const FloorPlan = ({ booths, onBoothClick }: FloorPlanProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredBooths = booths.filter(booth => 
    booth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booth.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 bg-gray-50 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <div className="bg-gray-100 rounded-md p-1 flex items-center">
              <button 
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={16} />
              </button>
              <button 
                className={`p-1.5 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('map')}
                aria-label="Map view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="9"></rect>
                  <rect x="14" y="3" width="7" height="5"></rect>
                  <rect x="14" y="12" width="7" height="9"></rect>
                  <rect x="3" y="16" width="7" height="5"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {viewMode === 'grid' ? (
          filteredBooths.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooths.map((booth) => (
                <div
                  key={booth.id}
                  className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onBoothClick(booth.id)}
                >
                  <div className="w-16 h-16 mb-3 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                    <img
                      src={booth.logo}
                      alt={`${booth.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm mb-1 line-clamp-1">{booth.name}</div>
                    <div className="text-xs text-muted-foreground">{booth.industry}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No matching booths found.</p>
            </div>
          )
        ) : (
          <div className="aspect-[16/9] bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 max-w-md text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground">
                  <rect x="3" y="3" width="7" height="9"></rect>
                  <rect x="14" y="3" width="7" height="5"></rect>
                  <rect x="14" y="12" width="7" height="9"></rect>
                  <rect x="3" y="16" width="7" height="5"></rect>
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium mb-2">Interactive Floor Plan</h3>
              <p className="text-muted-foreground text-sm">
                The interactive map view will be available in the next update. Switch to grid view to explore available booths.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlan;
