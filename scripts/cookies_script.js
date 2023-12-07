var cookieBanner = document.getElementById('cookie-banner');

cookieBanner.classList.add("cookies-infobar");
cookieBanner.innerHTML = '<noscript>' +
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KF6WGSG" height = "0" width = "0" style = "display:none; visibility:hidden;"></iframe>' +
        '</noscript>' +
        '<div class = "container">' +
        '<p><strong>Cookies on the PfG Wellbeing Framework webpage</strong></p>' +
        '<p>This prototype web page places small amounts of information known as cookies on your device. <a href = "https://www.nisra.gov.uk/cookies" class = "cookiesbarlink" target = "_blank" rel = "noopener noreferrer">Find out more about cookies</a>.</p>' +
        '<button id = "accept-cookies" class = "cookies-infobar_btn">Accept cookies</button>' +
        '<button id = "reject-cookies" class = "cookies-infobar_btn_reject">Reject cookies</button>' +
        '</div>' +
        '</div>';
  
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

today = new Date();

document.getElementById('accept-cookies').onclick = function() {
  localStorage.setItem('cookie_answered', true);
  localStorage.setItem('cookie_date', today);
  cookieBanner.style.display = 'none';
  loadGoogleAnalytics();
}

document.getElementById('reject-cookies').onclick = function() {
  localStorage.setItem('cookie_answered', true);
  localStorage.setItem('cookie_date', today);
  cookieBanner.style.display = 'none';
}

function showCookieBanner() {

  diff = (today - new Date(localStorage.cookie_date)) / 1000 / 60 / 60 / 24;

  if (diff > 365) {
    localStorage.removeItem("cookie_answered");
    localStorage.removeItem("cookie_date");
  }

  if (!localStorage.cookie_answered) {
    cookieBanner.style.display = 'block';
  }
};

window.setInterval(function() {
  if (document.cookie == "") {
    localStorage.removeItem("cookie_answered");
    localStorage.removeItem("cookie_date");
  }
} , 100)