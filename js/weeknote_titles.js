var renderWeeknoteTitles = () => {
    let div = document.getElementById('weeknotes');
    getTask().then(task => {
        let epoch_date = new Date(task.variables.weeknote_epoch);
        console.log('epoch_date=', epoch_date);
        let titles = task.variables.weeknote_titles;
        Object.keys(titles).reverse().forEach(week_no => {
            // Startdate
            let start_date = new Date(epoch_date.getTime() + (week_no * 7 * 24 * 60 * 60 * 1000));
            console.log('week_no=', week_no, 'start_date=', start_date);
            // Anchor
            let anchor = document.createElement('a');
            anchor.href = `./weeknotes.html?week=${week_no}`
            div.appendChild(anchor);
            // Title
            let h1 = document.createElement('h1');
            h1.innerText = `Weeknotes ${week_no}: ${titles[week_no]}`;
            h1.classList.add('title', 'is-4');
            anchor.appendChild(h1);
            // Subtitle
            let h2 = document.createElement('h5', 'is-6');
            h2.innerText = formatDate(start_date);
            h2.classList.add('subtitle', 'is-5', 'pb-4');
            div.appendChild(h2);
        });
    });
}