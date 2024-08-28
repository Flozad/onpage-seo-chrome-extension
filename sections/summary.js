export function loadSummary(summaryData) {
    console.log('summaryData', summaryData)
    const elements = [
        { id: 'page-title', label: 'Title', text: summaryData.title, fallback: 'No title available' },
        { id: 'title-length', label: 'Title Length', text: `${summaryData.titleLength} characters` },
        { id: 'page-description', label: 'Description', text: summaryData.description, fallback: 'No description available' },
        { id: 'description-length', label: 'Description Length', text: `${summaryData.descriptionLength} characters` },
        { id: 'page-keywords', label: 'Keywords', text: summaryData.keywords, fallback: 'Keywords are missing!' },
        { id: 'page-url', label: 'URL', text: summaryData.url, fallback: 'No URL found' },
        { id: 'page-canonical', label: 'Canonical URL', text: summaryData.canonical, fallback: 'No canonical URL found' },
        { id: 'page-robots', label: 'Robots', text: summaryData.robots, fallback: 'No robots tag found' },
        { id: 'page-author', label: 'Author', text: summaryData.author, fallback: 'Author is missing.' },
        { id: 'page-publisher', label: 'Publisher', text: summaryData.publisher, fallback: 'Publisher is missing.' },
        { id: 'page-lang', label: 'Language', text: summaryData.lang, fallback: 'Language not specified' }
    ]

    elements.forEach(({ id, label, text, fallback }) => {
        const element = document.getElementById(id)
        if (element) {
            element.textContent = text || fallback
        } else {
            console.warn(`Element with id '${id}' not found`)
        }
    })

    // Add meta tags summary
    const metaTagsSummary = createMetaTagsSummary(summaryData.metaTags)
    document.getElementById('meta-tags-summary').appendChild(metaTagsSummary)

    // Add page speed summary
    const pageSpeedSummary = createPageSpeedSummary(summaryData.pageSpeed)
    document.getElementById('page-speed-summary').appendChild(pageSpeedSummary)
}

function createMetaTagsSummary(metaTags) {
    const metaTagsSummary = document.createElement('div')
    metaTagsSummary.className = 'sum-info-item'
    
    const title = document.createElement('div')
    title.className = 'title strong'
    title.textContent = 'Meta Tags'
    
    const desc = document.createElement('div')
    desc.className = 'desc'
    
    if (metaTags.length > 0) {
        const list = document.createElement('ul')
        metaTags.forEach(tag => {
            const item = document.createElement('li')
            item.textContent = `${tag.name}: ${tag.content}`
            list.appendChild(item)
        })
        desc.appendChild(list)
    } else {
        desc.textContent = 'No meta tags found.'
    }
    
    metaTagsSummary.appendChild(title)
    metaTagsSummary.appendChild(desc)
    
    return metaTagsSummary
}

function createPageSpeedSummary(pageSpeed) {
    const pageSpeedSummary = document.createElement('div')
    pageSpeedSummary.className = 'sum-info-item'
    
    const title = document.createElement('div')
    title.className = 'title strong'
    title.textContent = 'Page Speed'
    
    const desc = document.createElement('div')
    desc.className = 'desc'
    
    const table = document.createElement('table')
    table.className = 'speedTable'
    
    if (pageSpeed) {
        Object.entries(pageSpeed).forEach(([key, value]) => {
            const row = table.insertRow()
            const keyCell = row.insertCell(0)
            const valueCell = row.insertCell(1)
            keyCell.textContent = key
            valueCell.textContent = `${value} ms`
        })
    } else {
        const row = table.insertRow()
        const cell = row.insertCell(0)
        cell.textContent = 'No page speed data available'
    }
    
    desc.appendChild(table)
    pageSpeedSummary.appendChild(title)
    pageSpeedSummary.appendChild(desc)
    
    return pageSpeedSummary
}
