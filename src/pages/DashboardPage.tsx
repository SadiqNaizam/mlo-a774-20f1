import React from 'react';
import { useNavigate }
from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ShieldAlert } from 'lucide-react';

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens/state here
    console.log('User logging out from DashboardPage...');
    navigate('/'); // Navigate to LoginPage as per App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <ShieldAlert size={32} />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to Your Dashboard</CardTitle>
            <CardDescription className="text-md">
              You have successfully logged in. This is your protected application area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center">
              From here, you would typically access user-specific content, application features, or account management options.
            </p>
            <div>
              <label htmlFor="userNotes" className="block text-sm font-medium text-foreground mb-1">
                Your Notes (Placeholder):
              </label>
              <Textarea
                id="userNotes"
                placeholder="Feel free to jot down some notes or interact with dashboard widgets (if this were a full app)..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button onClick={handleLogout} size="lg" className="w-full max-w-xs">
              Logout
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;