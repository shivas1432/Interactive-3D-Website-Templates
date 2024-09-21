// Inject required Webflow attributes at the very start
document.documentElement.setAttribute('data-wf-domain', 'hyperfit.webflow.io');
document.documentElement.setAttribute('data-wf-page', '683831da792ffd3d821f0bf4');
document.documentElement.setAttribute('data-wf-site', '683831da792ffd3d821f0be5');

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

function loadInlineScript() {
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

function loadFavicons() {
    const favicon = document.createElement('link');
    favicon.href = 'https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/6852c3b04b93aa3428cf1ade_favicon.png';
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/x-icon';
    document.head.appendChild(favicon);
    
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.href = 'https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/6852c3b4a3d5b54cc97cc340_webclip.png';
    appleTouchIcon.rel = 'apple-touch-icon';
    document.head.appendChild(appleTouchIcon);
}

async function loadAllScripts() {
    try {
        loadInlineScript();
        loadMeta();
        loadFavicons();
        
        await loadScript(
            'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=683831da792ffd3d821f0be5',
            'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
            'anonymous'
        );
        
        await loadScript('https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/js/webflow.schunk.36b8fb49256177c8.js');
        
        await loadScript('https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/js/webflow.schunk.82f44582d86d1ea9.js');
        
        await loadScript('https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/js/webflow.schunk.7ca1cbaf2b24816e.js');
        
        await loadScript('https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/js/webflow.schunk.f919141e3448519b.js');
        
        await loadScript('https://cdn.prod.website-files.com/683831da792ffd3d821f0be5/js/webflow.84135b35.e8fbd3e0a08598ec.js');
        
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
    
    setTimeout(function() {
        const lateBadge = document.querySelector('.w-webflow-badge');
        if (lateBadge) {
            lateBadge.style.display = 'none';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', loadAllScripts);