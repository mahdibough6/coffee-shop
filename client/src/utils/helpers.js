
const SECRET_KEY = 'your-secret-key'; // Replace this with your actual secret key

export function checkAndVerifyJwtToken() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken) {
    console.log('jwtToken found in local storage');
  } else {
    console.log('No jwtToken found in local storage');
  }

}

export function signOut() {
    console.log('Signed out');
    localStorage.removeItem('jwtToken');
}