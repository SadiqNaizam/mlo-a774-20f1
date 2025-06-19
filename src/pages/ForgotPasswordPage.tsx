import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Loader2, ShieldCheck } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/components/ui/use-toast"; // For shadcn toasts
import { toast as sonnerToast } from "sonner"; // For sonner toasts

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();
  const { toast: shadcnUiToast } = useToast(); // shadcn/ui toast

  console.log('ForgotPasswordPage loaded');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setServerMessage(null);
    console.log('Forgot password form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success response
    // In a real app, you would check if the email exists in your backend.
    // For this example, we'll always show a generic success message.
    const successMessage = "If an account with that email exists, a password reset link has been sent. Please check your inbox (and spam folder).";
    setServerMessage({ type: 'success', message: successMessage });
    
    // Show a sonner toast for immediate feedback
    sonnerToast.success("Request Sent", {
      description: "Password reset instructions have been sent to your email if it's registered.",
    });

    // Optionally, clear the form or redirect
    // form.reset(); 
    // setTimeout(() => navigate('/'), 5000); // Redirect to login after 5 seconds

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Forgot Your Password?"
          description="No worries! Enter your email address below and we'll send you a link to reset your password."
          logo={<ShieldCheck className="h-12 w-12 text-primary" />}
          footer={
            <p className="text-sm text-center text-muted-foreground">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline">
                Back to Login
              </Link>
            </p>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serverMessage && (
                <Alert variant={serverMessage.type === 'success' ? 'default' : 'destructive'}>
                  <AlertTitle>{serverMessage.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
                  <AlertDescription>{serverMessage.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Send Reset Link
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;