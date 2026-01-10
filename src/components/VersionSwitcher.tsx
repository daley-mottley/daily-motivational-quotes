
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book, Quote } from 'lucide-react';

export const VersionSwitcher = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto border-0 focus:ring-0">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="quotes">
          <div className="flex items-center gap-2">
            <Quote className="h-4 w-4" />
            <span>Quotes</span>
          </div>
        </SelectItem>
        <SelectItem value="psalms">
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Psalms</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
