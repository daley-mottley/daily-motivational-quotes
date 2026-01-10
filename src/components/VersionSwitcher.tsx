
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book, Quote } from 'lucide-react';

const versionIcons = {
  quotes: <Quote className="h-4 w-4 text-blue-500" />,
  psalms: <Book className="h-4 w-4 text-yellow-600" />,
};

export const VersionSwitcher = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto border-0 focus:ring-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
        {value ? versionIcons[value] : <SelectValue placeholder="Select version" />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="quotes">
          <div className="flex items-center gap-2">
            {versionIcons.quotes}
            <span>Quotes</span>
          </div>
        </SelectItem>
        <SelectItem value="psalms">
          <div className="flex items-center gap-2">
            {versionIcons.psalms}
            <span>Psalms</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
