var replaceLinks = (str) => {
    const full_regex = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm
    const caption_regex = /\[(.*?)\]/
    const link_regex = /\((.*?)\)/
    str.match(full_regex).forEach(full_link => { 
        let caption = full_link.match(caption_regex)[1];
        let link = full_link.match(link_regex)[1]
        str = str.replace(full_link, `<a href="${link}" target="_blank">${caption}</a>`);
    });
    return str;
};

var renderWeeknote = () => {
    getTask().then(task => {
        let parent = document.getElementById('weeknote-title');
        let h1 = document.createElement('h1');
        h1.classList.add('title', 'is-2');
        h1.innerText = `Weeknotes ${week}`;
        parent.appendChild(h1);
        let h2 = document.createElement('h2');
        h2.classList.add('subtitle', 'is-4');
        h2.innerText = task.variables.weeknote_titles[week];
        parent.appendChild(h2);
    });
    renderWeeknoteFeed();
}

var renderWeeknoteFeed = () => {
    getWeekFeed(week).then(entries => {
        // Create entries list
        let parent = document.getElementById('weeknote-content');
        let ul = document.createElement('ul');
        ul.id = 'entries';
        ul.classList.add('mt-0')
        parent.appendChild(ul);
        // Render entries
        entries.forEach(entry => {
            console.log(entry);
            switch (entry.type) {
                case 'text':
                    // render text
                    console.log(entry.content.text);
                    renderText(entry.content.text);
                    break;
                case 'code':
                    // render code
                    console.log(entry.content.text, entry.content.language);
                    renderCode(entry.content.text, entry.content.language);
                    break;
                case 'gpx':
                    // render gpx
                    console.log(entry.content.uri);
                    renderGPX(entry.content.basename, entry.content.uri);
                    break;
                default:
                    console.log(`Cannot render '${entry.type}'`)
            }
        });
    });
}

var renderText = (text) => {
    let parent = document.getElementById('entries');
    let li = document.createElement('li');
    li.classList.add('pb-2');
    parent.appendChild(li);
    text.split("\n").forEach(paragraph => {
        let p = document.createElement('p');
        str = replaceLinks(paragraph);
        console.log(str);
        p.innerHTML = str;
        li.appendChild(p);
    });
}

var renderGPX = (basename, uri) => {
    let parent = document.getElementById('entries');
    let div = document.createElement('div');
    div.id = `map_${basename}`;
    div.classList.add('gpx-map', 'mt-2', 'mb-4');
    parent.appendChild(div);
    renderMap(div.id, uri);
}

var renderCode = (text, language='text') => {
    let parent = document.getElementById('entries');
//  let li = document.createElement('li');
//  li.classList.add('pb-2');
//  parent.appendChild(li);
    let pre = document.createElement('pre');
    pre.classList.add('p-0');
    parent.appendChild(pre);
    let code = document.createElement('code');
    code.classList.add(`language-${language}`, 'p-0', 'py-4');
    code.innerHTML = text.replaceAll('\t', '  ');
    pre.appendChild(code);
    hljs.highlightElement(code, language);
}