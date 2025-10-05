import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivitySelectorProps {
  activity: string;
  setActivity: (value: string) => void;
}

const ActivitySelector = ({ activity, setActivity }: ActivitySelectorProps) => {
  return (
    <div className="w-full max-w-sm">
      <label className="block text-gray-300 mb-2 text-sm font-medium">
        Select Activity
      </label>
      <Select value={activity} onValueChange={setActivity}>
        <SelectTrigger className="bg-zinc-900 border-gray-700 text-white">
          <SelectValue placeholder="Choose an activity" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white border-gray-700">
          <SelectItem value="outdoor">Outdoor Sports</SelectItem>
          <SelectItem value="farming">Farming</SelectItem>
          <SelectItem value="commute">Daily Commute</SelectItem>
          <SelectItem value="construction">Construction Work</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActivitySelector;
