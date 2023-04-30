import { useNavigate } from "react-router-dom";
import UAParser from 'ua-parser-js';

export function isMobileDevice() {
  const userAgent = navigator.userAgent;
  const parser = new UAParser();
  const result = parser.setUA(userAgent).getResult();
  return result.device.type === 'mobile';
}

export function signOut() {
  const navigate = useNavigate();
    console.log('Signed out');
    localStorage.removeItem('jwt');
    navigate('../employee-login')
    
}