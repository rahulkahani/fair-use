const button = document.getElementById('copy-prompt');
const prompt = document.getElementById('chat-prompt');
const status = document.getElementById('copy-status');
button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(prompt.value);
    status.textContent = 'Copied. Paste it into your AI chat.';
  } catch {
    prompt.focus();
    prompt.select();
    status.textContent = 'Message selected. Use your device’s Copy command, then paste into your AI chat.';
  }
});
