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

  

/**
 * Renders a semi-circular gauge showing the % of indicators in a domain that are "improving".
 * Returns the Chart.js instance.
 *
 * Options:
 * - canvasId: string (required)
 * - domainName: string (required)
 * - domainsDataUrl: string (default './domains_data.js') – file defining window.domains_data
 * - updatesUrl: string (default './updated.json') – {code: {performance: "..."}}
 * - includeInsufficientInDenominator: boolean (default false)
 * - statusesToCount: string[] (default ['improving'])
 * - title: string (optional)
 * - subtitle: string (optional)
 * - colorStops: {good:number, warn:number} (default {good: 60, warn: 40})
 * - centerTextOffsetY: number (default 0) – negative moves text up
 * - centerTextGap: number (default 12) – space between % and caption
 */
// async function renderDomainImprovementGauge({
//   canvasId,
//   domainName,
//   domainsDataUrl = 'scripts/domains_data.js',
//   updatesUrl = 'scripts/updated.json',
//   includeInsufficientInDenominator = false,
//   statusesToCount = ['improving'],
//   colorStops = { good: 60, warn: 40 },
//   centerTextOffsetY = 0,
//   centerTextGap = 12
// } = {}) {
//   if (!canvasId) throw new Error('canvasId is required');
//   if (!domainName) throw new Error('domainName is required');

//   // 1) Ensure domains_data is available
//   await ensureDomainsData(domainsDataUrl);

//   // 2) Load updated.json
//   const updates = await loadUpdates(updatesUrl);

//   // 3) Compute stats
//   const { percent, counts, totalEligible, details } = computeImprovementStats({
//     domainName,
//     includeInsufficientInDenominator,
//     statusesToCount,
//     domainsData: window.domains_data,
//     updates
//   });

//   // 4) Compose chart
//   const canvas = document.getElementById(canvasId);
//   canvas.style.margin = "0% 10% 0% 10%";
//   if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);

//   // Cleanup previous chart on the same canvas
//   if (canvas._chartInstance && typeof canvas._chartInstance.destroy === 'function') {
//     canvas._chartInstance.destroy();
//   }

//   const data = [percent, Math.max(0, 100 - percent)];

//   // Per-chart center text plugin (closure captures percent/labels)
//   const centerTextPlugin = {
//     id: `centerText_${canvasId}`, // unique per-canvas
//     afterDraw(chart) {
//       const meta = chart.getDatasetMeta(0);
//       if (!meta?.data?.length) return;

//       const arc = meta.data[0];
//       const xC = arc.x;
//       const yBase = arc.y - 50; // move text up/down in one place

//       const ctx = chart.ctx;
//       ctx.save();
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';

//       // % number
//       ctx.fillStyle = '#111';
//       ctx.font = 'bold 50px system-ui, -apple-system, Segoe UI, Roboto, Arial';
//       ctx.fillText(`${Math.round(percent)}%`, xC, yBase - 8);

//       // Caption
//       ctx.fillStyle = '#111';
//       ctx.font = '30px system-ui, -apple-system, Segoe UI, Roboto, Arial';
//       ctx.fillText('improving', xC, yBase + 30);
//       ctx.restore();
//     }
//   };

//   // Optional: if the datalabels plugin is present globally, turn it off per chart by default
//   const maybeDatalabelsOff = (Chart.registry.plugins.get('datalabels'))
//     ? { datalabels: { display: false } }
//     : {};

//   const chart = new Chart(canvas, {
//     type: 'doughnut',
//     data: {
//       labels: ['Improving', 'Other'],
//       datasets: [{
//         data,
//         backgroundColor: ['#008675', '#e9ecef'],
//         borderWidth: 0,
//         hoverOffset: 0,
//         circumference: 180,  // semicircle
//         rotation: -90,       // start at left
//         cutout: '70%'
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         ...maybeDatalabelsOff,
//         legend: { display: false },
//         tooltip: {
//           callbacks: {
//             label: (ctx) => `${ctx.label}: ${(+ctx.raw).toFixed(1)}%`
//           }
//         },
//       },
//       layout: { padding: { top: 0 } }
//     },
//     plugins: [centerTextPlugin] // register plugin only for THIS chart
//   });

//   chart.metrics = { domainName, percent, counts, totalEligible, details };
//   canvas._chartInstance = chart;
//   return chart;
// }

