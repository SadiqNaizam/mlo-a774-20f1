import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Chrome, LogIn, Loader2 } from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'google' | 'github' | string; // Allow common providers or a generic string
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode; // Optional: To override default "Continue with [Provider]" text
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  className = '',
  isLoading = false,
  children,
}) => {
  console.log(`SocialLoginButton loaded for provider: ${provider}`);

  let IconComponent: React.ElementType = LogIn; // Default icon
  let buttonTextContent: React.ReactNode;
  let providerSpecificStyles = '';

  const providerKey = typeof provider === 'string' ? provider.toLowerCase() : '';

  switch (providerKey) {
    case 'google':
      IconComponent = Chrome; // Using Chrome icon as a recognizable proxy for Google
      buttonTextContent = children || "Continue with Google";
      // Style mimicking common Google OAuth buttons: white background, dark text, subtle border
      providerSpecificStyles = "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
      break;
    case 'github':
      IconComponent = Github;
      buttonTextContent = children || "Continue with GitHub";
      // Style mimicking common GitHub OAuth buttons: dark background, white text
      providerSpecificStyles = "bg-gray-900 hover:bg-gray-800 text-white border-gray-900 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900 dark:border-gray-200";
      break;
    default:
      // Generic provider styling (similar to Google's light style)
      const capitalizedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);
      buttonTextContent = children || `Continue with ${capitalizedProvider}`;
      providerSpecificStyles = "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
      break;
  }

  return (
    <Button
      variant="outline" // Base variant; colors and borders are largely overridden by providerSpecificStyles
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 ${providerSpecificStyles} ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <IconComponent className="h-5 w-5" />
      )}
      {buttonTextContent}
    </Button>
  );
};

export default SocialLoginButton;