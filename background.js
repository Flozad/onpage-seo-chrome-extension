chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSummaryData' || request.action === 'analyzePage') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: request.action === 'getSummaryData' ? getSummaryData : analyzePage
                },
                (results) => {
                    sendResponse(results[0].result);
                }
            );
        });
        return true; // Keeps the message channel open for async response
    }
});

function getSummaryData() {
    const title = document.querySelector('title')?.textContent || '';
    const titleLength = title.length || 0;

    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const descriptionLength = description.length || 0;

    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';

    const url = window.location.href;

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';

    const author = document.querySelector('meta[name="author"]')?.getAttribute('content') || '';

    const publisher = document.querySelector('meta[name="publisher"]')?.getAttribute('content') || '';

    const lang = document.documentElement.lang || '';

    return {
        title,
        titleLength,
        description,
        descriptionLength,
        keywords,
        url,
        canonical,
        robots,
        author,
        publisher,
        lang
    };
}

function analyzePage() {
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.innerText.trim()
    }));

    const images = Array.from(document.querySelectorAll('img')).map(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        const format = src.split('.').pop().toLowerCase();
        return {
            src: src,
            alt: img.alt || '',
            title: img.getAttribute('title') || '',
            width: img.width || null,
            height: img.height || null,
            loading: img.loading || 'auto',
            format: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(format) ? format : 'other'
        };
    });

    const links = Array.from(document.querySelectorAll('a')).map(a => ({
        href: a.href,
        text: a.innerText.trim() || "No Text",
        title: a.title || "No TITLE",
        rel: a.rel
    }));

    const social = Array.from(document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')).map(meta => ({
        property: meta.getAttribute('property') || meta.getAttribute('name'),
        content: meta.content,
        url: meta.url
    }));

    return {
        headers,
        images,
        links,
        social,
        url: window.location.href
    };
}

function createImageData(image) {
    const div = document.createElement('div')
    div.className = 'flex-1'
    div.innerHTML = `
        <p class="text-muted-foreground break-all">SRC: ${image.src}</p>
        ${image.alt ? `<p>ALT: ${image.alt}</p>` : '<p class="text-red-500">No ALT</p>'}
        ${image.title ? `<p>TITLE: ${image.title}</p>` : '<p class="text-red-500">No TITLE</p>'}
        ${image.width && image.height ? `<p>Size: ${image.width}x${image.height}</p>` : '<p class="text-yellow-500">No Size</p>'}
        ${image.loading ? `<p>Loading: ${image.loading}</p>` : ''}
        <p>Format: ${image.format}</p>
    `
    return div
}
