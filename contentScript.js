(function() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'analyzePage') {
            const result = analyzePage();
            sendResponse(result);
        } else if (request.action === 'getSummaryData') {
            const summaryData = getSummaryData();
            sendResponse(summaryData);
        }
    });

    function analyzePage() {
        const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
            tag: h.tagName,
            text: h.innerText.trim()
        }));

        const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            title: img.title
        }));

        const links = Array.from(document.querySelectorAll('a')).map(a => ({
            href: a.href,
            text: a.innerText.trim(),
            title: a.title
        }));

        const social = Array.from(document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')).map(meta => ({
            property: meta.getAttribute('property') || meta.getAttribute('name'),
            content: meta.content
        }));

        return {
            headers,
            images,
            links,
            social
        };
    }

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

        // Get all meta tags
        const metaTags = Array.from(document.getElementsByTagName('meta')).map(tag => ({
            name: tag.getAttribute('name') || tag.getAttribute('property'),
            content: tag.getAttribute('content')
        })).filter(tag => tag.name && tag.content);

        // Get page speed data
        const pageSpeed = {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
        };

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
            lang,
            metaTags,
            pageSpeed
        };
    }
})();
