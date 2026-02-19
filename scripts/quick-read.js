var data;

window.onload = function () {
    // getData();
    showCookieBanner();
}

// async function getData() {

//   try {
//       const response = await fetch("data.json");
//       const responseData = await response.json();
//       data = responseData;
//   } catch (error) {
      
//   }
// }


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

/**
 * Options:
 * - canvasId: string (required)
 * - domainName: string (required)
 * - domainsDataUrl: string (default './domains_data.js') – file defining window.domains_data
 * - updatesUrl: string (default './updated.json') – {code: {performance: "..."}}
 * - includeInsufficientInDenominator: boolean (default false)
 * - statusesToCount: string[] (default ['improving'])
 * - centerTextOffsetY: number (default 0) – negative moves text up
 */


async function ensureDomainsData(url) {
  if (window.domains_data && typeof window.domains_data === 'object') return;

  await loadScript(url);

  const maxWaitMs = 4000;
  const start = performance.now();
  while (!window.domains_data) {
    if (performance.now() - start > maxWaitMs) {
      throw new Error(`Timed out waiting for domains_data from ${url}`);
    }
    await new Promise(r => setTimeout(r, 40));
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
}

async function loadUpdates(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}


async function renderDomainImprovementGauge({
  canvasId,
  domainName,
  domainsDataUrl = 'scripts/domains_data.js',
  updatesUrl = 'scripts/updated.json',

  includeInsufficientInDenominator = false,  // Option A (original behaviour)

  mode = 'four-slices',
  improvingColor = '#00A857',
  noChangeColor = '#FF6200',
  worseningColor = '#db0000',
  insufficientColor = '#757575',

  centerTextOffsetY = 0,
  centerMode = 'stacked'
} = {}) {

  if (!canvasId) throw new Error('canvasId is required');
  if (!domainName) throw new Error('domainName is required');

  // ------- Load domain and update data -------
  await ensureDomainsData(domainsDataUrl);
  const updates = await loadUpdates(updatesUrl);

  const domain = window.domains_data?.[domainName];
  if (!domain) throw new Error(`Domain '${domainName}' not found`);

  const indicators = domain.indicators || {};

  // ------- Count performance values -------
  const counts = { improving: 0, noChange: 0, worsening: 0, insufficient: 0 };
  let totalEligible = 0;

  const priority = ['EQ', 'NI', 'LGD', 'AA', 'LEV'];

  for (const [indicatorName, indicatorObj] of Object.entries(indicators)) {

    let code = null;
    for (const key of priority) {
      const candidate = indicatorObj?.data?.[key];
      if (candidate && candidate.trim()) {
        code = candidate.trim();
        break;
      }
    }

    // No usable code → insufficient
    let perf = 'insufficient data';

    if (code && updates[code]) {
      const raw = updates[code].performance;
      if (typeof raw === 'string') perf = raw.toLowerCase().trim();
    }

    // Normalize
    if (!perf) perf = 'insufficient data';
    if (perf === 'insufficient') perf = 'insufficient data';

    const isInsufficient = (perf === 'insufficient data');

    // Denominator logic = Option A
    const inDenom = includeInsufficientInDenominator ? true : !isInsufficient;

    if (inDenom) totalEligible++;

    // Count categories
    if (perf === 'improving') counts.improving++;
    else if (perf === 'no change') counts.noChange++;
    else if (perf === 'worsening') counts.worsening++;
    else if (perf == 'insufficient data') counts.insufficient++;
  }

  // ------- Percentages -------
  const denom = includeInsufficientInDenominator
    ? totalEligible
    : totalEligible + counts.insufficient;

  const pct = (n) => (denom > 0 ? (n / denom) * 100 : 0);

  const improvingPct    = pct(counts.improving);
  const noChangePct     = pct(counts.noChange);
  const worseningPct    = pct(counts.worsening);
  const insufficientPct = pct(counts.insufficient);

  // ------- Chart Setup -------
  const canvas = document.getElementById(canvasId);
  if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);
  canvas.style.margin = "0% 10% 0% 10%";

  if (canvas._chartInstance?.destroy) {
    canvas._chartInstance.destroy();
  }

  const labels = ['Improving', 'No change', 'Worsening', 'Insufficient data'];
  const dataset = {
    data: [improvingPct, noChangePct, worseningPct, insufficientPct],
    backgroundColor: [
      improvingColor,
      noChangeColor,
      worseningColor,
      insufficientColor
    ]
  };

  // ------- Center Text Plugin -------
  const centerTextPlugin = {
    id: `centerText_${canvasId}`,
    afterDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      const arc0 = meta?.data?.[0];
      const { chartArea } = chart;

      // Safe center positioning
      const xC = arc0?.x ?? (chartArea.left + chartArea.right) / 2;
      const yArc = arc0?.y ?? (chartArea.top + chartArea.bottom) / 2;
      const yBase = yArc - 50 + centerTextOffsetY;

      const ctx = chart.ctx;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (centerMode === 'stacked') {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 30px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText(`${counts.improving}/${denom}`, xC, yBase - 22);

        ctx.font = '18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText('indicators are improving', xC, yBase - 2);
      }

      ctx.restore();
    }
  };

  const maybeDatalabelsOff =
    (Chart.registry?.plugins?.get('datalabels'))
      ? { datalabels: { display: false } }
      : {};

  // ------- Render Chart -------
  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        ...dataset,
        borderWidth: 5,
        hoverOffset: 0,
        circumference: 180,
        rotation: -90,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        ...maybeDatalabelsOff,
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${(+ctx.raw).toFixed(1)}%`
          }
        }
      }
    },
    plugins: [centerTextPlugin]
  });

  chart.metrics = {
    domainName,
    counts,
    totalEligible,
    details: []  // kept for API compatibility
  };

  canvas._chartInstance = chart;

  return chart;
}

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'thriving_children_gauge',
    domainName: 'Thriving Children',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'cleaner_environment_gauge',
    domainName: 'Cleaner Environment',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'equal_society_gauge',
    domainName: 'Equal Society',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'healthier_lives_gauge',
    domainName: 'Healthier Lives',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'brighter_futures_gauge',
    domainName: 'Brighter Futures',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'stronger_economy_gauge',
    domainName: 'Stronger Economy',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'safer_communities_gauge',
    domainName: 'Safer Communities',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'caring_society_gauge',
    domainName: 'Caring Society',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'better_homes_gauge',
    domainName: 'Better Homes',
  });
})();

(async () => {
  const gauge = await renderDomainImprovementGauge({
    canvasId: 'living_peacefully_gauge',
    domainName: 'Living Peacefully',
  });
})();

async function renderAllDomainsGauge({
  canvasId,
  includeInsufficientInDenominator = true,
  improvingColor = '#00A857',
  noChangeColor = '#FF6200',
  worseningColor = '#db0000',
  insufficientColor = '#757575',

  spacing = 2,
  borderColor = '#ffffff',
  centerMode = 'stacked'
}) {

  // 1) Load the raw updated.json file
  const updates = await loadUpdates('scripts/updated.json');

  // 2) Directly count performance categories from updated.json
  const counts = {
    improving: 0,
    noChange: 0,
    worsening: 0,
    insufficient: 0
  };

  for (const indicator of Object.values(updates)) {
    const perf = indicator.performance?.toLowerCase();

    if (perf === 'improving') counts.improving++;
    else if (perf === 'no change') counts.noChange++;
    else if (perf === 'worsening') counts.worsening++;
    else if (perf === 'insufficient data') counts.insufficient++;
  }

  // Total indicators with actual performance status
  const totalEligible =
    counts.improving + counts.noChange + counts.worsening;

  // 3) Denominator for percentages
  const denom = includeInsufficientInDenominator
    ? totalEligible
    : totalEligible + counts.insufficient;

  const pct = (n) => (denom > 0 ? (n / denom) * 100 : 0);

  const improvingPct = pct(counts.improving);
  const noChangePct = pct(counts.noChange);
  const worseningPct = pct(counts.worsening);
  const insufficientPct = pct(counts.insufficient);

  // 4) Chart creation (kept identical to your logic)
  const canvas = document.getElementById(canvasId);
  if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);
  canvas.style.paddingTop = '20px';

  if (canvas._chartInstance?.destroy) {
    canvas._chartInstance.destroy();
  }

  const labels = ['Improving', 'No change', 'Worsening', 'Insufficient data'];
  const dataset = {
    data: [improvingPct, noChangePct, worseningPct, insufficientPct],
    backgroundColor: [
      improvingColor,
      noChangeColor,
      worseningColor,
      insufficientColor
    ]
  };

  const centerTextPlugin = {
    id: `centerText_${canvasId}`,
    afterDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      if (!meta?.data?.length) return;

      const arc = meta.data[0];
      const xC = arc.x;
      const yBase = arc.y - 50;

      const ctx = chart.ctx;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (centerMode === 'stacked') {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText(`${counts.improving}/${denom}`, xC, yBase - 22);

        ctx.font = '18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText('indicators are improving', xC, yBase - 2);
      }

      ctx.restore();
    }
  };

  const maybeDatalabelsOff =
    Chart.registry.plugins.get('datalabels')
      ? { datalabels: { display: false } }
      : {};

  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          ...dataset,
          spacing,
          borderColor,
          borderWidth: 1,
          borderAlign: 'inner',
          hoverOffset: 0,
          circumference: 180,
          rotation: -90,
          cutout: '70%'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        ...maybeDatalabelsOff,
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${(+ctx.raw).toFixed(1)}%`
          }
        }
      },
      layout: { padding: { top: 0 } }
    },
    plugins: [centerTextPlugin]
  });

  chart.metrics = {
    counts,
    totalEligible
  };

  canvas._chartInstance = chart;

  // Update summary text
  document.getElementById("improving-count").innerText =
    `${counts.improving} indicators that are improving`;
  document.getElementById("no-change-count").innerText =
    `${counts.noChange} indicators that have seen no change`;
  document.getElementById("worsening-count").innerText =
    `${counts.worsening} indicators that are worsening`;
  document.getElementById("insufficient-count").innerText =
    `${counts.insufficient} indicators with insufficient data`;

  return chart;
}

// Call it
(async () => {
  await renderAllDomainsGauge({ canvasId: 'all_domains_gauge' });
})();


const key = document.createElement('div');
key.className = 'key-wrapper';

key.innerHTML =
  '<div class="key-title" style="margin-right: 8px;">Key:</div>' +
  '<div class="key-items">' +
    '<div class="key-item row key-text"><div class="key-square positive"><div class="key-hex-label positive"></div></div>Improving</div>' +
    '<div class="key-item row key-text"><div class="key-square neutral"><div class="key-hex-label"></div></div>No Change</div>' +
    '<div class="key-item row key-text"><div class="key-square negative"><div class="key-hex-label negative"></div></div>Worsening</div>' +
    '<div class="key-item row key-text"><div class="key-square insufficient"><div class="key-hex-label insufficient"></div></div>Insufficient Data</div>' +
  '</div>';

document.getElementById('top-container').prepend(key);