// Renders a semi-circular gauge with Improving (green) + Worsening (red)
// Optional: include a grey "Other" remainder.
// Uses existing computeImprovementStats() and Chart.js v4.
async function renderDomainSplitGauge({
  canvasId,
  domainName,
  domainsDataUrl = 'scripts/domains_data.js',
  updatesUrl = 'scripts/updated.json',
  includeInsufficientInDenominator = false,

  // Visual configuration
  improvingColor = '#008675', // NI green
  worseningColor = '#C0002F', // deep accessible red
  otherColor = '#e9ecef',     // light grey remainder
  showOther = true,           // set false to show ONLY green+red (renormalised to 100%)
  captionText = 'indicators'  // center caption
} = {}) {
  if (!canvasId) throw new Error('canvasId is required');
  if (!domainName) throw new Error('domainName is required');

  // 1) Ensure data is loaded
  await ensureDomainsData(domainsDataUrl);
  const updates = await loadUpdates(updatesUrl);

  // 2) Get counts for the domain
  const { counts, totalEligible } = computeImprovementStats({
    domainName,
    includeInsufficientInDenominator,
    // statusesToCount here doesn't change counts; we just need the breakdown
    statusesToCount: ['improving'],
    domainsData: window.domains_data,
    updates
  });

  // 3) Compute percentages
  const improvingPct = totalEligible ? (counts.improving / totalEligible) * 100 : 0;
  const worseningPct = totalEligible ? (counts.worsening / totalEligible) * 100 : 0;

  let data, labels, colors;
  if (showOther) {
    const otherPct = Math.max(0, 100 - improvingPct - worseningPct);
    data   = [improvingPct, worseningPct, otherPct];
    labels = ['Improving', 'Worsening', 'Other'];
    colors = [improvingColor, worseningColor, otherColor];
  } else {
    // Renormalise so green + red sum to 100% for a two-segment gauge
    const sum = improvingPct + worseningPct;
    const normImproving = sum > 0 ? (improvingPct / sum) * 100 : 0;
    const normWorsening = sum > 0 ? (worseningPct / sum) * 100 : 0;
    data   = [normImproving, normWorsening];
    labels = ['Improving', 'Worsening'];
    colors = [improvingColor, worseningColor];
  }

  // 4) Prepare canvas & destroy any prior chart
  const canvas = document.getElementById(canvasId);
  if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);
  if (canvas._chartInstance && typeof canvas._chartInstance.destroy === 'function') {
    canvas._chartInstance.destroy();
  }

  // 5) Center text plugin shows both values
  const centerTextPlugin = {
    id: `centerText_${canvasId}`,
    afterDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      if (!meta?.data?.length) return;

      // Use first arc to get center coordinates
      const arc = meta.data[0];
      const xC = arc.x;
      const yBase = arc.y - 50;
      const ctx = chart.ctx;

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Top line: "Imp X% / Wors Y%"
      const impVal = Math.round(improvingPct);
      const worVal = Math.round(worseningPct);
      ctx.fillStyle = '#111';
      ctx.font = 'bold 44px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText(`Imp ${impVal}% / Wors ${worVal}%`, xC, yBase - 6);

      // Bottom line: caption
      ctx.font = '28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText(captionText, xC, yBase + 28);
      ctx.restore();
    }
  };

  const datalabelsOff = (Chart.registry.plugins.get('datalabels'))
    ? { datalabels: { display: false } }
    : {};

  // 6) Render semicircle doughnut
  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderWidth: 0,
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
        ...datalabelsOff,
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${( +ctx.raw ).toFixed(1)}%`
          }
        }
      },
      layout: { padding: { top: 0 } }
    },
    plugins: [centerTextPlugin]
  });

  // Keep some metrics for external use if needed
  chart.metrics = { improvingPct, worseningPct, counts, totalEligible };
  canvas._chartInstance = chart;
  return chart;
}

// ---------------- Internals ----------------

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
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
  return res.json();
}

// Pick first available code from this priority list
function pickPreferredCode(dataObj) {
  const priority = ['NI', 'AA', 'LGD', 'EQ', 'LEV'];
  for (const key of priority) {
    const code = (dataObj && typeof dataObj[key] === 'string') ? dataObj[key].trim() : '';
    if (code) return { key, code };
  }
  return { key: null, code: null };

}

function computeImprovementStats({
  domainName,
  includeInsufficientInDenominator,
  statusesToCount,
  domainsData,
  updates
}) {
  const domain = domainsData?.[domainName];
  if (!domain) throw new Error(`Domain '${domainName}' not found in domains_data`);

  const indicators = domain.indicators || {};
  const details = [];

  let improving = 0;
  let worsening = 0;
  let noChange = 0;
  let insufficient = 0;
  let eligible = 0;

  for (const [indicatorName, indicatorObj] of Object.entries(indicators)) {
    const { code } = pickPreferredCode(indicatorObj?.data);
    let perf = null;


    if (code && updates[code] && typeof updates[code] === 'object') {
      perf = (updates[code].performance || '').toLowerCase().trim();
    }

    if (!perf) perf = 'insufficient data';
    if (perf === 'insufficient') perf = 'insufficient data';

    const isInsufficient = (perf === 'insufficient data');

    const countsInDenominator = includeInsufficientInDenominator ? true : !isInsufficient;
    if (countsInDenominator) eligible += 1;

    const countsAsImproving = statusesToCount.map(s => s.toLowerCase()).includes(perf);

    if (countsInDenominator && countsAsImproving) improving += 1;
    else if (perf === 'worsening') worsening += 1;
    else if (perf === 'no change') noChange += 1;
    else insufficient += 1;

    details.push({ indicatorName, code, performance: perf, countedInDenominator: countsInDenominator });
  }

  const percent = (eligible > 0) ? (improving / eligible) * 100 : 0;

  return {
    percent,
    counts: { improving, worsening, noChange, insufficient },
    totalEligible: eligible,
    details
  };
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
  domainsDataUrl = 'scripts/domains_data.js',
  updatesUrl = 'scripts/updated.json',
  includeInsufficientInDenominator = false,
  statusesToCount = ['improving']
} = {}) {
  if (!canvasId) throw new Error('canvasId is required');

  // 1) Load everything
  await ensureDomainsData(domainsDataUrl);
  const updates = await loadUpdates(updatesUrl);

  // 2) Build a pseudo-domain that merges all indicators
  const mergedIndicators = {};
  for (const [domainName, domainObj] of Object.entries(window.domains_data || {})) {
    const indicators = domainObj?.indicators || {};
    for (const [indicatorName, indicatorObj] of Object.entries(indicators)) {
      // Use a unique key in case names collide
      const mergedKey = `${domainName} :: ${indicatorName}`;
      mergedIndicators[mergedKey] = indicatorObj;
    }
  }

  const fakeDomainsData = {
    __ALL__: {
      indicators: mergedIndicators
    }
  };

  // 3) Compute stats on the merged pseudo-domain
  const { percent, counts, totalEligible, details } = computeImprovementStats({
    domainName: '__ALL__',
    includeInsufficientInDenominator,
    statusesToCount,
    domainsData: fakeDomainsData,
    updates
  });

  // 4) Render a semicircle gauge *exactly like* renderDomainImprovementGauge
  const canvas = document.getElementById(canvasId);
  if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);
  canvas.style.paddingTop = "20px"

  // Cleanup
  if (canvas._chartInstance && typeof canvas._chartInstance.destroy === 'function') {
    canvas._chartInstance.destroy();
  }

  const data = [percent, Math.max(0, 100 - percent)];

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

      ctx.fillStyle = '#111';
      ctx.font = 'bold 50px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText(`${Math.round(percent)}%`, xC, yBase - 8);

      ctx.fillStyle = '#111';
      ctx.font = '30px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText('improving', xC, yBase + 30);
      ctx.restore();
    }
  };

  const maybeDatalabelsOff = (Chart.registry.plugins.get('datalabels'))
    ? { datalabels: { display: false } }
    : {};

  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Improving', 'Other'],
      datasets: [{
        data,
        backgroundColor: ['#008675', '#e9ecef'],
        borderWidth: 0,
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
            label: (ctx) => `${ctx.label}: ${(+ctx.raw).toFixed(1)}%`
          }
        }
      },
      layout: { padding: { top: 0 } }
    },
    plugins: [centerTextPlugin]
  });

  chart.metrics = {
    domainName: '__ALL__',
    percent,
    counts,
    totalEligible,
    details
  };
  canvas._chartInstance = chart;
  document.getElementById("improving-count").innerText = chart.metrics.counts.improving + " indicators that are improving";
  document.getElementById("no-change-count").innerText = chart.metrics.counts.noChange + " indicators that have seen no change";
  document.getElementById("worsening-count").innerText = chart.metrics.counts.worsening + " indicators that are worsening";
  document.getElementById("insufficient-count").innerText = chart.metrics.counts.insufficient + " indicators with insufficient data";
  return chart;

}



(async () => {
  await renderAllDomainsGauge({
    canvasId: 'all_domains_gauge',
    // includeInsufficientInDenominator: true, // optional
    // statusesToCount: ['improving', 'no change'], // optional
    
  });
})();




