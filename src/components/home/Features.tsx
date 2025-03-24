
import { Briefcase, Users, Calendar, MessageSquare, Award, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Briefcase />,
      title: 'Virtual Booths',
      description: 'Customizable virtual booths for employers to showcase their brand and job opportunities.',
    },
    {
      icon: <Users />,
      title: 'Networking',
      description: 'Connect with professionals and recruiters through our virtual networking spaces.',
    },
    {
      icon: <Calendar />,
      title: 'Events & Webinars',
      description: 'Attend live presentations, webinars, and Q&A sessions with industry leaders.',
    },
    {
      icon: <MessageSquare />,
      title: 'Direct Messaging',
      description: 'Engage in real-time conversations with recruiters and potential employers.',
    },
    {
      icon: <Award />,
      title: 'Professional Profiles',
      description: 'Create detailed professional profiles and upload your resume for employers to review.',
    },
    {
      icon: <BarChart3 />,
      title: 'Analytics',
      description: 'Comprehensive analytics for employers to track engagement and measure success.',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
            Everything you need for a successful virtual career fair
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools and features to create engaging virtual career fair experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
