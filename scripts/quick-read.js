var data;

window.onload = function () {
    showCookieBanner();
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

async function renderSingleStatusGauge({
    canvasId,
    domainName,
    status, // retained for backward compatibility; still unused for the visual
    domainsDataUrl = 'scripts/domains_data.js', // retained for backward compatibility; no longer needed
    updatesUrl = 'scripts/performance.json',
    includeInsufficient = false,
    hexOrder = ['improving', 'no change', 'worsening', 'insufficient data']
} = {}) {

    // Load the new performance file directly
    const performanceData = await loadUpdates(updatesUrl);

    // Get the domain from performance.json
    const domainIndicators = performanceData?.[domainName];
    if (!domainIndicators) {
        throw new Error(`Domain '${domainName}' not found`);
    }

    let improving = 0, noChange = 0, worsening = 0, insufficient = 0;

    // Lists for bullet points
    let improvingList = [];
    let noChangeList = [];
    let worseningList = [];
    let insufficientList = [];

    // Normalise the new file's status values to the labels used elsewhere in your UI
    const normaliseStatus = (value) => {
        const perf = String(value || '').toLowerCase().trim();

        if (perf === 'improved') return 'improving';
        if (perf === 'no_change') return 'no change';
        if (perf === 'worsened') return 'worsening';
        if (perf === 'insufficient_data') return 'insufficient data';

        return 'insufficient data';
    };

    // Loop directly through indicators in the selected domain
    for (const [indicatorName, rawStatus] of Object.entries(domainIndicators)) {
        const perf = normaliseStatus(rawStatus);

        if (perf === 'improving') {
            improving++;
            improvingList.push(indicatorName);
        } else if (perf === 'no change') {
            noChange++;
            noChangeList.push(indicatorName);
        } else if (perf === 'worsening') {
            worsening++;
            worseningList.push(indicatorName);
        } else {
            insufficient++;
            insufficientList.push(indicatorName);
        }
    }

    // Same anchor element as before
    const canvas = document.getElementById(canvasId);
    if (!canvas) throw new Error(`No canvas with id '${canvasId}'`);

    // Destroy old chart if one exists
    if (canvas._chartInstance?.destroy) {
        canvas._chartInstance.destroy();
        canvas._chartInstance = null;
    }

    // Hide old canvas (since we can't place HTML inside it)
    canvas.style.display = 'none';

    // Create or reuse a tally container in the same location
    let tallyContainer = document.getElementById(`${canvasId}__hexTally`);
    if (!tallyContainer) {
        tallyContainer = document.createElement('div');
        tallyContainer.id = `${canvasId}__hexTally`;
        tallyContainer.className = 'hex-tally-container';
        canvas.insertAdjacentElement('afterend', tallyContainer);
    }

    // Build the hex item sequence
    const statusToType = {
        'improving': 'positive',
        'worsening': 'negative',
        'no change': 'neutral',
        'insufficient data': 'insufficient'
    };

    const counts = {
        'improving': improving,
        'worsening': worsening,
        'no change': noChange,
        'insufficient data': insufficient
    };

    const effectiveOrder = includeInsufficient
        ? hexOrder
        : hexOrder.filter(x => x !== 'insufficient data');

    const hexMarkup = effectiveOrder.flatMap(statusKey => {
        const count = counts[statusKey] || 0;
        const type = statusToType[statusKey];
        return Array.from(
            { length: count },
            () => `<key-hex-large type="${type}"></key-hex-large>`
        );
    }).join('');

    tallyContainer.innerHTML = hexMarkup || `<p>No indicators with usable status</p>`;

    // Inline layout styling so it works immediately
    tallyContainer.style.display = 'flex';
    tallyContainer.style.flexWrap = 'wrap';
    tallyContainer.style.gap = '0.5rem';
    tallyContainer.style.alignItems = 'center';
    tallyContainer.style.justifyContent = 'center';
    tallyContainer.style.width = '100%';

    // Update bullet-point containers for all status groups
    const domainPrefixMap = {
        'Thriving Children': 'tc',
        'Cleaner Environment': 'ce',
        'Equal Society': 'es',
        'Healthier Lives': 'hl',
        'Brighter Futures': 'bf',
        'Stronger Economy': 'se',
        'Safer Communities': 'sc',
        'Caring Society': 'cs',
        'Better Homes': 'bh',
        'Living Peacefully': 'lp'
    };

    const prefix = domainPrefixMap[domainName]
        || domainName.split(/\s+/).map(w => w[0]).join('').toLowerCase();

    let improvingSentence;
    if (improving > 1) {
        improvingSentence = `${improving} are improving:`;
    } else if (improving === 1) {
        improvingSentence = `${improving} is improving:`;
    } else {
        improvingSentence = "No indicators are improving.";
    }

    let noChangeSentence;
    if (noChange > 1) {
        noChangeSentence = `${noChange} are not changing:`;
    } else if (noChange === 1) {
        noChangeSentence = `${noChange} is not changing:`;
    } else {
        noChangeSentence = "There are no indicators showing no change.";
    }

    let worseningSentence;
    if (worsening > 1) {
        worseningSentence = `${worsening} are getting worse:`;
    } else if (worsening === 1) {
        worseningSentence = `${worsening} is getting worse:`;
    } else {
        worseningSentence = "There are no indicators getting worse.";
    }

    let insufficientSentence;
    if (insufficient > 1) {
        insufficientSentence = `${insufficient} have insufficient data:`;
    } else if (insufficient === 1) {
        insufficientSentence = `${insufficient} has insufficient data:`;
    } else {
        insufficientSentence = "There are no indicators with insufficient data.";
    }

    const listTargets = [
        {
            className: `${prefix}_improving_inds`,
            items: improvingList,
            emptyText: '',
            comment: improvingSentence
        },
        {
            className: `${prefix}_nochange_inds`,
            items: noChangeList,
            emptyText: '',
            comment: noChangeSentence
        },
        {
            className: `${prefix}_worsening_inds`,
            items: worseningList,
            emptyText: '',
            comment: worseningSentence
        },
        {
            className: `${prefix}_insufficient_inds`,
            items: insufficientList,
            emptyText: '',
            comment: insufficientSentence
        }
    ];

    listTargets.forEach(({ className, items, emptyText, comment }) => {
        const container = document.querySelector(`.${className}`);
        if (!container) return;

        container.innerHTML = items.length
            ? `<p class="list-comment">${comment}</p>
               <ul>${items.map(item => `<li>${item.replace(/_/g, ' ')}</li>`).join('')}</ul>`
            : `<p class="list-comment">${comment}</p>
               <p>${emptyText}</p>`;
    });

    return {
        domainName,
        improving,
        worsening,
        noChange,
        insufficient,
        element: tallyContainer
    };
}



(async () => {
    await renderSingleStatusGauge({
        canvasId: 'tc_improving_gauge',
        domainName: 'Thriving Children',
      includeInsufficient: true
    });


    await renderSingleStatusGauge({
        canvasId: 'ce_improving_gauge',
        domainName: 'Cleaner Environment',
      includeInsufficient: true
    });


    await renderSingleStatusGauge({
        canvasId: 'es_improving_gauge',
        domainName: 'Equal Society',
      includeInsufficient: true
    });

    await renderSingleStatusGauge({
        canvasId: 'hl_improving_gauge',
        domainName: 'Healthier Lives',
      includeInsufficient: true
    });

    await renderSingleStatusGauge({
        canvasId: 'bf_improving_gauge',
        domainName: 'Brighter Futures',
      includeInsufficient: true
    });


    await renderSingleStatusGauge({
        canvasId: 'se_improving_gauge',
        domainName: 'Stronger Economy',
      includeInsufficient: true
    });


    await renderSingleStatusGauge({
        canvasId: 'sc_improving_gauge',
        domainName: 'Safer Communities',
      includeInsufficient: true
    });

    await renderSingleStatusGauge({
        canvasId: 'cs_improving_gauge',
        domainName: 'Caring Society',
      includeInsufficient: true
    });


    await renderSingleStatusGauge({
        canvasId: 'bh_improving_gauge',
        domainName: 'Better Homes',
      includeInsufficient: true
    });



    await renderSingleStatusGauge({
        canvasId: 'lp_improving_gauge',
        domainName: 'Living Peacefully',
       includeInsufficient: true
    });

})();

// async function renderAllDomainsGauge({
//   canvasId,
//   includeInsufficientInDenominator = true,
//   improvingColor = '#00A857',
//   noChangeColor = '#FF6200',
//   worseningColor = '#db0000',
//   insufficientColor = '#757575',

//   spacing = 2,
//   borderColor = '#ffffff',
//   centerMode = 'stacked'
// }) {

//   // 1) Load the raw updated.json file
//   const updates = await loadUpdates('scripts/updated.json');

//   // 2) Directly count performance categories from updated.json
//   const counts = {
//     improving: 0,
//     noChange: 0,
//     worsening: 0,
//     insufficient: 0
//   };

//   for (const indicator of Object.values(updates)) {
//     const perf = indicator.performance?.toLowerCase();

//     if (perf === 'improving') counts.improving++;
//     else if (perf === 'no change') counts.noChange++;
//     else if (perf === 'worsening') counts.worsening++;
//     else if (perf === 'insufficient data') counts.insufficient++;
//   }

//   // Total indicators with actual performance status
//   const totalEligible =
//     counts.improving + counts.noChange + counts.worsening;

//   // 3) Denominator for percentages
//   const denom = includeInsufficientInDenominator
//     ? totalEligible
//     : totalEligible + counts.insufficient;

//   const pct = (n) => (denom > 0 ? (n / denom) * 100 : 0);

//   const improvingPct = pct(counts.improving);
//   const noChangePct = pct(counts.noChange);
//   const worseningPct = pct(counts.worsening);
//   const insufficientPct = pct(counts.insufficient);

//   // 4) Chart creation (kept identical to your logic)
//   const canvas = document.getElementById(canvasId);
//   if (!canvas) throw new Error(`No canvas found with id '${canvasId}'`);
//   canvas.style.paddingTop = '20px';

//   if (canvas._chartInstance?.destroy) {
//     canvas._chartInstance.destroy();
//   }

//   const labels = ['Improving', 'No change', 'Worsening', 'Insufficient data'];
//   const dataset = {
//     data: [improvingPct, noChangePct, worseningPct, insufficientPct],
//     backgroundColor: [
//       improvingColor,
//       noChangeColor,
//       worseningColor,
//       insufficientColor
//     ]
//   };

//   const centerTextPlugin = {
//     id: `centerText_${canvasId}`,
//     afterDraw(chart) {
//       const meta = chart.getDatasetMeta(0);
//       if (!meta?.data?.length) return;

//       const arc = meta.data[0];
//       const xC = arc.x;
//       const yBase = arc.y - 50;

//       const ctx = chart.ctx;
//       ctx.save();
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';

//       if (centerMode === 'stacked') {
//         ctx.fillStyle = '#000000';
//         ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
//         ctx.fillText(`${counts.improving}/${denom}`, xC, yBase - 22);

//         ctx.font = '18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
//         ctx.fillText('indicators are improving', xC, yBase - 2);
//       }

//       ctx.restore();
//     }
//   };

//   const maybeDatalabelsOff =
//     Chart.registry.plugins.get('datalabels')
//       ? { datalabels: { display: false } }
//       : {};

//   const chart = new Chart(canvas, {
//     type: 'doughnut',
//     data: {
//       labels,
//       datasets: [
//         {
//           ...dataset,
//           spacing,
//           borderColor,
//           borderWidth: 1,
//           borderAlign: 'inner',
//           hoverOffset: 0,
//           circumference: 180,
//           rotation: -90,
//           cutout: '70%'
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         ...maybeDatalabelsOff,
//         legend: { display: false },
//         tooltip: {
//           callbacks: {
//             label: (ctx) => `${(+ctx.raw).toFixed(1)}%`
//           }
//         }
//       },
//       layout: { padding: { top: 0 } }
//     },
//     plugins: [centerTextPlugin]
//   });

//   chart.metrics = {
//     counts,
//     totalEligible
//   };

//   canvas._chartInstance = chart;

//   // Update summary text
//   document.getElementById("improving-count").innerText =
//     `${counts.improving} indicators that are improving`;
//   document.getElementById("no-change-count").innerText =
//     `${counts.noChange} indicators that have seen no change`;
//   document.getElementById("worsening-count").innerText =
//     `${counts.worsening} indicators that are worsening`;
//   document.getElementById("insufficient-count").innerText =
//     `${counts.insufficient} indicators with insufficient data`;

//   return chart;
// }

// Call it
// (async () => {
//   await renderAllDomainsGauge({ canvasId: 'all_domains_gauge' });
// })();

async function getIndicatorCounts({
  includeInsufficientInDenominator = true
} = {}) {
  const performance = await loadUpdates('scripts/performance.json');

  const counts = {
    improving: 0,
    noChange: 0,
    worsening: 0,
    insufficient: 0
  };

  for (const indicators of Object.values(performance)) {
    for (const status of Object.values(indicators)) {
      switch (String(status).toLowerCase()) {
        case 'improved':
          counts.improving++;
          break;
        case 'no_change':
          counts.noChange++;
          break;
        case 'worsened':
          counts.worsening++;
          break;
        case 'insufficient_data':
          counts.insufficient++;
          break;
      }
    }
  }

  const totalEligible =
    counts.improving + counts.noChange + counts.worsening;

  const denom = includeInsufficientInDenominator
    ? totalEligible + counts.insufficient
    : totalEligible;

  const pct = (n) => (denom > 0 ? (n / denom) * 100 : 0);

  return {
    counts,
    percentages: {
      improving: pct(counts.improving),
      noChange: pct(counts.noChange),
      worsening: pct(counts.worsening),
      insufficient: pct(counts.insufficient)
    },
    text: {
      improving: `${counts.improving} indicators were improving`,
      noChange: `${counts.noChange} were not changing`,
      worsening: `${counts.worsening} were getting worse`,
      insufficient: `${counts.insufficient} did not have enough data to report on`
    }
  };
}

getIndicatorCounts().then(result => {
  document.getElementById("improving-text").innerText = result.text.improving;
  document.getElementById("nochange-text").innerText = result.text.noChange;
  document.getElementById("worsening-text").innerText = result.text.worsening;
  document.getElementById("insufficient-text").innerText = result.text.insufficient;
});


// async function renderSingleAllDomainsGauge({
//     canvasId,
//     status,                   // "improving" | "no change" | "worsening"
//     color = '#00A857',
//     centerMode = 'stacked',
//     centerTextOffsetY = 0
// } = {}) {

//     const updates = await loadUpdates('scripts/updated.json');

//     let improving = 0, noChange = 0, worsening = 0, insufficient = 0;
//     let improvingList = [], noChangeList = [], worseningList = [];

//     // classify all indicators at top-level
//     for (const [indicatorName, indicatorObj] of Object.entries(updates)) {
//         const perf = indicatorObj.performance?.toLowerCase().trim() || "insufficient data";

//         if (perf === "improving") {
//             improving++; improvingList.push(indicatorName);
//         } else if (perf === "no change") {
//             noChange++; noChangeList.push(indicatorName);
//         } else if (perf === "worsening") {
//             worsening++; worseningList.push(indicatorName);
//         } else {
//             insufficient++;
//         }
//     }

//     const total = improving + noChange + worsening;

//     const chosenCount =
//         status === "improving" ? improving :
//         status === "no change" ? noChange :
//         worsening;

//     let pct = total > 0 ? (chosenCount / total) * 100 : 0;
//     pct = Math.max(0, Math.min(100, pct));
//     const remainder = 100 - pct;

//     const canvas = document.getElementById(canvasId);
//     if (!canvas) throw new Error(`No canvas with id '${canvasId}'`);
//     if (canvas._chartInstance?.destroy) canvas._chartInstance.destroy();

//     const niceLabel =
//         status === "improving" ? "indicators improving" :
//         status === "no change" ? "indicators with no change" :
//         "indicators worsening";

//         const centerTextPlugin = {
//     id: `centerText_${canvasId}`,
//     afterDraw(chart) {
//         const meta = chart.getDatasetMeta(0);
//         if (!meta?.data?.length) return;

//         const arc = meta.data[0];
//         const ctx = chart.ctx;

//         const { width } = chart.chartArea;
        
//         // Base scaling
//         let scale = width / 300;

//         // 🔥 Extra shrink + downward shift for screens <= 767px
//         if (window.innerWidth <= 767) {
//             scale *= 0.75;     // shrink text more
//         }

//         const xC = arc.x;
//         // Move text lower on small screens
//         const yBase = arc.y - (40 * scale) + centerTextOffsetY + (window.innerWidth <= 767 ? 8 : 0);

//         ctx.save();
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillStyle = '#000';

//         if (centerMode === "stacked") {
//             ctx.font = `bold ${26 * scale}px system-ui, Segoe UI, Arial`;
//             ctx.fillText(`${chosenCount}/${total}`, xC, yBase - (18 * scale));

//             ctx.font = `${16 * scale}px system-ui, Segoe UI, Arial`;
//             ctx.fillText(niceLabel, xC, yBase + (4 * scale));
//         } else {
//             ctx.font = `bold ${24 * scale}px system-ui, Segoe UI, Arial`;
//             ctx.fillText(`${chosenCount}`, xC, yBase);
//         }

//         ctx.restore();
//     }
// };

//     const chart = new Chart(canvas, {
//         type: "doughnut",
//         data: {
//             labels: [status],
//             datasets: [{
//                 data: [pct, remainder],
//                 backgroundColor: [color, "#e6e6e6"],
//                 borderWidth: 4,
//                 hoverOffset: 0,
//                 circumference: 180,
//                 rotation: -90,
//                 cutout: "70%"
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: { legend: { display: false }, tooltip: { enabled: false } }
//         },
//         plugins: [centerTextPlugin]
//     });

//     canvas._chartInstance = chart;
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     await renderSingleAllDomainsGauge({
//         canvasId: "all_improving_gauge",
//         status: "improving",
//         color: "#00A857"
//     });

//     await renderSingleAllDomainsGauge({
//         canvasId: "all_nochange_gauge",
//         status: "no change",
//         color: "#FF6200"
//     });

//     await renderSingleAllDomainsGauge({
//         canvasId: "all_worsening_gauge",
//         status: "worsening",
//         color: "#db0000"
//     });
// });

// const key = document.createElement('div');
// key.className = 'key-wrapper';

// key.innerHTML =
//   '<div class="key-title" style="margin-right: 8px;">Key:</div>' +
//   '<div class="key-items">' +
//     '<div class="key-item row key-text"><div class="key-square positive"><div class="key-hex-label positive"></div></div>Improving</div>' +
//     '<div class="key-item row key-text"><div class="key-square neutral"><div class="key-hex-label"></div></div>No Change</div>' +
//     '<div class="key-item row key-text"><div class="key-square negative"><div class="key-hex-label negative"></div></div>Worsening</div>' +
//   '</div>';

// document.getElementById('top-container').prepend(key);

class KeyHex extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "positive";

    const config = {
      positive: {
        class: "positive",
        icon: "img/arrow-up-long-solid-full.svg",
        iconId: "arrow-up"
      },
      negative: {
        class: "negative",
        icon: "img/arrow-down-long-solid-full.svg",
        iconId: "arrow-down"
      },
      neutral: {
        class: "neutral",
        icon: "img/arrow-right-long-solid-full.svg",
        iconId: "arrow-across"
      },
      insufficient: {
        class: "insufficient",
        icon: null
      }
    };

    const { class: cls, icon, iconId } = config[type] || config.positive;

    this.innerHTML = `
      <div class="key-hex ${cls}">
        <div class="key-hex-label ${type !== "neutral" ? cls : ""}">
          ${
            icon
              ? `<img id="${iconId}" src="${icon}" alt="${type}" />`
              : ""
          }
        </div>
      </div>
    `;
  }
}

customElements.define("key-hex", KeyHex);

class KeyHexLarge extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "positive";

    const config = {
      positive: {
        class: "positive",
        icon: "img/arrow-up-long-solid-full.svg",
        iconId: "arrow-up-large"
      },
      negative: {
        class: "negative",
        icon: "img/arrow-down-long-solid-full.svg",
        iconId: "arrow-down-large"
      },
      neutral: {
        class: "neutral",
        icon: "img/arrow-right-long-solid-full.svg",
        iconId: "arrow-across-large"
      },
      insufficient: {
        class: "insufficient",
        icon: null
      }
    };

    const { class: cls, icon, iconId } = config[type] || config.positive;

    this.innerHTML = `
      <div class="key-hex-large ${cls}">
        <div class="key-hex-large-label ${type !== "neutral" ? cls : ""}">
          ${
            icon
              ? `<img id="${iconId}" src="${icon}" alt="${type}" />`
              : ""
          }
        </div>
      </div>
    `;
  }
}

customElements.define("key-hex-large", KeyHexLarge);



fetch('scripts/performance-meta.json')
  .then(res => res.json())
  .then(data => {
    const readableDate = new Date(data.last_run).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    document.getElementById('last-updated').textContent = readableDate;
  });












