var navlinks = {
    'Louis Machin': '/',
//  'Projects': '',
    'Mastodon': 'https://lor.sh/@louis',
    'GitHub': 'https://github.com/mejszin',
    'Instagram': 'https://instagram.com/mejszin',
    'YouTube': 'https://youtube.com/@louismachin',
}

var renderNavbar = (active = null) => {
    // navbar-menu
    let navbar_menu = document.getElementById('navbar-menu');
    navbar_menu.classList.add('navbar-menu', 'pb-6');
    // navbar-start
    let navbar_start = document.createElement('div');
    navbar_start.classList.add('navbar-start');
    navbar_menu.appendChild(navbar_start);
    // navbar-item
    Object.keys(navlinks).forEach(caption => {
        let navbar_item = document.createElement('a');
        navbar_item.classList.add('pl-0', 'pr-4', 'navbar-item');
        if (active == caption) { navbar_item.classList.add('is-active') };
        navbar_item.innerText = caption;
        navbar_item.href = navlinks[caption];
        navbar_start.append(navbar_item);
    });
}