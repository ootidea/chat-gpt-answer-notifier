let isAnswering = document.querySelector('.result-streaming') !== null

const mutationObserver = new MutationObserver(() => {
  const exists = document.querySelector('.result-streaming') !== null
  if (!exists && isAnswering && document.visibilityState === 'hidden') {
    console.log('Chat GPT回答通知', 'chrome.runtime.sendMessage', new Date().toLocaleString())
    chrome.runtime.sendMessage({
      type: 'showNotification',
      options: { title: 'Chat GPT', message: '回答が完了しました。' },
    })
  }
  isAnswering = exists
})
mutationObserver.observe(document.body, { childList: true, subtree: true })
