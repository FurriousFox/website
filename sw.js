const static = ["/favicon.ico", "/fonts/uisli.ttf", "/fonts/subset-Symbol.woff2", "/fonts/oeui.ttf", "/fonts/subset.woff2", "/fonts/oeuiz.ttf", "/fonts/uili.woff2", "/fonts/uisb.ttf", "/fonts/oeui.woff2", "/fonts/oeuii.ttf", "/fonts/uisbi.ttf", "/fonts/oeuisl.ttf", "/fonts/uisli.woff2", "/fonts/uibli.ttf", "/fonts/uisym.woff2", "/fonts/uisb.woff2", "/fonts/oeuisl.woff2", "/fonts/oeuib.woff2", "/fonts/subset-Symbol.ttf", "/fonts/uiemj.woff2", "/fonts/uiemj.ttf", "/fonts/oeuiz.woff2", "/fonts/uihis.ttf", "/fonts/oeuii.woff2", "/fonts/uisbi.woff2", "/fonts/subset.ttf", "/fonts/oeuil.ttf", "/fonts/uibl.ttf", "/fonts/uisym.ttf", "/fonts/uibl.woff2", "/fonts/uibli.woff2", "/fonts/uili.ttf", "/fonts/subset-Bold.woff2", "/fonts/subset-Bold.ttf", "/fonts/oeuil.woff2", "/fonts/oeuib.ttf", "/fonts/uihis.woff2", "/icon.png", "/images/Inlook.webp", "/images/Bopper.webp", "/images/Foresight.webp", "/images/FurriousFox.webp"];
const prefetch = ["/favicon.ico", "/icon.png", "/images/Inlook.webp", "/images/Bopper.webp", "/images/Foresight.webp", "/images/FurriousFox.webp", "/"];


self.addEventListener("install", (_event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open("argv");
        await cache.addAll(prefetch);

        await clients.claim();
    })());
});

self.addEventListener("fetch", (event) => {
    let a = false;
    let b = false;
    event.respondWith((async () => {
        const pathname = new URL(event.request.url).pathname;

        if (static.includes(pathname)) {
            const r = await caches.match(event.request);
            if (r) return r;

            const response = await fetch(event.request);
            if (response.status === 200) {
                const cache = await caches.open("argv");
                cache.put(event.request, response.clone());
            }
            return response;
        }

        if (pathname == "/" || pathname == "/index.html") {
            const postfetch = (async () => {
                const response = await fetch(event.request);
                if (response.status === 200) {
                    if (!a && !b) {
                        const old_res = await (await caches.match(event.request)).text();
                        const new_res = await response.clone().text();

                        if (new_res == old_res || new_res.length < 1) return;

                        const client = await self.clients.get(event.resultingClientId || event.clientId);
                        if (client) {
                            client.postMessage(await response.clone().blob());
                        }
                    }

                    const cache = await caches.open("argv");
                    cache.put(event.request, response.clone());
                }

                return response;
            })();
            event.waitUntil(postfetch);

            const r = await caches.match(event.request);
            if (r) {
                setTimeout(() => b = true, 500);
                return r;
            }

            a = true;
            return await postfetch;
        }

        const response = await fetch(event.request);
        return response;
    })());
});