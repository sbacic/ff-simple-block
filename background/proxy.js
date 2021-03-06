let blacklist = [];

function init() {
    // On install
    browser.runtime.onInstalled.addListener(() => {
        browser.storage.local.set({blacklist});
    });

    // On browser start
    browser.storage.local.get(data => {
        if (data.blacklist) {
            blacklist = data.blacklist;
        }
    });

    // On blacklist change
    browser.storage.onChanged.addListener(data => {
        blacklist = data.blacklist.newValue;
      });

    // On request
    browser.proxy.onRequest.addListener(handleRequest, {urls: ["<all_urls>"], types: ["main_frame"]});

    // On error
    browser.proxy.onError.addListener(error => {
        console.error(`Proxy error: ${error.message}`);
    });
}

function hasMatch(blacklist, hostname) {
    const cast = blacklist.map(pattern => {
        try {
            return new RegExp(pattern);
        } catch (e) {
            return pattern;
        }
    });

    return cast.find(pattern => hostname.match(pattern) !== null);
}

function handleRequest(request) {
    const url = new URL(request.url);
    const fullpath = url.hostname + url.pathname;

    if (blacklist.filter(value => value !== "").length && hasMatch(blacklist, fullpath)) {
        return {type: "http", host: "127.0.0.1", port: 6666};
    } else {
        return {type: "direct"};
    }
}

init();
