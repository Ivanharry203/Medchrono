document.getElementById('loginForm').addEventListener('submit', function(event) {
  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  
  if (!username || !password) {
    alert('Semua field wajib diisi!');
    event.preventDefault();
  }
});
