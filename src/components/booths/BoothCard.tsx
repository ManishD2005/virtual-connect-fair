
import { Link } from 'react-router-dom';
import { MapPin, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardImage, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <Card hover>
      <div className="relative">
        <CardImage
          src={coverImage}
          alt={`${name} cover`}
          aspectRatio="video"
        />
        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-2">
          <img
            src={logo}
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain"
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
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Visit Booth
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BoothCard;
