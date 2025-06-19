import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to show the error on
});

type ResetPasswordFormValues = z.infer<typeof formSchema>;

const ResetPasswordPage: React.FC = () => {
  console.log('ResetPasswordPage loaded');
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);
    console.log('Reset password form submitted with:', data.password);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would call your API here to reset the password.
    // For this example, we'll simulate success.
    // On failure, you might setFormError("API error message"); toast.error(...)
    
    // Simulated success:
    setFormSuccess("Your password has been successfully reset. Redirecting to login...");
    toast.success("Password Reset Successful!", {
      description: "You can now log in with your new password.",
    });
    
    setTimeout(() => {
      navigate('/'); // Navigate to LoginPage (path "/" from App.tsx)
    }, 2000);

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-muted/40">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Reset Your Password"
          description="Enter your new password below. Make sure it's strong and memorable."
          logo={<ShieldCheck className="h-12 w-12 text-primary" />}
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formError && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              {formSuccess && (
                 <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300">
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{formSuccess}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Link to="/" className="underline text-primary hover:text-primary/80"> {/* Path "/" for LoginPage from App.tsx */}
              Login here
            </Link>
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;