const tabInfos: Map<string, { tabId: number; windowId: number }> = new Map()

chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case 'showNotification':
      chrome.notifications.create(
        {
          type: 'basic',
          iconUrl: 'logo128px.png',
          title: message.options.title,
          message: message.options.message,
          isClickable: true,
        },
        (notificationId) => {
          if (sender.tab?.id !== undefined) {
            tabInfos.set(notificationId, { tabId: sender.tab.id, windowId: sender.tab.windowId })

            console.group('chrome.notifications.create finished', new Date().toLocaleString())
            console.log('notificationId: ', notificationId)
            console.log('tabId: ', sender.tab.id)
            console.log('windowId: ', sender.tab.windowId)
            console.log('message: ', message.options.message)
            console.groupEnd()
          }
        },
      )

      // To prevent memory leaks, delete old entries.
      chrome.notifications.getAll((notifications) => {
        for (const notificationId of tabInfos.keys()) {
          if (!(notificationId in notifications)) {
            tabInfos.delete(notificationId)
          }
        }
      })
      break
  }
})

chrome.notifications.onClicked.addListener((notificationId) => {
  const tabInfo = tabInfos.get(notificationId)
  if (tabInfo !== undefined) {
    chrome.tabs.update(tabInfo.tabId, { active: true })
    chrome.windows.update(tabInfo.windowId, { focused: true })
  }
})

chrome.notifications.onClosed.addListener((notificationId) => {
  const tabInfo = tabInfos.get(notificationId)
  console.group('chrome.notifications.onClosed', new Date().toLocaleString())
  console.log('notificationId: ', notificationId)
  console.log('tabId: ', tabInfo?.tabId)
  console.log('windowId: ', tabInfo?.windowId)
  console.groupEnd()

  tabInfos.delete(notificationId)
})
