var formatDate = (date, time = false) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
    let ordinals = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
    let ordinal = (date.getDate() in ordinals) ? ordinals[date.getDate()] : 'th';
    if (time == false) { return `${date.getDate()}${ordinal} ${month} ${date.getFullYear()}` };
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute} — ${date.getDate()}${ordinal} ${month} ${date.getFullYear()}`;
}