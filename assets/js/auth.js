(function(){
  const STORAGE_KEY = 'unisoft_auth_user';

  function getUser(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  }
  function setUser(user){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    updateNav();
    if (location.pathname.endsWith('login.html') || location.pathname.endsWith('signup.html')) {
      location.href = 'index.html';
    }
  }
  function clearUser(){
    localStorage.removeItem(STORAGE_KEY);
    updateNav();
  }

  function updateNav(){
    var user = getUser();
    var login = document.getElementById('nav-login');
    var cta = document.getElementById('nav-cta');
    var logout = document.getElementById('nav-logout');
    if (!login && !cta && !logout) return; // page may not have these
    if (user){
      if (login) login.style.display = 'none';
      if (cta) { cta.textContent = 'My Courses'; cta.href = 'courses.html'; }
      if (logout) logout.style.display = 'inline-flex';
    } else {
      if (login) login.style.display = 'inline-flex';
      if (cta) { cta.textContent = 'Sign up'; cta.href = 'signup.html'; }
      if (logout) logout.style.display = 'none';
    }
  }

  // Expose simple fake auth handlers for forms
  window.fakeAuthLogin = function(email){
    setUser({ email: email });
    alert('Signed in as ' + email);
  };
  window.fakeAuthSignup = function(user){
    setUser(user);
    alert('Welcome, ' + (user.username || user.email) + '!');
  };

  // Wire logout if present
  document.addEventListener('click', function(e){
    var target = e.target;
    if (target && target.id === 'nav-logout'){
      e.preventDefault();
      clearUser();
    }
  });

  // Initialize on load
  document.addEventListener('DOMContentLoaded', updateNav);
})();


