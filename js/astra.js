const base_url = 'https://astra.machin.dev/api';

var token, task_id, week;

fetch("../astra_task_id").then(res => res.text()).then(txt => task_id = txt);

var assignValues = () => {
    return new Promise(resolve => {
        week = parseInt((new URLSearchParams(window.location.search)).get('week'));
        fetch("../astra_token"  ).then(response => response.text()).then(text => {
            token = text;
            fetch("../astra_task_id").then(response => response.text()).then(text => {
                task_id = text;
                resolve();
            });
        });
    });
}

var getTask = () => {
    return new Promise(resolve => {
        fetch(`${base_url}/tasks/${task_id}?token=${token}`).then(response => {
        	response.json().then(data => {
                console.log(data);
                resolve(data);
            });
        }).catch(function (err) {
        	console.warn(err);
            resolve({});
        });
    });
}

var getWeekFeed = (week_no) => {
    return new Promise(resolve => {
        getTask().then(task => {
            // Epoch date
            let epoch_date = new Date(task.variables.weeknote_epoch);
            // Start date
            let start_date = new Date(epoch_date.getTime() + (week_no * 7 * 24 * 60 * 60 * 1000));
            console.log('start_date=', start_date);
            // End date
            let end_date = new Date(epoch_date.getTime() + ((week_no + 1) * 7 * 24 * 60 * 60 * 1000));
            console.log('end_date=', end_date);
            // Feed
            let feed = []
            Object.keys(task.feed).forEach(feed_id => {
                let entry = task.feed[feed_id];
                let created = entry.time.created * 1000;
                if ((start_date < created) && (created < end_date)) {
                    feed.push(entry);
                }
            });
            resolve(feed);
        })
    });
}