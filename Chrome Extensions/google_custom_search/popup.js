var API_KEY = "YOUR API KEY HERE";

function renderStatus(statusText) {
    document.getElementById('search-result').textContent = statusText;
}

/**
 * Get the current URL.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

/**
 * Executes a Google Custom Search API query
 */
function googleCustomSearch(searchTerm, callback, errorCallback) {
    var searchUrl = "https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=017576662512468239146:omuauf_lfve&q=" + searchTerm;

    // request config and handlers
    var x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    x.responseType = 'json';

    x.onload = function () {
        var response = x.response;
        if (!response || !response.items || !response.items.length === 0) {
            errorCallback('No response from Google Custom search!');
            return;
        }

        callback(searchTerm, response.items);
    };

    x.onerror = function () {
        errorCallback('Network error.');
    };

    // execute request
    x.send();
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (url) {
        renderStatus('Performing Google Custom search for ' + url);

        googleCustomSearch(
            url,
            function (searchedTerm, resultList) {
                // clears HTML
                var listEl = document.getElementById('search-result');
                listEl.textContent = "";

                // appends results to the list
                var list = document.createElement('ul');
                for (var i = 0; i < resultList.length; i++) {
                    var item = document.createElement('li');
                    item.appendChild(document.createTextNode(resultList[i].title));
                    list.appendChild(item);
                }

               // add to the DOM
               listEl.appendChild(list);
            },

            function (errorMessage) {
                renderStatus('Cannot display results: ' + errorMessage);
            }
        );
    });
});