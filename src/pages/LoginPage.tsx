import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import SocialLoginButton from '@/components/SocialLoginButton';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Lucide Icons
import { Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [socialLoading, setSocialLoading] = useState<string | null>(null); // For individual social button loading

  const navigate = useNavigate();

  useEffect(() => {
    console.log('LoginPage loaded');
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Login attempt with:', { email, password, rememberMe });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Dummy validation
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful');
      // In a real app, set auth token, update global state, etc.
      navigate('/dashboard'); // Navigate to dashboard on success
    } else {
      setError('Invalid email or password. Please try again.');
      console.log('Login failed');
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    // setSocialLoading(provider);
    console.log(`Attempting login with ${provider}`);
    // Simulate API call for social login
    setTimeout(() => {
      // Mock success or failure
      // navigate('/dashboard');
      // setSocialLoading(null);
      alert(`${provider} login is not implemented yet.`);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Login to Your Account"
          description="Enter your credentials below to access your dashboard."
          logo={<ShieldCheck className="h-12 w-12 text-primary" />}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password" // Path from App.tsx
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <SocialLoginButton
                provider="google"
                onClick={() => handleSocialLogin('Google')}
                // isLoading={socialLoading === 'google'} // Uncomment if using individual social loading
                disabled={isLoading}
              />
              <SocialLoginButton
                provider="github"
                onClick={() => handleSocialLogin('GitHub')}
                // isLoading={socialLoading === 'github'} // Uncomment if using individual social loading
                disabled={isLoading}
              />
            </div>
            
            <p className="pt-2 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/registration" // Path from App.tsx
                className="font-semibold text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;