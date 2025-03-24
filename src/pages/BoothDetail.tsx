
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Users, Briefcase, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useBoothById } from '@/hooks/useBooths';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock job positions data
const jobPositions = [
  {
    id: '1',
    title: 'Frontend Developer',
    location: 'Remote',
    employmentType: 'Full-time',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
  },
  {
    id: '2',
    title: 'UX Designer',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    description: 'Join our design team to create amazing user experiences.',
  },
  {
    id: '3',
    title: 'Product Manager',
    location: 'New York, NY',
    employmentType: 'Full-time',
    description: 'Lead product development and strategy for our growing company.',
  },
];

// Mock company representatives data
const representatives = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Recruiting Manager',
    email: 'sarah@company.com',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Engineering Director',
    email: 'michael@company.com',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

// Mock company images for gallery
const companyImages = [
  { id: '1', src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72', alt: 'Office space 1' },
  { id: '2', src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094', alt: 'Office space 2' },
  { id: '3', src: 'https://images.unsplash.com/photo-1505409859467-3a796fd5798e', alt: 'Team building' },
  { id: '4', src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4', alt: 'Company event' },
];

const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: booth, isLoading, error } = useBoothById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading booth information...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !booth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 text-red-800 rounded-lg p-6 mb-4">
              <h2 className="font-medium text-lg mb-2">Error Loading Booth</h2>
              <p>Unable to load booth information. The booth may not exist or there was an error accessing the data.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/booths')}
              >
                Return to Booths
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="h-52 md:h-72 relative bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="absolute inset-0">
          <img
            src={booth.cover_image || 'https://via.placeholder.com/1920x400'}
            alt={`${booth.name} cover`}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>
      
      <main className="flex-grow -mt-16 pb-16 px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 flex items-center"
                onClick={() => navigate('/booths')}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to All Booths
              </Button>
              
              <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center p-2 border border-gray-100">
                  <img
                    src={booth.logo || 'https://via.placeholder.com/150'}
                    alt={`${booth.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h1 className="font-display text-3xl md:text-4xl font-medium mb-2">
                    {booth.name}
                  </h1>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1.5" />
                      {booth.location}
                    </div>
                    <div className="flex items-center">
                      <Globe size={14} className="mr-1.5" />
                      {booth.industry}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1.5" />
                      {booth.employee_count} employees
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                  <Button className="flex items-center gap-2">
                    <Mail size={16} />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Briefcase size={16} />
                    View Jobs
                  </Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="jobs">Open Positions</TabsTrigger>
                  <TabsTrigger value="team">Meet the Team</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-medium mb-4">About {booth.name}</h2>
                    <p className="text-muted-foreground mb-4">
                      {booth.description || 
                        `${booth.name} is a leading company in the ${booth.industry} industry. We're dedicated to innovation and excellence in everything we do.`}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                    <h3 className="text-xl font-medium mt-6 mb-3">Why Work With Us</h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
                      <li>Competitive salary and benefits</li>
                      <li>Remote-first work environment</li>
                      <li>Professional development opportunities</li>
                      <li>Collaborative and inclusive culture</li>
                      <li>Work on cutting-edge technology and products</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="jobs">
                  <h2 className="text-2xl font-medium mb-4">Open Positions</h2>
                  <div className="grid gap-4">
                    {jobPositions.map(job => (
                      <Card key={job.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <h3 className="text-xl font-medium mb-1">{job.title}</h3>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 mb-3 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1.5" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Briefcase size={14} className="mr-1.5" />
                                {job.employmentType}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">{job.description}</p>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="team">
                  <h2 className="text-2xl font-medium mb-4">Meet Our Team</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {representatives.map(rep => (
                      <Card key={rep.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                              <img 
                                src={rep.profileImage} 
                                alt={rep.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-lg mb-1">{rep.name}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{rep.position}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-2"
                            >
                              <Mail size={14} />
                              <span>{rep.email}</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery">
                  <h2 className="text-2xl font-medium mb-4">Company Gallery</h2>
                  <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                      {companyImages.map(image => (
                        <CarouselItem key={image.id}>
                          <div className="p-1">
                            <div className="aspect-video overflow-hidden rounded-xl">
                              <img 
                                src={image.src} 
                                alt={image.alt}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4">
                      <div className="relative flex items-center gap-2">
                        <CarouselPrevious className="relative static left-0" />
                        <CarouselNext className="relative static right-0" />
                      </div>
                    </div>
                  </Carousel>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoothDetail;
