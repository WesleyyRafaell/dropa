export const copyText = (text: string): boolean => {
	if (!text) {
		console.error('Texto vazio para copiar');
		return false;
	}

	const oldElements = document.querySelectorAll('[data-clipboard-temp]');
	oldElements.forEach((el) => el.remove());

	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.setAttribute('data-clipboard-temp', 'true');
	textArea.setAttribute('readonly', 'true');
	textArea.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
  `;

	try {
		document.body.appendChild(textArea);

		textArea.focus({ preventScroll: true });
		textArea.select();

		const range = document.createRange();
		range.selectNodeContents(textArea);
		const selection = window.getSelection();
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}
		textArea.setSelectionRange(0, 999999);

		const successful = document.execCommand('copy');

		console.log('✓ Copiado:', successful);

		return successful;
	} catch (error) {
		console.error('✗ Erro ao copiar:', error);
		return false;
	} finally {
		if (textArea && textArea.parentNode) {
			textArea.parentNode.removeChild(textArea);
		}

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	}
};
