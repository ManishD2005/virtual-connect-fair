
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Briefcase, BookOpen, Image, FileText, Download } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center border border-gray-200">
                      <User size={40} className="text-gray-400" />
                    </div>
                    <h2 className="font-display text-xl font-medium">John Doe</h2>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                    <div className="mt-4 w-full">
                      <Button variant="outline" fullWidth>
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'profile'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'resume'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('resume')}
                    >
                      <FileText size={18} className="mr-3" />
                      Resume
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'applications'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('applications')}
                    >
                      <Briefcase size={18} className="mr-3" />
                      Applications
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'events'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('events')}
                    >
                      <Calendar size={18} className="mr-3" />
                      Events
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="space-y-6">
              {activeTab === 'profile' && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 text-muted-foreground mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-muted-foreground">john.doe@example.com</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 text-muted-foreground mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-muted-foreground">(123) 456-7890</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 mr-3" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div className="text-muted-foreground">San Francisco, CA</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Experienced software engineer with a passion for creating elegant, efficient solutions to complex problems. Specializing in web development with a focus on frontend technologies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'React', 'TypeScript', 'Node.js', 'HTML/CSS', 'GraphQL', 'Git', 'UI/UX Design'].map((skill) => (
                          <div key={skill} className="bg-secondary px-3 py-1 rounded-full text-sm">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="font-medium">University of California, Berkeley</div>
                            <div className="text-sm text-muted-foreground">2014 - 2018</div>
                          </div>
                          <div className="text-muted-foreground">Bachelor of Science in Computer Science</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === 'resume' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resume & Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mr-3">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-medium">John_Doe_Resume.pdf</div>
                          <div className="text-xs text-muted-foreground">Uploaded on May 15, 2023</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </div>

                    <div className="pt-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Upload additional documents
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, DOCX (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.doc"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'applications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Briefcase size={24} className="text-gray-400" />
                      </div>
                      <h3 className="font-medium mb-2">No applications yet</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        You haven't applied to any positions yet. Browse available jobs to get started.
                      </p>
                      <Button>Browse Jobs</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'events' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Tech Career Expo 2023</div>
                            <div className="text-sm text-muted-foreground">June 15, 2023 • 10:00 AM - 4:00 PM</div>
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Registered
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Healthcare Innovation Summit</div>
                            <div className="text-sm text-muted-foreground">July 8, 2023 • 9:00 AM - 3:00 PM</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Add the missing Calendar component
const Calendar = ({ size, className }: { size: number; className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default Profile;
