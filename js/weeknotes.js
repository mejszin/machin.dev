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
        p.innerText = paragraph;
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