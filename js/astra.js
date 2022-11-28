const base_url = 'https://astra.machin.dev/api';

var token, task_id;

fetch("../astra_token"  ).then(res => res.text()).then(txt => token   = txt);
fetch("../astra_task_id").then(res => res.text()).then(txt => task_id = txt);

var print_values = () => { console.log(token, task_id) };

var getTask = () => {
    fetch(`${base_url}/tasks/${task_id}?token=${token}`).then(response => {
    	console.log(response);
    }).catch(function (err) {
    	console.warn(err);
    });
}