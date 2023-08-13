chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'showNotification':
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'logo128px.png',
        title: message.options.title,
        message: message.options.message,
      })
      break
  }
})
