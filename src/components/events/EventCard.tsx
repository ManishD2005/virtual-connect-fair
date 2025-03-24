
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from '@/lib/supabase';
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.start_date);
  const isPastEvent = eventDate < new Date();
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
        <Calendar className="w-12 h-12 text-primary/60" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm">
            {format(new Date(event.start_date), "MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm">
            {format(new Date(event.start_date), "h:mm a")} - {format(new Date(event.end_date), "h:mm a")}
          </span>
        </div>
        {event.location && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-sm">{event.location}</span>
          </div>
        )}
        <p className="text-sm line-clamp-3 text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isPastEvent ? "outline" : "default"} 
          className="w-full"
          disabled={isPastEvent}
        >
          {isPastEvent ? "View Details" : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
