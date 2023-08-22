function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
    function checkCookieExists() {
  // Get all cookies
  const cookies = document.cookie.split(";");
  
  // Loop through all cookies
  for (const cookie of cookies) {
    // Split the cookie into name and value
    const [name, value] = cookie.split("=");
  
    // If the cookie name matches cookie_consent, return true
    if (name === 'cookie_consent') {
      return true;
    }
  }
  
  // If the cookie doesn't exist, return false
  return false;
  }
  
  
  function cookieConsent() {
    if(!checkCookieExists()) {
    var cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'block';
    } else {
      cookieBanner.style.display = 'none';
    // loadGoogleAnalytics();
    }
  }
  
  function acceptCookies() {
    setCookie('cookie_consent',true, 365);
    var cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'none';
    loadGoogleAnalytics();
  }
  
  
  function rejectCookies() {
    setCookie('cookie_consent',true, 365);
    var cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'none';
  }
  
    function loadGoogleAnalytics() {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KF6WGSG');
  
  }
  
  
  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
  });
  
  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reject-cookies').addEventListener('click', rejectCookies);
  });
  
  window.onload = cookieConsent;