
export function signOut() {
    console.log('Signed out');
    localStorage.removeItem('jwtToken');
}