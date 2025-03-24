
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              Virtual Career Fair Platform
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
              Connect with opportunities in a{' '}
              <span className="text-gradient">virtual environment</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Join the next generation of virtual career fairs where employers and job seekers connect seamlessly, without geographical limitations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booths"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
              >
                Explore Booths
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/auth?type=register"
                className="inline-flex items-center justify-center bg-secondary text-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/70 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl opacity-30 animate-float"></div>
            <div className="relative glass-panel rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
                <div className="h-full w-full rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-24 h-24 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-100 rounded-full mx-auto mb-3"></div>
                    <div className="h-3 w-40 bg-gray-50 rounded-full mx-auto mb-6"></div>
                    <div className="flex justify-center space-x-2">
                      <div className="h-8 w-24 bg-blue-500 rounded-full"></div>
                      <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
