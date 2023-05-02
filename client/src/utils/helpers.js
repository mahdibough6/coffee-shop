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
export const summarizeProducts = (productList) => {
  const productSummary = {};

  productList.forEach((productItem) => {
    if (productSummary.hasOwnProperty(productItem.id)) {
      // If the product already exists, increase its quantity and total price
      productSummary[productItem.id].qte += 1;
      productSummary[productItem.id].price += productItem.price;
    } else {
      // If the product doesn't exist, add it with an initial quantity of 1 and the initial price
      productSummary[productItem.id] = {
        ...productItem,
        qte: 1,
        totalPrice: productItem.price,
      };
    }
  });

  // Convert the productSummary object to an array of objects
  return Object.values(productSummary);
};
let logoutTimer;


export function setAutoLogoutTimer(expirationTime) {
  const navigate = useNavigate();
  // Clear any existing timer.
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }

  // Set a new timer to automatically log out the user when the token expires.
  logoutTimer = setTimeout(() => {
    clearSession();
    navigate('../employee-login')
  }, expirationTime * 1000);
}
export function calculateTotalPrice(products) {
  let totalPrice = 0;

  for (const product of products) {
    totalPrice += product.price;
  }

  return totalPrice;
}
