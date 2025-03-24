
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoothCard from '@/components/booths/BoothCard';
import FloorPlan from '@/components/booths/FloorPlan';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutGrid, Map } from 'lucide-react';
import { useBooths } from '@/hooks/useBooths';

const Booths = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'floorplan'>('list');
  const { data: booths, isLoading, error } = useBooths();

  const handleBoothClick = (id: string) => {
    navigate(`/booth/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="mb-2 flex items-center"
                onClick={() => navigate('/')}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
              <h1 className="font-display text-3xl md:text-4xl font-medium mb-2">
                Explore Virtual Booths
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Browse and interact with employer booths from various industries and discover new career opportunities.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex">
                <Button
                  variant={view === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center"
                  onClick={() => setView('list')}
                >
                  <LayoutGrid size={16} className="mr-2" />
                  List View
                </Button>
                <Button
                  variant={view === 'floorplan' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center"
                  onClick={() => setView('floorplan')}
                >
                  <Map size={16} className="mr-2" />
                  Floor Plan
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading booths...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 rounded-lg p-4 mb-4">
              An error occurred while loading booths. Please try again later.
            </div>
          ) : view === 'list' ? (
            booths && booths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {booths.map((booth) => (
                  <BoothCard
                    key={booth.id}
                    id={booth.id}
                    name={booth.name}
                    logo={booth.logo}
                    coverImage={booth.cover_image}
                    location={booth.location}
                    industry={booth.industry}
                    openPositions={5} // This would ideally come from a count query
                    employeeCount={booth.employee_count}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <LayoutGrid size={24} className="text-gray-400" />
                </div>
                <h3 className="font-medium mb-2">No booths available</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  There are currently no employer booths to display.
                </p>
              </div>
            )
          ) : (
            <FloorPlan 
              booths={booths?.map(b => ({
                id: b.id,
                name: b.name,
                logo: b.logo,
                coverImage: b.cover_image,
                location: b.location,
                industry: b.industry,
                openPositions: 5,
                employeeCount: b.employee_count
              })) || []} 
              onBoothClick={handleBoothClick} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booths;
