// Inject required Webflow attributes at the very start
document.documentElement.setAttribute('data-wf-domain', 'kitzykids.webflow.io');
document.documentElement.setAttribute('data-wf-page', '66aa15add5b3293aa92ef8f0');
document.documentElement.setAttribute('data-wf-site', '66aa15add5b3293aa92ef8ec');

function loadScript(src, integrity = null, crossorigin = null) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        
        if (integrity) {
            script.integrity = integrity;
        }
        if (crossorigin) {
            script.crossOrigin = crossorigin;
        }
        
        script.onload = resolve;
        script.onerror = reject;
        
        document.head.appendChild(script);
    });
}

function loadWebFontScript() {
    // Load WebFont script after the library is loaded
    const webFontScript = document.createElement('script');
    webFontScript.type = 'text/javascript';
    webFontScript.innerHTML = `
        WebFont.load({
            google: {
                families: ["Marko One:regular", "DM Sans:300,regular,500,600,700,800,900"]
            }
        });
    `;
    document.head.appendChild(webFontScript);
}

function loadInlineScripts() {
    // Webflow touch script
    const touchScript = document.createElement('script');
    touchScript.type = 'text/javascript';
    touchScript.innerHTML = `
        !function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);
    `;
    document.head.appendChild(touchScript);
}

function loadMeta() {
    const viewport = document.createElement('meta');
    viewport.content = 'width=device-width, initial-scale=1';
    viewport.name = 'viewport';
    document.head.appendChild(viewport);
    
    const generator = document.createElement('meta');
    generator.content = 'Webflow';
    generator.name = 'generator';
    document.head.appendChild(generator);
}

function loadFont() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com';
    link.rel = 'preconnect';
    document.head.appendChild(link);
    
    const link2 = document.createElement('link');
    link2.href = 'https://fonts.gstatic.com';
    link2.rel = 'preconnect';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);
}

function loadFavicons() {
    const favicon = document.createElement('link');
    favicon.href = 'https://cdn.prod.website-files.com/668bbb7e6761b1d38cd90bb1/66a231a4223a4bdac2befe57_Kidzykids-fev.png';
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/x-icon';
    document.head.appendChild(favicon);
    
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.href = 'https://cdn.prod.website-files.com/668bbb7e6761b1d38cd90bb1/66a231b78789a281ef372aad_Kidzykids-web.png';
    appleTouchIcon.rel = 'apple-touch-icon';
    document.head.appendChild(appleTouchIcon);
}

async function loadAllScripts() {
    try {
        loadInlineScripts();
        loadMeta();
        loadFont();
        loadFavicons();
        
        // Load WebFont library FIRST
        await loadScript('https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        // THEN load the WebFont configuration
        loadWebFontScript();
        
        await loadScript(
            'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66aa15add5b3293aa92ef8ec',
            'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
            'anonymous'
        );
        
        await loadScript('https://cdn.prod.website-files.com/66aa15add5b3293aa92ef8ec/js/webflow.274c97218.js');
        
        hideBadge();
        
    } catch (error) {
        console.error('Script loading failed:', error);
    }
}

function hideBadge() {
    const badge = document.querySelector('.w-webflow-badge');
    if (badge) {
        badge.style.display = 'none';
    }
    
    // Also hide any "Made with Webflow" links that appear later
    setTimeout(function() {
        const badges = document.querySelectorAll('.w-webflow-badge, [aria-label*="Made with Webflow"], [title*="Made with Webflow"], a[href*="webflow.com?utm_campaign"]');
        badges.forEach(badge => {
            badge.style.display = 'none';
        });
    }, 1000);
}

document.addEventListener('DOMContentLoaded', loadAllScripts);