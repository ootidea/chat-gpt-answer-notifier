<h1 align="center">Chat GPT Answer Notifier</h1>

This is a Chrome extension that notifies you when a Chat GPT response is complete.  
You can install it on [the Chrome Web Store page](https://chrome.google.com/webstore/detail/chat-gpt-response-notifie/bonigohnnoodjnahekojpcdffmekecbo/).  

## Feature
- Notifies when the Chat GPT response (answer) is complete, if the tab/window is in the background
- Clicking the notification will take you back to the Chat GPT tab/window
- It only works on the official Chat GPT site

## Are notifications not displaying on macOS?

On macOS, Chrome notifications might be turned off.  
Please check `Allow Notifications` under System Preferences > Notifications > Google Chrome.  

## Method of determining response completion

This extension does not monitor the network. Instead, it observes the page state (DOM) to determine when a response is complete.  
Specifically, it checks whether an DOM element with the CSS class `result-streaming` exists or not.
