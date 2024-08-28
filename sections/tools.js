export function loadTools(url) {
  const toolsContent = document.getElementById('tools-content')
  toolsContent.innerHTML = ''

  const toolCategories = [
    {
      name: 'SEO',
      tools: [
        { name: 'PageSpeed', url: `http://developers.google.com/speed/pagespeed/insights/?url=${url}`, icon: 'https://www.google.com/s2/favicons?domain=http://developers.google.com' },
        { name: 'GTmetrix', url: `http://gtmetrix.com/?url=${url}`, icon: 'https://www.google.com/s2/favicons?domain=http://gtmetrix.com/' },
        { name: 'Google Rich Results', url: `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}&user_agent=1`, icon: 'https://www.google.com/s2/favicons?domain=https://search.google.com' },
        { name: 'Majestic.com', url: `http://www.majesticseo.com/reports/site-explorer/summary/${new URL(url).hostname}`, icon: 'img/tools/seo-majestic.png' },
        { name: 'WMtips(site info)', url: `http://www.wmtips.com/tools/info/?url=${url}`, icon: 'img/tools/seo-wmtips.png' },
        { name: 'WMtips(Keyword)', url: `https://www.wmtips.com/tools/keyword-density-analyzer/?&url=${url}`, icon: 'img/tools/seo-wmtips.png' },
        { name: 'MetricSpot', url: 'http://www.metricspot.com/', icon: 'img/tools/metricspot.png' },
        { name: 'ahrefs', url: `https://app.ahrefs.com/site-explorer/overview/v2/exact/live?target=${url}`, icon: 'https://www.google.com/s2/favicons?domain=https://app.ahrefs.com/' },
        { name: 'similarweb', url: `https://www.similarweb.com/en/website/${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.similarweb.com/' },
        { name: 'SEO cheki', url: `https://seocheki.net/site-check.php?u=${url}`, icon: 'https://www.google.com/s2/favicons?domain=https://seocheki.net/' },
        { name: 'GoogleSearchConsole', url: `https://search.google.com/search-console/performance/search-analytics?resource_id=${url}&page=*/`, icon: 'https://www.google.com/s2/favicons?domain=https://search.google.com/search-console/' }
      ]
    },
    {
      name: 'HTML',
      tools: [
        { name: 'Mobile-Friendly Test', url: `https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(url)}`, icon: 'https://www.google.com/s2/favicons?domain=https://search.google.com/test/mobile-friendly' },
        { name: 'W3.org - HTML', url: `http://validator.w3.org/nu/?doc=${url}`, icon: 'img/tools/w3c-ico.png' },
        { name: 'W3.org - CSS', url: `https://jigsaw.w3.org/css-validator/validator?uri=${url}`, icon: 'https://www.google.com/s2/favicons?domain=http://jigsaw.w3.org' },
        { name: 'RESPONSINATOR', url: `https://www.responsinator.com/?url=${url}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.responsinator.com/' },
        { name: 'WhatIsMyScreenResolution', url: `http://whatismyscreenresolution.net/multi-screen-test?site-url=${url}&w=414&h=736`, icon: 'https://www.google.com/s2/favicons?domain=http://whatismyscreenresolution.net/' }
      ]
    },
    {
      name: 'Social Networks',
      tools: [
        { name: 'Facebook Debugger', url: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.facebook.com/' },
        { name: 'Twitter Card Validator', url: 'https://cards-dev.twitter.com/validator', icon: 'img/tools/twitter.jpg' },
        { name: 'Pinterest Validator', url: `https://developers.pinterest.com/tools/url-debugger/?link=${encodeURIComponent(url)}`, icon: 'img/tools/pinterest.jpg' },
        { name: 'Tweet', url: `https://twitter.com/search?f=tweets&q=${encodeURIComponent(url)}`, icon: 'https://www.google.com/s2/favicons?domain=https://twitter.com/' }
      ]
    },
    {
      name: 'Security/Malware',
      tools: [
        { name: 'McAfee SiteAdvisor', url: `http://www.siteadvisor.com/sites/${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=http://www.siteadvisor.com' },
        { name: 'Safe Browsing (Google)', url: `http://www.google.com/safebrowsing/diagnostic?site=${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=http://www.google.com/' }
      ]
    },
    {
      name: 'Others',
      tools: [
        { name: 'Google search(site:)', url: `https://www.google.com/search?q=site:${encodeURIComponent(url)}&gws_rd=cr,ssl`, icon: 'https://www.google.com/s2/favicons?domain=https://www.google.com' },
        { name: 'Similar pages (Google)', url: `https://www.google.com/search?q=related:${encodeURIComponent(url)}&gws_rd=cr,ssl`, icon: 'https://www.google.com/s2/favicons?domain=https://www.google.com' },
        { name: 'Links to this page (Google)', url: `https://www.google.com/search?q=link:${encodeURIComponent(url)}&gws_rd=cr,ssl`, icon: 'https://www.google.com/s2/favicons?domain=https://www.google.com' },
        { name: 'Google Images', url: `https://www.google.com/search?tbm=isch&q=site:${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.google.com' },
        { name: 'dnsquery.org - WHOIS', url: `https://dnsquery.org/whois/${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=https://dnsquery.org' },
        { name: 'SERPAnalytics.com', url: `http://www.serpanalytics.com/sites/${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=http://www.serpanalytics.com' },
        { name: 'quantcast.com', url: `https://www.quantcast.com/${new URL(url).hostname}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.quantcast.com' },
        { name: 'ReactionEngine.com', url: `https://www.reactionengine.com/analyse?keyphrase=&uri=${encodeURIComponent(url)}`, icon: 'https://www.google.com/s2/favicons?domain=https://www.reactionengine.com' }
      ]
    }
  ]

  const toolsContainer = document.createElement('div')
  toolsContainer.className = 'space-y-4'

  toolCategories.forEach(category => {
    const categoryElement = document.createElement('div')
    categoryElement.className = 'mb-4'
    categoryElement.innerHTML = `<h3 class="text-lg font-semibold mb-2">${category.name}</h3>`

    const toolsList = document.createElement('ul')
    toolsList.className = 'space-y-2'

    category.tools.forEach(tool => {
      const toolItem = document.createElement('li')
      toolItem.innerHTML = `
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="flex items-center text-blue-600 hover:underline">
          <img src="${tool.icon}" alt="${tool.name} icon" class="w-4 h-4 mr-2">
          <span>${tool.name}</span>
        </a>
      `
      toolsList.appendChild(toolItem)
    })

    categoryElement.appendChild(toolsList)
    toolsContainer.appendChild(categoryElement)
  })

  toolsContent.appendChild(toolsContainer)

  const instructionText = document.createElement('p')
  instructionText.className = 'text-sm text-gray-600 mt-4'
  instructionText.textContent = 'Use CTRL + CLICK to open links in background.'
  toolsContent.insertBefore(instructionText, toolsContainer)
}
