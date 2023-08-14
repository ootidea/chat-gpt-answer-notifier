let resultStreaming = document.querySelector('.result-streaming')

const mutationObserver = new MutationObserver(() => {
  const currentResultStreaming = document.querySelector('.result-streaming')
  if (
    currentResultStreaming === null &&
    resultStreaming !== null &&
    document.visibilityState === 'hidden'
  ) {
    console.log('Chat GPT回答通知', 'chrome.runtime.sendMessage', new Date().toLocaleString())
    chrome.runtime.sendMessage({
      type: 'showNotification',
      options: {
        title: 'Chat GPT',
        message: resultStreaming.textContent ?? '回答が完了しました。',
      },
    })
  }
  resultStreaming = currentResultStreaming
})
mutationObserver.observe(document.body, { childList: true, subtree: true })
