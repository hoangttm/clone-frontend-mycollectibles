import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchIcon, BookmarkIcon, BellIcon } from "./Icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-6">
      {/* Logo */}
      <div className="w-48 shrink-0">
        <h1 className="text-xl font-bold text-gray-700">My collectibles</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 py-2">
          <SearchIcon size={24} className="text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search by..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm text-gray-500 bg-transparent outline-none placeholder:text-gray-500"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0 flex-1 justify-end">
        {/* Bookmark Button */}
        <button className="relative p-1.5 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
          <BookmarkIcon size={20} className="text-gray-800" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full min-w-4 text-center border border-white">
            10
          </span>
        </button>

        {/* Notification Button */}
        <button className="relative p-1.5 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
          <BellIcon size={20} className="text-gray-800" />
          <span className="absolute top-0.5 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-gray-300 border border-gray-100 overflow-hidden hover:ring-2 hover:ring-brand/30 transition-all">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
