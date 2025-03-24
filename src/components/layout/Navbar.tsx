
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 ${
        isScrolled
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight"
          >
            VirtualConnect
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Link
              to="/auth?type=login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth?type=register"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="animate-fade-in" />
          ) : (
            <Menu size={24} className="animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md animate-fade-in">
          <div className="px-6 py-5 space-y-3">
            <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
            <div className="pt-3 flex flex-col space-y-3">
              <Link
                to="/auth?type=login"
                className="text-sm font-medium hover:text-primary transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/auth?type=register"
                className="text-sm font-medium bg-primary text-white px-3 py-2 rounded-full hover:bg-primary/90 transition-all text-center"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link
        to="/booths"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Explore Booths
      </Link>
      <Link
        to="/events"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Events
      </Link>
      <div className="relative group">
        <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
          <span>Resources</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
          <Link
            to="/resources/jobseekers"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            For Job Seekers
          </Link>
          <Link
            to="/resources/employers"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            For Employers
          </Link>
          <Link
            to="/resources/organizers"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            For Event Organizers
          </Link>
        </div>
      </div>
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link
        to="/booths"
        className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
        onClick={closeMenu}
      >
        Explore Booths
      </Link>
      <Link
        to="/events"
        className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
        onClick={closeMenu}
      >
        Events
      </Link>
      <div className="block px-3 py-2 text-base font-medium">
        <div className="font-medium mb-1">Resources</div>
        <div className="pl-3 border-l-2 border-gray-200 space-y-1">
          <Link
            to="/resources/jobseekers"
            className="block py-1 text-sm text-gray-600 hover:text-primary"
            onClick={closeMenu}
          >
            For Job Seekers
          </Link>
          <Link
            to="/resources/employers"
            className="block py-1 text-sm text-gray-600 hover:text-primary"
            onClick={closeMenu}
          >
            For Employers
          </Link>
          <Link
            to="/resources/organizers"
            className="block py-1 text-sm text-gray-600 hover:text-primary"
            onClick={closeMenu}
          >
            For Event Organizers
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
