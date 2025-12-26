
import React, { useState } from 'react';
import { Quote } from '../data/quotes';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface SocialShareButtonsProps {
  quote: Quote;
  className?: string;
}

// PERFORMANCE OPTIMIZATION:
// Wrapped SocialShareButtons with React.memo to prevent unnecessary re-renders when its props
// have not changed. This is crucial for performance in a list, as it avoids re-rendering
// every share button component when new items are added to the list.
export const SocialShareButtons: React.FC<SocialShareButtonsProps> = React.memo(({ quote, className }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const shareText = `"${quote.text}" - ${quote.author}`;
  const shareUrl = window.location.href;
  const hashtags = 'motivation,inspiration,quotes,dailyinspiration';

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n#${hashtags.replace(/,/g, ' #')}`);
      setCopied(true);
      toast({
        title: t('buttons.linkCopied'),
        description: t('share.title'),
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
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1A95E0]', // Twitter Blue
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166AD5]', // Facebook Blue
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#095BAF]', // LinkedIn Blue
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    }
  ];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Share buttons */}
      <TooltipProvider>
        <div className="flex justify-center gap-3"> {/* Increased gap slightly */}
          {shareOptions.map((option) => (
            <Tooltip key={option.name}>
              <TooltipTrigger asChild>
                <Button
                  onClick={option.action}
                  aria-label={`Share on ${option.name}`}
                  className={`${option.color} text-white border-0 px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center min-w-[48px] h-[48px] shadow-lg hover:shadow-xl active:scale-95`} // Slightly larger buttons
                  size="icon" // Use icon size for consistent dimensions
                >
                  <option.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(`share.on${option.name}`)}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Copy button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopyToClipboard}
                aria-label={copied ? 'Copied to clipboard' : 'Copy quote to clipboard'}
                className="bg-gray-600 hover:bg-gray-700 text-white border-0 px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center min-w-[48px] h-[48px] shadow-lg hover:shadow-xl active:scale-95" // Match size and styling
                size="icon" // Use icon size
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? t('share.copied') : t('share.copy')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Share indicator */}
      <div className="flex items-center justify-center gap-2 text-gray-500">
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">{t('share.title')}</span>
      </div>
    </div>
  );
});
