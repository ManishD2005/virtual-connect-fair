
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useJobById } from '@/hooks/useJobs';
import { useApplyForJob } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, MapPin, Clock, Building, ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading: jobLoading } = useJobById(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const applyMutation = useApplyForJob();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for this position",
        variant: "destructive",
      });
      navigate('/auth?type=login');
      return;
    }
    
    if (!id) return;
    
    try {
      await applyMutation.mutateAsync({
        jobPositionId: id,
        coverLetter,
        resumeFile
      });
      
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      
      // Navigate to a confirmation page or back to jobs
      navigate('/jobs');
    } catch (error) {
      console.error('Error applying for job:', error);
      toast({
        title: "Application failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!id) {
    navigate('/jobs');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 flex items-center"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Job Listings
          </Button>
          
          {jobLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : job ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary shrink-0" />
                        <span>{job.employment_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-primary shrink-0" />
                        <span>Company: {job.booth_name || 'Not specified'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-line">{job.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for this Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user ? (
                      <form onSubmit={handleApply} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Cover Letter
                          </label>
                          <Textarea
                            placeholder="Tell us why you're a good fit for this position..."
                            className="resize-none"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Resume/CV
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {resumeFile ? (
                              <div>
                                <p className="text-sm font-medium">{resumeFile.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setResumeFile(null)}
                                  className="mt-2"
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                <div className="mt-2">
                                  <label className="cursor-pointer">
                                    <span className="text-sm text-gray-600">
                                      Drag and drop your file here, or 
                                      <span className="text-primary font-medium ml-1">browse</span>
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept=".pdf,.docx,.doc"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          setResumeFile(e.target.files[0]);
                                        }
                                      }}
                                    />
                                  </label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOCX (Max 5MB)
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={applyMutation.isPending}
                        >
                          {applyMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            'Submit Application'
                          )}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center p-4">
                        <p className="mb-4">You need to sign in to apply for this position.</p>
                        <Button 
                          onClick={() => navigate('/auth?type=login')}
                          className="w-full"
                        >
                          Sign In
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center p-12">
              <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The job position you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/jobs')}>
                View All Jobs
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
