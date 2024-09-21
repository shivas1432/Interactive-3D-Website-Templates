// Inject required Webflow attributes at the very start
document.documentElement.setAttribute('data-wf-domain', 'archena-podcast-site.webflow.io');
document.documentElement.setAttribute('data-wf-page', '6886ca8da44c595ac854e50d');
document.documentElement.setAttribute('data-wf-site', '6886ca8da44c595ac854e507');

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
                families: ["DM Sans:100,200,300,regular,500,600,700,800,900", "EB Garamond:regular,500,600,700,800,italic,500italic,600italic,700italic,800italic"]
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

function loadCounterScript() {
    // Counter animation script (the inline script you mentioned)
    const counterScript = document.createElement('script');
    counterScript.type = 'text/javascript';
    counterScript.innerHTML = `
        window.addEventListener("load", function() {
            const counters = document.querySelectorAll("[data-count]");
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    // Hapus titik ribuan, lalu ubah ke number
                    const target = parseInt(el.getAttribute("data-count").replace(/\\./g, ""), 10);
                    const duration = 3000; // in ms
                    const frameRate = 60;
                    const totalFrames = Math.round(duration / (1000 / frameRate));
                    let frame = 0;
                    const count = () => {
                        frame++;
                        const progress = frame / totalFrames;
                        const current = Math.round(target * progress);
                        // Format angka dengan pemisah ribuan
                        el.innerText = current.toLocaleString("id-ID");
                        if (frame < totalFrames) {
                            requestAnimationFrame(count);
                        } else {
                            el.innerText = target.toLocaleString("id-ID");
                        }
                    };
                    requestAnimationFrame(count);
                    observer.unobserve(el);
                });
            }, {
                threshold: 0.6
            });
            counters.forEach(el => observer.observe(el));
        });
    `;
    document.head.appendChild(counterScript);
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
    favicon.href = 'https://cdn.prod.website-files.com/6886ca8da44c595ac854e507/68946cc7599d3791f3ac0f0c_Icon%2032.png';
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/x-icon';
    document.head.appendChild(favicon);
    
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.href = 'https://cdn.prod.website-files.com/6886ca8da44c595ac854e507/68945d6c3659cb5686cae097_Icon%20256.png';
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
        
        // Load jQuery
        await loadScript(
            'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6886ca8da44c595ac854e507',
            'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
            'anonymous'
        );
        
        // Load Webflow scripts
        await loadScript('https://cdn.prod.website-files.com/6886ca8da44c595ac854e507/js/webflow.schunk.778b1a6248836936.js');
        
        await loadScript('https://cdn.prod.website-files.com/6886ca8da44c595ac854e507/js/webflow.schunk.3e0d4ec3334af7b3.js');
        
        await loadScript('https://cdn.prod.website-files.com/6886ca8da44c595ac854e507/js/webflow.b495dcb9.8df7a608a6739add.js');
        
        // Load GSAP libraries
        await loadScript('https://cdn.prod.website-files.com/gsap/3.13.0/gsap.min.js');
        
        await loadScript('https://cdn.prod.website-files.com/gsap/3.13.0/SplitText.min.js');
        
        await loadScript('https://cdn.prod.website-files.com/gsap/3.13.0/ScrollTrigger.min.js');
        
        // Load the counter script AFTER all other scripts
        loadCounterScript();
        
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
        const badges = document.querySelectorAll('.w-webflow-badge, [aria-label*="Made with Webflow"], [title*="Made with Webflow"], a[href*="webflow.com?utm_campaign"]');
        badges.forEach(badge => {
            badge.style.display = 'none';
        });
    }, 1000);
}

document.addEventListener('DOMContentLoaded', loadAllScripts);