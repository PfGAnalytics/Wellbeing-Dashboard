var data;

window.onload = function () {
    getData();
    showCookieBanner();
}

async function getData() {

  try {
      const response = await fetch("data.json");
      const responseData = await response.json();
      data = responseData;
  } catch (error) {
      
  }

  // defining data driven values - called by class name (value within querySeletorAll() below) in html section tag
  const total_spend_elements = document.querySelectorAll('.total_spend_value');
  for (let i = 0; i < total_spend_elements.length; i++) {
    total_spend_elements[i].innerHTML = ['£' + data.overall.spend.toFixed(1).toLocaleString('en') + ' billion'];
  }
  const total_spend_pp_elements = document.querySelectorAll('.total_spend_pp_value');
  for (let i = 0; i < total_spend_pp_elements.length; i++) {
    total_spend_pp_elements[i].innerHTML = ['£' + data.overall.spend_pp.toLocaleString('en')];
  }
  const del_spend_elements = document.querySelectorAll('.del_spend_value');
  for (let i = 0; i < del_spend_elements.length; i++) {
    del_spend_elements[i].innerHTML = ['£' + data.del.spend.toFixed(1).toLocaleString('en') + ' billion'];
  }

  const del_spend_value_millions_elements = document.querySelectorAll('.del_spend_value_millions');
  for (let i = 0; i < del_spend_value_millions_elements.length; i++) {
    del_spend_value_millions_elements[i].innerHTML = ['£' + Math.abs(data.del.spend * 1000).toLocaleString('en') + ' million'];
  }

  const del_spend_value_full_elements = document.querySelectorAll('.del_spend_value_full');
  for (let i = 0; i < del_spend_value_full_elements.length; i++) {
    del_spend_value_full_elements[i].innerHTML = ['£' + Math.abs(data.del.spend * 1000000000).toLocaleString('en')];
  }

  const del_spend_pp_elements = document.querySelectorAll('.del_spend_pp_value');
  for (let i = 0; i < del_spend_pp_elements.length; i++) {
    del_spend_pp_elements[i].innerHTML = ['£' + data.del.spend_pp.toLocaleString('en')];
  }
  const ame_spend_elements = document.querySelectorAll('.ame_spend_value');
  for (let i = 0; i < ame_spend_elements.length; i++) {
    ame_spend_elements[i].innerHTML = ['£' + data.ame.spend.toFixed(1).toLocaleString('en') + ' billion'];
  }
  const ame_spend_pp_elements = document.querySelectorAll('.ame_spend_pp_value');
  for (let i = 0; i < ame_spend_pp_elements.length; i++) {
    ame_spend_pp_elements[i].innerHTML = ['£' + data.ame.spend_pp.toLocaleString('en')];
  }

  const population_elements = document.querySelectorAll('.population_value');
  for (let i = 0; i < population_elements.length; i++) {
    population_elements[i].innerHTML = [data.overall.population.toLocaleString('en')];
  }


  const current_year_elements = document.querySelectorAll('.current_year_value');
  for (let i = 0; i < current_year_elements.length; i++) {
    current_year_elements[i].innerHTML = Object.keys(data.overall.line_data).pop();
  }



  const ame_current_year_elements = document.querySelectorAll('.ame_current_year_value');
  for (let i = 0; i < ame_current_year_elements.length; i++) {
    ame_current_year_elements[i].innerHTML = ['£' + Object.values(data.ame.line_data).pop().toLocaleString() + ' million'];
  }
  const doh_current_year_elements = document.querySelectorAll('.doh_current_year_value');
  for (let i = 0; i < doh_current_year_elements.length; i++) {
    doh_current_year_elements[i].innerHTML = ['£' + Object.values(data.doh.line_data).pop().toLocaleString() + 'm'];
  }
  const dfc_current_year_elements = document.querySelectorAll('.dfc_current_year_value');
  for (let i = 0; i < dfc_current_year_elements.length; i++) {
    dfc_current_year_elements[i].innerHTML = ['£' + Object.values(data.dfc.line_data).pop().toLocaleString() + 'm'];
  }
  const de_current_year_elements = document.querySelectorAll('.de_current_year_value');
  for (let i = 0; i < de_current_year_elements.length; i++) {
    de_current_year_elements[i].innerHTML = ['£' + Object.values(data.de.line_data).pop().toLocaleString() + 'm'];
  }
  const dfi_current_year_elements = document.querySelectorAll('.dfi_current_year_value');
  for (let i = 0; i < dfi_current_year_elements.length; i++) {
    dfi_current_year_elements[i].innerHTML = ['£' + Object.values(data.dfi.line_data).pop().toLocaleString() + 'm'];
  }
  const doj_current_year_elements = document.querySelectorAll('.doj_current_year_value');
  for (let i = 0; i < doj_current_year_elements.length; i++) {
    doj_current_year_elements[i].innerHTML = ['£' + Object.values(data.doj.line_data).pop().toLocaleString() + 'm'];
  }
  const dfe_current_year_elements = document.querySelectorAll('.dfe_current_year_value');
  for (let i = 0; i < dfe_current_year_elements.length; i++) {
    dfe_current_year_elements[i].innerHTML = ['£' + Object.values(data.dfe.line_data).pop().toLocaleString() + 'm'];
  }
  const dof_current_year_elements = document.querySelectorAll('.dof_current_year_value');
  for (let i = 0; i < dof_current_year_elements.length; i++) {
    dof_current_year_elements[i].innerHTML = ['£' + Object.values(data.dof.line_data).pop().toLocaleString() + 'm'];
  }
  const daera_current_year_elements = document.querySelectorAll('.daera_current_year_value');
  for (let i = 0; i < daera_current_year_elements.length; i++) {
    daera_current_year_elements[i].innerHTML = ['£' + Object.values(data.daera.line_data).pop().toLocaleString() + 'm'];
  }
  const teo_current_year_elements = document.querySelectorAll('.teo_current_year_value');
  for (let i = 0; i < teo_current_year_elements.length; i++) {
    teo_current_year_elements[i].innerHTML = ['£' + Object.values(data.teo.line_data).pop().toLocaleString() + 'm'];
  }
  const other_current_year_elements = document.querySelectorAll('.other_current_year_value');
  for (let i = 0; i < other_current_year_elements.length; i++) {
    other_current_year_elements[i].innerHTML = ['£' + data.other.recent_spend.toLocaleString() + 'm'];
  }

  // percentage figures for ER 

  // DoH
  const doh_current_year_perc_elements = document.querySelectorAll('.doh_current_year_as_percentage');
  for (let i = 0; i < doh_current_year_perc_elements.length; i++) {
    doh_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.doh.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }


  // DE
  const de_current_year_perc_elements = document.querySelectorAll('.de_current_year_as_percentage');
  for (let i = 0; i < de_current_year_perc_elements.length; i++) {
    de_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.de.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DfI
  const dfi_current_year_perc_elements = document.querySelectorAll('.dfi_current_year_as_percentage');
  for (let i = 0; i < dfi_current_year_perc_elements.length; i++) {
    dfi_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.dfi.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DoJ
  const doj_current_year_perc_elements = document.querySelectorAll('.doj_current_year_as_percentage');
  for (let i = 0; i < doj_current_year_perc_elements.length; i++) {
    doj_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.doj.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DfC
  const dfc_current_year_perc_elements = document.querySelectorAll('.dfc_current_year_as_percentage');
  for (let i = 0; i < dfc_current_year_perc_elements.length; i++) {
    dfc_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.dfc.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DfE
  const dfe_current_year_perc_elements = document.querySelectorAll('.dfe_current_year_as_percentage');
  for (let i = 0; i < dfe_current_year_perc_elements.length; i++) {
    dfe_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.dfe.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DAERA
  const daera_current_year_perc_elements = document.querySelectorAll('.daera_current_year_as_percentage');
  for (let i = 0; i < daera_current_year_perc_elements.length; i++) {
    daera_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.daera.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // DoF
  const dof_current_year_perc_elements = document.querySelectorAll('.dof_current_year_as_percentage');
  for (let i = 0; i < dof_current_year_perc_elements.length; i++) {
    dof_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.dof.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  // TEO
  const teo_current_year_perc_elements = document.querySelectorAll('.teo_current_year_as_percentage');
  for (let i = 0; i < teo_current_year_perc_elements.length; i++) {
    teo_current_year_perc_elements[i].innerHTML = [Math.round(Object.values(data.teo.line_data).pop() / Math.abs(data.del.spend * 1000) * 100) + '%'];
  }

  var doh_pie = [Math.round(Object.values(data.doh.line_data).pop())];
  var doj_pie = [Math.round(Object.values(data.doj.line_data).pop())];
  var dfe_pie = [Math.round(Object.values(data.dfe.line_data).pop())];
  var dfc_pie = [Math.round(Object.values(data.dfc.line_data).pop())];
  var dfi_pie = [Math.round(Object.values(data.dfi.line_data).pop())];
  var dof_pie = [Math.round(Object.values(data.dof.line_data).pop())];
  var de_pie = [Math.round(Object.values(data.de.line_data).pop())];
  var teo_pie = [Math.round(Object.values(data.teo.line_data).pop())];
  var daera_pie = [Math.round(Object.values(data.daera.line_data).pop())];

  var doh_pie_data = [doh_pie, (data.del.spend * 1000) - doh_pie];
  var doj_pie_data = [doj_pie, (data.del.spend * 1000) - doj_pie];
  var dfe_pie_data = [dfe_pie, (data.del.spend * 1000) - dfe_pie];
  var dfc_pie_data = [dfc_pie, (data.del.spend * 1000) - dfc_pie];
  var dfi_pie_data = [dfi_pie, (data.del.spend * 1000) - dfi_pie];
  var dof_pie_data = [dof_pie, (data.del.spend * 1000) - dof_pie];
  var de_pie_data = [de_pie, (data.del.spend * 1000) - de_pie];
  var teo_pie_data = [teo_pie, (data.del.spend * 1000) - teo_pie];
  var daera_pie_data = [daera_pie, (data.del.spend * 1000) - daera_pie];

  var overall_pie_data = [data.ame.spend, data.del.spend];

  const doh_pie_chart_data = {
    labels: doh_pie_labels,
    datasets: [{
      data: doh_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#008eaa", '#b2b2b2'],
      borderWidth: 2,
    }]
  };

  const doj_pie_chart_data = {
    labels: doj_pie_labels,
    datasets: [{
      data: doj_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#893b67", '#b2b2b2'],
      borderWidth: 2,
    }]
  };

  const dfe_pie_chart_data = {
    labels: dfe_pie_labels,
    datasets: [{
      data: dfe_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#0072CE", '#b2b2b2'],
      borderWidth: 2,
    }]
  };
  const dfc_pie_chart_data = {
    labels: dfc_pie_labels,
    datasets: [{
      data: dfc_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#7d55c7", '#b2b2b2'],
      borderWidth: 2,
    }]
  };


  const dfi_pie_chart_data = {
    labels: dfi_pie_labels,
    datasets: [{
      data: dfi_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#c28400", '#b2b2b2'],
      borderWidth: 2,
    }]
  };

  const de_pie_chart_data = {
    labels: de_pie_labels,
    datasets: [{
      data: de_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#ca2c93", '#b2b2b2'],
      borderWidth: 2,
    }]
  };


  const teo_pie_chart_data = {
    labels: teo_pie_labels,
    datasets: [{
      data: teo_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#5698c8", '#b2b2b2'],
      borderWidth: 2,
    }]
  };

  const dof_pie_chart_data = {
    labels: dof_pie_labels,
    datasets: [{
      data: dof_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#899064", '#b2b2b2'],
      borderWidth: 2,
    }]
  };


  const daera_pie_chart_data = {
    labels: daera_pie_labels,
    datasets: [{
      data: daera_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#009a44", '#b2b2b2'],
      borderWidth: 2,
    }]
  };


  const overall_pie_chart_data = {
    labels: overall_pie_labels,
    datasets: [{
      data: overall_pie_data,
      borderColor: '#ffffff',
      backgroundColor: ["#3878c5", '#b2b2b2'],
      borderWidth: 2,
    }]
  };

  const pie_options = {

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 10
          }
        },
      },
      datalabels: { display: false },
      tooltip: { enabled: false }
    },
    events: [], // Disable all interactions, including clicks
    hover: { mode: null },

  };

  const doh_pie_chart = new Chart(ctx_doh_pie, {
    type: 'pie',
    data: doh_pie_chart_data,
    options: pie_options
  });
  const doj_pie_chart = new Chart(ctx_doj_pie, {
    type: 'pie',
    data: doj_pie_chart_data,
    options: pie_options
  });




  const dfe_pie_chart = new Chart(ctx_dfe_pie, {
    type: 'pie',
    data: dfe_pie_chart_data,
    options: pie_options
  });



  const dfc_pie_chart = new Chart(ctx_dfc_pie, {
    type: 'pie',
    data: dfc_pie_chart_data,
    options: pie_options
  });

  const dfi_pie_chart = new Chart(ctx_dfi_pie, {
    type: 'pie',
    data: dfi_pie_chart_data,
    options: pie_options
  });




  const de_pie_chart = new Chart(ctx_de_pie, {
    type: 'pie',
    data: de_pie_chart_data,
    options: pie_options
  });


  const teo_pie_chart = new Chart(ctx_teo_pie, {
    type: 'pie',
    data: teo_pie_chart_data,
    options: pie_options
  });


  const daera_pie_chart = new Chart(ctx_daera_pie, {
    type: 'pie',
    data: daera_pie_chart_data,
    options: pie_options
  });

  const dof_pie_chart = new Chart(ctx_dof_pie, {
    type: 'pie',
    data: dof_pie_chart_data,
    options: pie_options
  });

  const overall_pie_chart = new Chart(ctx_overall_pie, {
    type: 'pie',
    data: overall_pie_chart_data,
    options: pie_options
  });
}


// copy to clipboard for use in share button function
function copyToClipboard(text) {
    var inputc = document.body.appendChild(
      document.createElement("input")
    );
    inputc.value = window.location.href;
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
    alert("URL Copied.");
  }
  
  // share button functionality
  (function (win, doc) {
    const testButton = doc.createElement("button");
    testButton.setAttribute("type", "share");
    if (testButton.type != "share") {
      win.addEventListener("click", function (ev) {
        ev = ev || win.event;
        let target = ev.target;
        let button = target.closest(
          'button[type="share"]'
        );
        if (button) {
          const title = "Share URL";
          const url = win.location.href;
          if (navigator.share) {
            navigator.share({
              title: title,
              url: url,
            });
          } else {
            copyToClipboard();
          }
        }
      });
    }
  })(this, this.document);

  
  
  // sets inital font size for treemap dependent on screen size
  function inital_treemap_font() {
    if(window.outerWidth > 850) {
      return[14];
    };
    if(window.outerWidth <= 850 && window.outerWidth > 780) {
      return[12];
    };
    if(window.outerWidth <= 780 && window.outerWidth > 700) {
      return[10];
    };
    if(window.outerWidth <= 700 && window.outerWidth > 600) {
      return[8];
    };
    if(window.outerWidth < 600) {
      return[6];
    };
  }
  
  // sets inital font size for tooltip title dependent on screen size - not currently used as tooltips turned off
  // function inital_tooltip_font_title() {
  //   if(window.outerWidth > 700) {
  //     return[16];
  //   };
  //   if(window.outerWidth <= 700 && window.outerWidth > 600) {
  //     return[14];
  //   };
  //   if(window.outerWidth <= 600 && window.outerWidth > 450) {
  //     return[12];
  //   };
  //   if(window.outerWidth < 450) {
  //     return[10];
  //   };
  // }
  
  
  // sets inital font size for tooltip body dependent on screen size - not currently used as tooltips turned off
  // function inital_tooltip_font_body() {
  //   if(window.outerWidth > 700) {
  //     return[14];
  //   };
  //   if(window.outerWidth <= 700 && window.outerWidth > 600) {
  //     return[12];
  //   };
  //   if(window.outerWidth <= 600 && window.outerWidth > 450) {
  //     return[10];
  //   };
  //   if(window.outerWidth < 450) {
  //     return[8];
  //   };
  // }
  
  
  
  // screen size responsive fonts - only called on resize so initals need to be set above (search for comment 'chart text defaults before resize' in index.html)
  // applies to all charts and all text within unless overridden by individual config (eg treemap labels or tooltip)
  
  // not as important as inital setting on sizes based on screen size as resizing is not a common task,
  //most people open in one screen size and this will rescale based on defaults, not on resize
  
  
  
  function responsiveFonts() {
    if(window.outerWidth > 850) {
      
    };
    if(window.outerWidth <= 850 && window.outerWidth > 780) {
      
    };
    if(window.outerWidth <= 780) {
    };
    if(window.outerWidth < 600) {
      
    } else {
      
    };
    if(window.outerWidth > 700) {
      Chart.defaults.font.size = 16;
      // bar_options.plugins.tooltip.titleFont.size = 16;
      // bar_options.plugins.tooltip.bodyFont.size = 14;
      // line_options.plugins.tooltip.titleFont.size = 16;
      // line_options.plugins.tooltip.bodyFont.size = 14;
      // overall_line_options.plugins.tooltip.titleFont.size = 16;
      // overall_line_options.plugins.tooltip.bodyFont.size = 14;
    };
    if(window.outerWidth <= 700 && window.outerWidth > 600) {
      Chart.defaults.font.size = 14;
      // bar_options.plugins.tooltip.titleFont.size = 14;
      // bar_options.plugins.tooltip.bodyFont.size = 12;
      // line_options.plugins.tooltip.titleFont.size = 14;
      // line_options.plugins.tooltip.bodyFont.size = 12;
      // overall_line_options.plugins.tooltip.titleFont.size = 14;
      // overall_line_options.plugins.tooltip.bodyFont.size = 12;
    };
    if(window.outerWidth <= 600 && window.outerWidth > 450) {
      Chart.defaults.font.size = 12;
      // overall_y_label.style.fontSize = "12pt";
      // bar_options.plugins.tooltip.titleFont.size = 12;
      // bar_options.plugins.tooltip.bodyFont.size = 10;
      // line_options.plugins.tooltip.titleFont.size = 12;
      // line_options.plugins.tooltip.bodyFont.size = 10;
      // overall_line_options.plugins.tooltip.titleFont.size = 12;
      // overall_line_options.plugins.tooltip.bodyFont.size = 10;
    };
    if(window.outerWidth < 450) {
      Chart.defaults.font.size = 8;
      // overall_y_label.style.fontSize = "8pt";
      // bar_options.plugins.tooltip.titleFont.size = 10;
      // bar_options.plugins.tooltip.bodyFont.size = 8;
      // line_options.plugins.tooltip.titleFont.size = 10;
      // line_options.plugins.tooltip.bodyFont.size = 8;
      // overall_line_options.plugins.tooltip.titleFont.size = 10;
      // overall_line_options.plugins.tooltip.bodyFont.size = 8;
    };
  }
  
  
  
  
  
  
  
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  // function getCookie(name) {
  //   var nameEQ = name + "=";
  //   var cookies = document.cookie.split(';');
  //   for (var i = 0; i < cookies.length; i++) {
  //     var cookie = cookies[i];
  //     while (cookie.charAt(0) == ' ') {
  //       cookie = cookie.substring(1, cookie.length);
  //     }
  //     if (cookie.indexOf(nameEQ) === 0) {
  //       return cookie.substring(nameEQ.length, cookie.length);
  //     }
  //   }
  //   return null;
  // }
  
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
  
  //      window.dataLayer = window.dataLayer || [];
  //      function gtag() { dataLayer.push(arguments); }
  //      gtag('js', new Date()); 
  //      gtag('config', 'UA-72688332-4');
  }
  
  
  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
  });
  
  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reject-cookies').addEventListener('click', rejectCookies);
  });