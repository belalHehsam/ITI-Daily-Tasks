const filesToCache = [
    'CSS/main.css',
    'js/main.js',
    'pages/404.html',
    'pages/offline.html',
    'CSS/offline.css',
    'CSS/404.css'
]

const CacheName = "Files";

self.addEventListener('install', function (event) {
    console.log("Servicesss installing Successfully...", event);
    self.skipWaiting()///aqr2 el gded daimn w w overiride 3la el adem
    event.waitUntil(
        self.caches.open(CacheName)
            .then(cache => {
                return cache.addAll(filesToCache)
            })
    )
})


self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CacheName) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});



self.addEventListener("fetch", (event) => {
    console.log("request send....", event.request.url);

    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {

            if (cacheResponse) {
                return cacheResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {

                    if (networkResponse.status === 404) {
                        return caches.match("pages/404.html");
                    }

                    return caches.open(CacheName).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match("pages/offline.html");
                });
        })
    );
});







// self.addEventListener("activate", (event) => {
//     event.waitUntil(
//         caches.keys().then((keys) => {
//             return Promise.all(
//                 keys.map((key) => {
//                     if (key !== CacheName) {
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
// });
