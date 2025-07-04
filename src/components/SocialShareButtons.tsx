
import React, { useState } from 'react';
import { Quote } from '../data/quotes';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  quote: Quote;
  className?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ quote, className }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareText = `"${quote.text}" - ${quote.author}`;
  const shareUrl = window.location.href;
  const hashtags = 'motivation,inspiration,quotes,dailyinspiration';

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n#${hashtags.replace(/,/g, ' #')}`);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Quote copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
      action: handleCopyToClipboard
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-800',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&hashtags=${hashtags}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    }
  ];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Main share buttons */}
      <div className="flex justify-center gap-2">
        {shareOptions.map((option) => (
          <Button
            key={option.name}
            onClick={option.action}
            className={`${option.color} text-white border-0 px-3 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center min-w-[44px] h-[44px] shadow-lg hover:shadow-xl active:scale-95`}
            size="sm"
          >
            <option.icon className="h-5 w-5" />
          </Button>
        ))}
        
        {/* Copy button */}
        <Button
          onClick={handleCopyToClipboard}
          className="bg-gray-600 hover:bg-gray-700 text-white border-0 px-3 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center min-w-[44px] h-[44px] shadow-lg hover:shadow-xl active:scale-95"
          size="sm"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </Button>
      </div>

      {/* Share indicator */}
      <div className="flex items-center justify-center gap-2 text-gray-500">
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">Share this inspiration</span>
      </div>
    </div>
  );
};
