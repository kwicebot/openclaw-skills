const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const statusText = document.getElementById('formStatus');
const toggleBtn = document.getElementById('togglePassword');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

toggleBtn.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  toggleBtn.textContent = isHidden ? 'Hide' : 'Show';
  toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

function clearErrors() {
  emailError.textContent = '';
  passwordError.textContent = '';
  statusText.textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (!email.value.trim()) {
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (!password.value) {
    passwordError.textContent = 'Password is required.';
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (!valid) return;

  statusText.textContent = 'Validation passed. Ready to send login request.';
});
