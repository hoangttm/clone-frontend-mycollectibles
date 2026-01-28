import type { FC } from "react";
import {
  HomeIcon,
  SearchIcon,
  CompassIcon,
  GlobeIcon,
  InboxIcon,
  GearIcon,
  BellIcon,
  BookmarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingIcon,
  NewspaperIcon,
} from "./Icons";

interface IconProps {
  className?: string;
  size?: number;
}

// Icon mapping helper
export const iconMap: Record<string, FC<IconProps>> = {
  home: HomeIcon,
  search: SearchIcon,
  compass: CompassIcon,
  globe: GlobeIcon,
  inbox: InboxIcon,
  gear: GearIcon,
  bell: BellIcon,
  bookmark: BookmarkIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  trending: TrendingIcon,
  newspaper: NewspaperIcon,
};

export const getIcon = (name: string): FC<IconProps> | null => {
  return iconMap[name] || null;
};
