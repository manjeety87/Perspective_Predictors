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
    <div className="">
      <label className="block  mb-2 text-md">Select Activity</label>
      <Select value={activity} onValueChange={setActivity}>
        <SelectTrigger className="w-full min-w-sm text-white">
          <SelectValue placeholder="Choose an activity" />
        </SelectTrigger>
        <SelectContent className="text-white border-gray-700">
          <SelectItem value="golfing">Golfing</SelectItem>
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
