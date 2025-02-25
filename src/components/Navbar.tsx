import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, BookOpen, GraduationCap, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/summary', label: 'Summary', icon: BookOpen },
    { path: '/quiz', label: 'Quiz', icon: GraduationCap },
    { path: '/roadmap', label: 'My Roadmap', icon: Map },
  ];

  return (
    <nav className="backdrop-blur-md bg-gray-900/60 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              EduAI (By Team7)
            </span>
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium transition-colors hover:text-purple-400',
                  location.pathname === path ? 'text-purple-500' : 'text-gray-300'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;