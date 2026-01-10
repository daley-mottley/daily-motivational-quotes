
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Cross, Quote } from 'lucide-react';

const versionIcons = {
  quotes: <Quote className="h-4 w-4" />,
  psalms: <Cross className="h-4 w-4" />,
};

export const VersionSwitcher = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto border-0 focus:ring-0 bg-transparent">
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
