var cookieBanner = document.getElementById('cookie-banner');

cookieBanner.classList.add("cookies-infobar");
cookieBanner.style.display = "none";
cookieBanner.innerHTML = '<noscript>' +
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KF6WGSG" height = "0" width = "0" style = "display:none; visibility:hidden;"></iframe>' +
        '</noscript>' +
        '<div class = "container">' +
        '<p><strong>Cookies on the PfG Wellbeing Framework webpage</strong></p>' +
        '<p>This prototype web page places small amounts of information known as cookies on your device. <a href = "https://www.nisra.gov.uk/cookies" class = "cookiesbarlink" target = "_blank" rel = "noopener noreferrer"><u>Find out more about cookies</u></a>.</p>' +
        '<button id = "accept-cookies" class = "cookies-infobar_btn">Accept cookies</button>' +
        '<button id = "reject-cookies" class = "cookies-infobar_btn_reject">Reject cookies</button>' +
        '</div>' +
        '</div>';

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
  
function loadGoogleAnalytics() {

    (function(w, d, s, l, i){
      w[l] = w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),
                  event:'gtm.js'});
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l !='dataLayer'?'&l='+l: '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j,f);
  })
  (window,document,'script','dataLayer','GTM-KF6WGSG');

}

document.getElementById('accept-cookies').onclick = function() {
  setCookie('cookie_consent', true, 365);
  cookieBanner.style.display = 'none';
  loadGoogleAnalytics();
}

document.getElementById('reject-cookies').onclick = function() {
  setCookie('cookie_consent', true, 365);
  cookieBanner.style.display = 'none';
}

function showCookieBanner() {
  if(!checkCookieExists()) {
    cookieBanner.style.display = 'block';
  } else {
    cookieBanner.style.display = 'none';
  }
};