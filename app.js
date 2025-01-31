// index.ts
document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('scrapeButton');
	const urlInput = document.getElementById('urlInput');
	const resultDiv = document.getElementById('result');
	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};
	const handleScrape = async (url) => {
		try {
			const response = await fetch(
				`/api/scrape?url=${encodeURIComponent(url)}`,
			);
			if (!response.ok) {
				throw new Error('Error en la solicitud');
			}
			return await response.json();
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: error info
			console.error('Error:', error);
			throw error;
		}
	};
	button?.addEventListener('click', async () => {
		const url = urlInput.value.trim();
		if (!isValidUrl(url)) {
			alert('URL no válida');
			return;
		}
		if (!resultDiv) {
			// biome-ignore lint/suspicious/noConsole: error info
			console.error('Elemento "result" no encontrado en el DOM');
			return;
		}
		try {
			const data = await handleScrape(url);
			resultDiv.innerHTML = JSON.stringify(data, null, 2);
		} catch {
			resultDiv.innerHTML = 'Error al obtener datos';
		}
	});
});
