var formatDate = (date) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
    let ordinals = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
    let ordinal = (date.getDate() in ordinals) ? ordinals[date.getDate()] : 'th';
    return `${date.getDate()}${ordinal} ${month} ${date.getFullYear()}`
};