// Function to save JWT token in local storage
export function saveAuthToken(token) {
  localStorage.setItem('authToken', token);
}

// Function to get JWT token from local storage
export function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Function to remove JWT token from local storage
export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function saveUserDetails(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserDetails() {
  return JSON.parse(localStorage.getItem('user'));
}

export function removeUserDetails() {
  localStorage.removeItem('user');
}