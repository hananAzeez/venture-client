export function copyToClipboard(text: string): void {
    if (navigator.clipboard) {
        // For modern browsers
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    } else {
        // For older browsers
        let textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Make sure it's out of view
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            let success = document.execCommand('copy');
            if (success) {
                console.log('Text copied to clipboard');
            } else {
                console.error('Failed to copy text');
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}