
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-16 md:p-16 relative">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
              <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/20"></div>
              <div className="absolute top-0 bottom-0 right-0 w-px bg-white/20"></div>
              <div className="grid grid-cols-3 h-full">
                <div className="border-r border-white/20"></div>
                <div className="border-r border-white/20"></div>
              </div>
              <div className="grid grid-rows-3 h-full">
                <div className="border-b border-white/20"></div>
                <div className="border-b border-white/20"></div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-white font-medium mb-6">
                  Ready to transform your recruitment or job search experience?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Join thousands of employers and job seekers who are connecting through our virtual career fair platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/auth?type=register&role=employer"
                    className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-all"
                  >
                    For Employers
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link
                    to="/auth?type=register&role=jobseeker"
                    className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-400 transition-all"
                  >
                    For Job Seekers
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <Stat value="10,000+" label="Active Users" />
                  <Stat value="500+" label="Companies" />
                  <Stat value="200+" label="Events Hosted" />
                  <Stat value="75%" label="Hiring Success" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type StatProps = {
  value: string;
  label: string;
};

const Stat = ({ value, label }: StatProps) => {
  return (
    <div className="text-center p-4">
      <div className="font-display text-2xl md:text-3xl font-medium text-white mb-1">{value}</div>
      <div className="text-white/70 text-sm">{label}</div>
    </div>
  );
};

export default CallToAction;
