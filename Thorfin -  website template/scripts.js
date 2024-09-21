// Inject required Webflow attributes at the very start
document.documentElement.setAttribute('data-wf-domain', 'thorfin.webflow.io');
document.documentElement.setAttribute('data-wf-page', '686b9881baea94f8cf4d8d11');
document.documentElement.setAttribute('data-wf-site', '686b9881baea94f8cf4d8ce2');

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
                families: ["Roboto:100,200,300,regular,500,600,700,800,900", "Pixelify Sans:regular,500,600,700"]
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
    
    const description = document.createElement('meta');
    description.content = 'Thorfin Portfolio Template is a minimalist and modern website template designed to showcase your work in just a few smooth scrolls. It features a clean and elegant layout, making your portfolio visually appealing and easy to navigate. With built-in CMS Collections, most of the content is easily customizable—no coding needed.';
    description.name = 'description';
    document.head.appendChild(description);
    
    const ogTitle = document.createElement('meta');
    ogTitle.content = 'Thorfin - Webflow HTML website template';
    ogTitle.property = 'og:title';
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.content = 'Thorfin Portfolio Template is a minimalist and modern website template designed to showcase your work in just a few smooth scrolls. It features a clean and elegant layout, making your portfolio visually appealing and easy to navigate. With built-in CMS Collections, most of the content is easily customizable—no coding needed.';
    ogDescription.property = 'og:description';
    document.head.appendChild(ogDescription);
    
    const ogImage = document.createElement('meta');
    ogImage.content = 'https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/686e26f96e90a0e9594aeeb5_thorfin-.webp';
    ogImage.property = 'og:image';
    document.head.appendChild(ogImage);
    
    const twitterTitle = document.createElement('meta');
    twitterTitle.content = 'Thorfin - Webflow HTML website template';
    twitterTitle.property = 'twitter:title';
    document.head.appendChild(twitterTitle);
    
    const twitterDescription = document.createElement('meta');
    twitterDescription.content = 'Thorfin Portfolio Template is a minimalist and modern website template designed to showcase your work in just a few smooth scrolls. It features a clean and elegant layout, making your portfolio visually appealing and easy to navigate. With built-in CMS Collections, most of the content is easily customizable—no coding needed.';
    twitterDescription.property = 'twitter:description';
    document.head.appendChild(twitterDescription);
    
    const twitterImage = document.createElement('meta');
    twitterImage.content = 'https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/686e26f96e90a0e9594aeeb5_thorfin-.webp';
    twitterImage.property = 'twitter:image';
    document.head.appendChild(twitterImage);
    
    const ogType = document.createElement('meta');
    ogType.property = 'og:type';
    ogType.content = 'website';
    document.head.appendChild(ogType);
    
    const twitterCard = document.createElement('meta');
    twitterCard.content = 'summary_large_image';
    twitterCard.name = 'twitter:card';
    document.head.appendChild(twitterCard);
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
    favicon.href = 'https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/686b9908ba19eb1109de2d88_Logo%20(2)%20(2).webp';
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/x-icon';
    document.head.appendChild(favicon);
    
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.href = 'https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/686b98f7061e5c39df059a9b_Logo%20(2)%20(1).webp';
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
            'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=686b9881baea94f8cf4d8ce2',
            'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
            'anonymous'
        );
        
        await loadScript('https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/js/webflow.schunk.57d5559d2f0cd9f8.js');
        
        await loadScript('https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/js/webflow.schunk.62a1d2a7ab1f3e1e.js');
        
        await loadScript('https://cdn.prod.website-files.com/686b9881baea94f8cf4d8ce2/js/webflow.45380d8e.61cd61a438cfac7f.js');
        
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