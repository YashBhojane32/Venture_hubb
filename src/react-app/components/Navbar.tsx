import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Compass } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Packages', path: '/packages' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Work With Us', path: '/work-with-us' },
  { name: 'My Bookings', path: '/my-bookings' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  // ✅ GET USER
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg =
    scrolled || !isHome
      ? 'bg-white/95 backdrop-blur-md shadow-sm'
      : 'bg-transparent';

  const textColor =
    scrolled || !isHome ? 'text-foreground' : 'text-white';

  const logoColor =
    scrolled || !isHome ? 'text-forest' : 'text-white';

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-adventure group-hover:scale-110 transition">
              <Compass className="h-6 w-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className={`text-xl font-bold ${logoColor}`}>
                Venture Hub
              </span>
              <span className={`text-[10px] uppercase tracking-widest ${
                scrolled || !isHome ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                Explore the Unseen
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  location.pathname === link.path
                    ? 'font-semibold text-sunset'
                    : `${textColor} opacity-80 hover:opacity-100`
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ USER SECTION */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm font-medium">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="ml-4 bg-sunset text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${textColor}`}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-xl">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block p-3 rounded-lg hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}

            {/* MOBILE USER */}
            {user ? (
              <>
                <p className="text-sm mt-3">Hi, {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button className="w-full bg-sunset text-white mt-3">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}