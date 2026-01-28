import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import TopChart from './TopChart';
import Widget from './Widget';
import TrendingSection from './TrendingSection';
import NewsSection from './NewsSection';
import Toast from './Toast';

const HomePage = () => {
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  // Show toast only when navigating from successful login
  useEffect(() => {
    const state = location.state as { showLoginToast?: boolean } | null;
    if (state?.showLoginToast) {
      // Small delay to ensure page is rendered first
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 500);
      // Clear the navigation state to prevent toast showing again on refresh
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Welcome Toast */}
      <Toast
        show={showToast}
        message="You're back in the game"
        duration={3000}
        onClose={() => setShowToast(false)}
      />

      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Top Chart Section */}
          <TopChart />

          {/* Widget Section */}
          <Widget />

          {/* Trending Section */}
          <TrendingSection />

          {/* News Section */}
          <NewsSection />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
