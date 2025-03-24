
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SignUpForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, isLoading } = useAuth();
  
  const defaultRole = searchParams.get('role') || 'jobseeker';
  const [role, setRole] = useState<'jobseeker' | 'employer'>(defaultRole as 'jobseeker' | 'employer');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    jobTitle: '',
    industry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: 'Passwords do not match',
          description: 'Please ensure both passwords match.',
          variant: 'destructive',
        });
        return;
      }
      
      setStep(2);
    } else {
      try {
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: role,
          jobTitle: formData.jobTitle,
          industry: formData.industry,
          companyName: role === 'employer' ? formData.companyName : undefined,
        });
        
        navigate('/profile');
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-medium mb-2">
                  Create your account
                </h2>
                <p className="text-muted-foreground">
                  Join VirtualConnect to access virtual career fairs
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-2 grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                    role === 'jobseeker'
                      ? 'bg-white shadow-sm border border-gray-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      role === 'jobseeker' ? 'bg-primary/10 text-primary' : 'bg-gray-200'
                    }`}>
                      <User size={20} />
                    </div>
                    <div className="font-medium text-sm">Job Seeker</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                    role === 'employer'
                      ? 'bg-white shadow-sm border border-gray-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      role === 'employer' ? 'bg-primary/10 text-primary' : 'bg-gray-200'
                    }`}>
                      <Briefcase size={20} />
                    </div>
                    <div className="font-medium text-sm">Employer</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                  <Check size={16} />
                </div>
                <div className="font-medium">Account Information Saved</div>
              </div>
              <div className="text-center">
                <h2 className="font-display text-2xl font-medium mb-2">
                  Complete your profile
                </h2>
                <p className="text-muted-foreground">
                  {role === 'jobseeker'
                    ? 'Add your professional details to get noticed by employers'
                    : 'Add your company details to start recruiting talent'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {role === 'employer' ? (
                <>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                      Your Job Title
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      required
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                    Current/Desired Job Title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}

              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select an industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {role === 'jobseeker' && (
                <div className="pt-2">
                  <label className="block text-sm font-medium mb-3">
                    Resume/CV
                  </label>
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
                        Drag and drop your file here, or
                        <span className="text-primary font-medium ml-1">browse</span>
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
              )}
            </div>

            <div className="mt-8 flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Complete Setup'}
                <Check size={18} />
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
