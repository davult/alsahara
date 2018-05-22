//NEW
//This is the "Offline copy of pages" wervice worker
//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function (event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function (response) {
            caches.open('pwabuilder-offline').then(function (cache) {
                console.log('[PWA Builder] Cached index page during Install' + response.url);
                return cache.addAll(['/alsahara/', '/alsahara/index.html', '/alsahara/map.html',
                    '/alsahara/sign_in.html', '/alsahara/battle.html','/alsahara/js/map_style.js', '/alsahara/js/map.js', 
                    '/alsahara/js/sign_in.js', '/alsahara/js/user.js', '/alsahara/js/battle.js', '/alsahara/js/api.js', 
                    '/alsahara/css/map.css', '/alsahara/css/style.css', '/alsahara/img/assassin.png', '/alsahara/img/mercenary.png',
                    '/alsahara/img/sorcerer.png', '/alsahara/img/logo_limpo.png', '/alsahara/img/icon-72x72.png'
                ]);
            });
        })
    );
});


//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function (event) {
    var updateCache = function (request) {
        return caches.open('pwabuilder-offline').then(function (cache) {
            return fetch(request).then(function (response) {
                console.log('[PWA Builder] add page to offline' + response.url)
                return cache.put(request, response);
            });
        });
    };

    event.waitUntil(updateCache(event.request));

    event.respondWith(
        fetch(event.request).catch(function (error) {
            console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
            return caches.open('pwabuilder-offline').then(function (cache) {
                return cache.match(event.request).then(function (matching) {
                    var report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                    return report
                });
            });
        })
    );
})
