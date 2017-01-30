browser.runtime.onMessage.addListener(notify);

function notify(message) {
    if (message.start) filterGH();
}


function filterGH() {
    var repoList = document.querySelectorAll('.repo-list li h3 a');

    var results = [];
    for (var x = 0, l = repoList.length; x < l; x++) {
        results.push(repoList[x].href)
    }
    console.log(results);
    browser.runtime.sendMessage({ "repos": results }).then(function(response) {
        document.querySelectorAll('.repo-list li').forEach(function(el, i) {
            if (response.response.indexOf(el.querySelectorAll('h3 a')[0].href) !== -1) el.style.opacity = .3
        })
    });
}
