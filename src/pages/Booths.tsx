
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoothCard, { BoothProps } from '@/components/booths/BoothCard';
import FloorPlan from '@/components/booths/FloorPlan';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutGrid, Map } from 'lucide-react';

const Booths = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'floorplan'>('list');

  // Mock data - in a real app this would come from an API
  const boothsData: BoothProps[] = [
    {
      id: '1',
      name: 'TechCorp Inc.',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'San Francisco, CA',
      industry: 'Technology',
      openPositions: 12,
      employeeCount: '1,000-5,000',
    },
    {
      id: '2',
      name: 'Global Health Solutions',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'Boston, MA',
      industry: 'Healthcare',
      openPositions: 8,
      employeeCount: '5,000-10,000',
    },
    {
      id: '3',
      name: 'Fintech Innovations',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'New York, NY',
      industry: 'Finance',
      openPositions: 5,
      employeeCount: '500-1,000',
    },
    {
      id: '4',
      name: 'Creative Media Group',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'Los Angeles, CA',
      industry: 'Media',
      openPositions: 7,
      employeeCount: '100-500',
    },
    {
      id: '5',
      name: 'EduLearn Systems',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'Chicago, IL',
      industry: 'Education',
      openPositions: 4,
      employeeCount: '100-500',
    },
    {
      id: '6',
      name: 'GreenEnergy Solutions',
      logo: 'https://via.placeholder.com/150',
      coverImage: 'https://via.placeholder.com/800x400',
      location: 'Austin, TX',
      industry: 'Energy',
      openPositions: 6,
      employeeCount: '1,000-5,000',
    },
  ];

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
                icon={<ArrowLeft size={16} />}
                className="mb-2"
                onClick={() => navigate('/')}
              >
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
                  variant={view === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={<LayoutGrid size={16} />}
                  onClick={() => setView('list')}
                >
                  List View
                </Button>
                <Button
                  variant={view === 'floorplan' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={<Map size={16} />}
                  onClick={() => setView('floorplan')}
                >
                  Floor Plan
                </Button>
              </div>
            </div>
          </div>

          {view === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boothsData.map((booth) => (
                <BoothCard key={booth.id} {...booth} />
              ))}
            </div>
          ) : (
            <FloorPlan booths={boothsData} onBoothClick={handleBoothClick} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booths;
