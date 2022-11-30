// -------------------native host-----------------------------
let port = null;
const nativeHostName = "com.chenhao.exe_demo";

//connect to native host and get the communicatetion port  
function connectToNativeHost() {
    if (port) {
        console.log('connected!!!')
        return;
    }
    port = chrome.runtime.connectNative(nativeHostName);

    // listen native exe message
    port.onMessage.addListener(nativeReceviedMessage);

    // listen native exe disconnect
    port.onDisconnect.addListener(nativeDisconnectListener);
}

function nativeReceviedMessage(message) {
    console.log('recieved message from native exe: ' + JSON.stringify(message));
}

function nativeDisconnectListener() {
    console.log('disconnected from native app.');
    console.log('error:', chrome.runtime.lastError);

    port = null;
}

function sendNativeMessage(msg) {
    // send message
    port && port.postMessage(msg);
}


// ---------------------content.js message--------------------------
chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(request, sender, sendResponse) {
    console.log('background message listener, type: ' + request.type)
    if (request.type === "connect") {
        connectToNativeHost();

        // 等待 nativeDisconnectListener 回调执行，如果失败，则执行。目的是为了index.html的连接状态显示正确！！！
        setTimeout(() => sendResponse(!!port), 1000)
    } else if (request.type === "disconnect") {
        port && port.disconnect();
        sendResponse(false);
    } else if (request.type === "send") {
        console.log('background message listener, send message: ' + request.message)
        sendNativeMessage(request.message);
    }
    return true;
}