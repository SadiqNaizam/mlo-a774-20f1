import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">Auth Portal</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          {/* These links point to placeholder routes. Ensure these routes are defined in App.tsx or handled appropriately. */}
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          {/* You can add more links here, e.g., Contact, About */}
        </nav>
        <div className="text-center md:text-right">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Auth Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;