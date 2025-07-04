
import React from 'react';
import { Quote } from '../data/quotes';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';

interface SocialShareButtonsProps {
  quote: Quote;
  className?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ quote, className }) => {
  const shareText = `"${quote.text}" - ${quote.author}`;
  const shareUrl = window.location.href;
  const hashtags = 'motivation,inspiration,quotes,dailyinspiration';

  const shareOptions = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
      action: () => {
        // Instagram doesn't support direct URL sharing, so we copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n\n#${hashtags.replace(/,/g, ' #')}`);
        alert('Quote copied to clipboard! You can now paste it on Instagram.');
      }
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
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => {
        // YouTube doesn't have direct quote sharing, so we copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n\nCheck out this daily inspiration app: ${shareUrl}`);
        alert('Quote copied to clipboard! You can share it in YouTube comments or community posts.');
      }
    }
  ];

  return (
    <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
      <div className="w-full text-center mb-3">
        <p className="text-sm text-gray-600 font-medium">Share this inspiration</p>
      </div>
      {shareOptions.map((option) => (
        <Button
          key={option.name}
          onClick={option.action}
          className={`${option.color} text-white border-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 min-w-[100px] justify-center`}
          size="sm"
        >
          <option.icon className="h-4 w-4" />
          <span className="hidden sm:inline">{option.name}</span>
        </Button>
      ))}
    </div>
  );
};
