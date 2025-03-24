
import { Link } from 'react-router-dom';
import { MapPin, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface BoothProps {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  location: string;
  industry: string;
  openPositions: number;
  employeeCount: string;
}

const BoothCard = ({
  id,
  name,
  logo,
  coverImage,
  location,
  industry,
  openPositions,
  employeeCount,
}: BoothProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-full overflow-hidden aspect-video">
          <img
            src={coverImage || 'https://via.placeholder.com/800x400'}
            alt={`${name} cover`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400';
            }}
          />
        </div>
        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-2">
          <img
            src={logo || 'https://via.placeholder.com/150'}
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
      </div>

      <CardHeader className="pt-12">
        <CardTitle>{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin size={14} className="mr-1" />
          {location}
          <span className="mx-2">•</span>
          {industry}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex space-x-4">
          <div className="flex items-center text-sm">
            <Briefcase size={16} className="mr-1.5 text-muted-foreground" />
            <span>{openPositions} open positions</span>
          </div>
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-1.5 text-muted-foreground" />
            <span>{employeeCount} employees</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
        <div className="text-xs text-muted-foreground">Virtual Booth</div>
        <Link to={`/booth/${id}`}>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center"
          >
            Visit Booth
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BoothCard;
