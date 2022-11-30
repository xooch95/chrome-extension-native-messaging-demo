const sm = chrome.runtime.sendMessage;

document.addEventListener('SendMessageFromJs', function (evt) {
  console.log('SendMessageFromJs start', evt);

  sm(evt.detail, (response) => {
    document.dispatchEvent(new CustomEvent('SendMessageFromExtension', {
      detail: {request: evt.detail, result: response}
    }))
  })
}, false);

console.log("loaded content.js!!!")