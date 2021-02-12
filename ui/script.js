function populateBlacklist(storage) {
    const textarea = document.querySelector("#blocked");
    textarea.value = storage.blacklist.join("\n");
}

function updateBlacklist() {
    const textarea = document.querySelector("#blocked");
    const blacklist = textarea.value.trim().split("\n");

    browser.storage.local.set({
        blacklist
    });
}

function onError(e) {
    console.error(e);
}

function init() {
    const textarea = document.querySelector("#blocked");
    textarea.addEventListener("change", updateBlacklist);
    browser.storage.local.get().then(populateBlacklist, onError);
}

init();