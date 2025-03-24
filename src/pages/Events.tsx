
import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import EventCard from '@/components/events/EventCard';

const Events = () => {
  const { data: events, isLoading } = useEvents();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  // Filter events based on the selected tab
  const filteredEvents = events?.filter(event => {
    const eventDate = new Date(event.start_date);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return eventDate >= today;
    } else if (filter === 'past') {
      return eventDate < today;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-primary mb-4">Virtual Events</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our virtual networking events, career fairs, and workshops to connect with 
              industry professionals and discover new opportunities.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilter('all')}>All Events</TabsTrigger>
                <TabsTrigger value="upcoming" onClick={() => setFilter('upcoming')}>Upcoming</TabsTrigger>
                <TabsTrigger value="past" onClick={() => setFilter('past')}>Past Events</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading events...</p>
                </div>
              ) : filteredEvents && filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No events found</h3>
                  <p className="text-muted-foreground">Check back later for upcoming events.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading events...</p>
                </div>
              ) : filteredEvents && filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">Check back later for upcoming events.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading events...</p>
                </div>
              ) : filteredEvents && filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No past events</h3>
                  <p className="text-muted-foreground">Check back later for past events.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Separator className="my-16" />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-primary mb-4">Featured Event</h2>
              <p className="text-muted-foreground">Don't miss our upcoming career fair!</p>
            </div>

            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-primary/60" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Virtual Career Fair 2024</CardTitle>
                <CardDescription>Connect with top employers from around the world</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">July 15-16, 2024</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Virtual Event</p>
                    <p className="text-sm text-muted-foreground">Join from anywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">50+ Companies</p>
                    <p className="text-sm text-muted-foreground">Featuring top employers from tech, finance, healthcare and more</p>
                  </div>
                </div>
                <p className="pt-2">
                  Join our flagship virtual career fair and connect with recruiters and hiring managers from leading companies. 
                  Explore job opportunities, attend workshops, and network with industry professionals.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Register Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
