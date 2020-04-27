window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'myKey',
    wsHost: window.location.hostname,
    // wsHost: '740c329a.ngrok.io',
    wsPort: 6001,
});

// window.Echo.channel('home').listen('NewMessage', (e) => {
//     console.log(e);
// });
window.Echo.channel('home').listen('NewMessage2', (res) => {
    console.log(res);
    if (res.header == 'register'){
        axios.post('drones', res);
    }
    else if (res.header == 'online'){
        axios.post(`/drones/${res.id}/online`);
    }
    else if (res.header == 'offline'){
        axios.post(`/drones/${res.id}/offline`, res);
    }
});
// window.Echo.channel('home').listen('NewMessage2', (res) => {
//     if (res.header == 'register'){
//         axios.post('drones', res);
//     }
// });

// var callback = function(eventName, data) {
//     console.log(`bind global: The event ${eventName} was triggered with data ${JSON.stringify(data)}`);
//   };
  //bind to all events on the connection
// window.Echo.bind_global(callback);// window.Echo.channel('home').listen('client-RcvEvent', (e) => {
//     console.log('Client Event Received...');
//     console.log(e);
// });
