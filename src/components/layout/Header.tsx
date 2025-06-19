import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck, UserCircle, LogOut, LogIn, UserPlus, Home } from 'lucide-react';

const Header: React.FC = () => {
  // In a real application, this would come from a global state (Context, Redux, Zustand, etc.)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  console.log('Header loaded');

  useEffect(() => {
    // Simulate checking auth state, e.g., from localStorage or an API call
    // For demonstration, we can toggle this to see different states.
    // const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // setIsAuthenticated(loggedIn);
    console.log('Current auth state (simulated):', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log('User logging out...');
    // Simulate logout: clear auth state, redirect to login
    // localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login page
  };

  // Placeholder: In a real app, you might set this after successful login
  // const handleLoginSuccess = () => {
  //   localStorage.setItem('isLoggedIn', 'true');
  //   setIsAuthenticated(true);
  //   navigate('/dashboard');
  // };


  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground ${
      isActive ? 'bg-accent text-accent-foreground font-semibold' : 'text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">Auth Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          ) : (
            <>
              {/* No primary nav links for unauthenticated users beyond login/signup shown in actions */}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                {/* Add other authenticated links here, e.g., Profile, Settings */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/registration">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/"}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span className="font-bold">Auth Portal</span>
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <NavLink to="/dashboard" className={mobileNavLinkClasses}>
                        Dashboard
                      </NavLink>
                      <Button onClick={handleLogout} variant="ghost" className="w-full justify-start px-3 py-2 text-base font-medium">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <NavLink to="/" className={mobileNavLinkClasses}>
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </NavLink>
                      <NavLink to="/registration" className={mobileNavLinkClasses}>
                        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                      </NavLink>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;