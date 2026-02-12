const files = [
    'Css/main.css',
    'index.html',
    'js/main.js'
]
const Caches = "Files";

self.addEventListener("install", event => {
    console.log(event);
    self.skipWaiting();
    event.waitUntil(
        caches.open(Caches).then(cach => {
            return cach.addAll(files);
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(k => k !== Caches)
                    .map(k => caches.delete(k))
            );
        })
    );
});



self.addEventListener("notificationclick", event => {
    console.log(event);
    const notifigation = event.notification;
    const action = event.action;
    if (action == 'explore') {
        console.log(clients)
        clients.openWindow('Pages/task.html')
    }
    else {
        console.log("closeddd");
    }
    notifigation.close()
})