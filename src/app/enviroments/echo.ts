import Echo from 'laravel-echo';

export const echo = new Echo({
    broadcaster: 'pusher',
    key: 'asdfgh',
    cluster: 'mt1',
    enableTransports: ['ws'],
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    // authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth'
  });