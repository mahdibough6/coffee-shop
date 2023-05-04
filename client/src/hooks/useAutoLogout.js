import { useEffect, useRef } from 'react';
import usePosAuthStore from '../store/posAuthStore';
export const useAutoLogout = (navigate, duration = 15) => {
  const {logout} = usePosAuthStore();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      logout();
      localStorage.removeItem('posJwt')
      navigate('pos-login'); // Add this line to navigate to the pos-login route
    }, duration * 60 * 1000); // Convert duration to milliseconds
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [logout, duration]);
};
