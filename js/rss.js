var renderRSSFeed = (url = 'https://lor.sh/@louis.rss') => {
    fetch(url).then(response => response.text()).then(text => {
        xmlDoc = (new DOMParser()).parseFromString(text, 'text/xml');
        let parent = document.getElementById('rss-feed');
        let feed = xmlDoc.getElementsByTagName('item');
        for (i = 0; i < feed.length; i++) {
            let description, pubDate, link;
            let media = null;
            let categories = [];
            for (j = 0; j < feed[i].childNodes.length; j++) {
                let node = feed[i].childNodes[j];
                if (node.nodeType !== Node.TEXT_NODE) {
                    //  console.log(node, node.nodeName, node.textContent);
                    switch (node.nodeName) {
                        case 'description':
                            description = node.textContent;
                            break;
                        case 'pubDate':
                            pubDate = new Date(node.textContent);
                            break;
                        case 'link':
                            link = node.textContent;
                            break;
                        case 'category':
                            categories.push(node.textContent);
                            break;
                        case 'media:content':
                            if (node.getAttribute('medium') == 'image') {
                                media = node.getAttribute('url');
                            }
                            break;
                        default:
                            console.warn(`Couldn't parse '${node.nodeName}' node`);
                    }
                }
            }
            // Render
            let div = document.createElement('div');
            div.classList.add('content');
            parent.appendChild(div);
            // Description
            let a = document.createElement('a');
            a.href = link;
            a.classList.add('description');
            a.innerHTML = description;
            div.appendChild(a);
            // Media
            if (media !== null) {
                let img = document.createElement('img');
                img.classList.add('py-4');
                img.src = media;
                div.appendChild(img);
            }
            // Tags
            let tags = document.createElement('div');
            tags.classList.add('tags', 'are-small');
            div.appendChild(tags);
            // Date
            let span = document.createElement('span');
            span.classList.add('tag', 'is-white', 'pl-0', 'py-0');
            span.innerHTML = formatDate(pubDate, true);
            tags.appendChild(span);
            // Categories
            categories.forEach(category => {
                span = document.createElement('span');
                span.classList.add('tag');
                span.innerHTML = category;
                tags.appendChild(span);
            })
            // Divider
            if (i !== feed.length - 1) {
                let div = document.createElement('div');
                div.classList.add('is-divider', 'my-0', 'mb-4');
                parent.appendChild(div);
            }
        }
    });
}