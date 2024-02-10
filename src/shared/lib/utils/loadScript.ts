export default function loadScript(src) {
	return new Promise((resolve, reject) => {
		const scriptFile = document.createElement('script');
		scriptFile.onload = resolve;
		scriptFile.onerror = reject;
		scriptFile.src = src;
		document.body && document.body.appendChild(scriptFile);
	});
}
