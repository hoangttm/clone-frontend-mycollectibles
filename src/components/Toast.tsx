import { useEffect, useRef } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
  show: boolean;
}

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="text-white"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M8 12L11 15L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Toast = ({ message, duration = 3000, onClose, show }: ToastProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (show && onClose) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Auto-hide after duration
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="flex items-center gap-3 bg-[#00AB56] text-white px-6 py-4 rounded-xl shadow-lg">
        <CheckIcon />
        <span className="text-base font-medium whitespace-nowrap">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
