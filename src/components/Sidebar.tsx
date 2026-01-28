import { Link, useLocation } from "react-router-dom";
import { iconMap } from "./iconUtils";
import { menuItems, bottomMenuItems } from "../data/mockData";
import type { MenuItem } from "../types";

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
}

const SidebarItem = ({ item, isActive }: SidebarItemProps) => {
  const IconComponent = iconMap[item.icon];

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
        isActive ? "bg-brand text-white" : "text-brand hover:bg-gray-50"
      }`}
    >
      {IconComponent && <IconComponent size={24} className="shrink-0" />}
      <span
        className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-600"}`}
      >
        {item.label}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-48 bg-white rounded-2xl p-4 flex flex-col justify-between h-screen">
      {/* Main Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* Bottom Menu */}
      <nav className="flex flex-col gap-2">
        {bottomMenuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
