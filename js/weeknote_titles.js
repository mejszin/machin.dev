var renderWeeknoteTitles = () => {
    let div = document.getElementById('weeknotes');
    getTask().then(task => {
        let epoch = new Date(task.variables.weeknote_epoch);
        let titles = task.variables.weeknote_titles;
        Object.keys(titles).reverse().forEach(index => {
            // Startdate
            let startdate = new Date();
            startdate.setDate(epoch.getDate() + (index * 7));
            // Anchor
            let anchor = document.createElement('a');
            anchor.href = `./weeknotes.html?week=${index}`
            div.appendChild(anchor);
            // Title
            let h1 = document.createElement('h1');
            h1.innerText = `Weeknotes ${index}: ${titles[index]}`;
            h1.classList.add('title', 'is-4');
            anchor.appendChild(h1);
            // Subtitle
            let h2 = document.createElement('h5', 'is-6');
            h2.innerText = formatDate(startdate);
            h2.classList.add('subtitle', 'is-5', 'pb-4');
            div.appendChild(h2);
        });
    });
}