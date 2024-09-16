let resultStreaming = document.querySelector('.result-streaming')

const mutationObserver = new MutationObserver(() => {
  const currentResultStreaming = document.querySelector('.result-streaming')
  if (currentResultStreaming === null && resultStreaming !== null && document.visibilityState === 'hidden') {
    chrome.runtime.sendMessage({
      type: 'showNotification',
      options: {
        title: 'Chat GPT',
        message: resultStreaming.textContent ?? chrome.i18n.getMessage('responseIsComplete'),
      },
    })
  }
  resultStreaming = currentResultStreaming
})
mutationObserver.observe(document.body, { childList: true, subtree: true })
