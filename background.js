browser.runtime.onMessage.addListener(notify);

function notify(message, sender, sendResponse) {
    var results = [];
    var promises = [];
    for (var x = 0, l = message.repos.length; x < l; x++) {
        var promise = browser.bookmarks.search({ url: message.repos[x] });
        promises.push(promise);

    }
    Promise.all(promises).then(values => {

        var final = values.filter(function(el) {
            return el.length;
        }).map(function(el) {
            return el[0].url;
        })
        sendResponse({ response: final });
    });
    return true;
}

function logURL(requestDetails) {
    browser.tabs.sendMessage(
        requestDetails.tabId, { start: true }
    );
}

browser.webRequest.onCompleted.addListener(
    logURL, { urls: ["*://github.com/search*"] }
);
