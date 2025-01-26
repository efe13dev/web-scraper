document.addEventListener("DOMContentLoaded", () => {
	const button = document.getElementById("scrapeButton");
	const urlInput = document.getElementById("urlInput") as HTMLInputElement;
	const resultDiv = document.getElementById("result");

	button?.addEventListener("click", async () => {
		if (!urlInput.value) {
			alert("Por favor, introduce una URL válida");
			return;
		}

		try {
			if (resultDiv) resultDiv.innerHTML = "Extrayendo artículo...";

			const response = await fetch("http://localhost:8080/extract", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url: urlInput.value }),
			});

			if (!response.ok) {
				throw new Error("Error en la respuesta del servidor");
			}

			const article = await response.json();

			if (resultDiv) {
				resultDiv.innerHTML = `
          <h2>${article.title || "Sin título"}</h2>
          ${article.author ? `<p>Autor: ${article.author}</p>` : ""}
          ${article.published ? `<p>Publicado: ${article.published}</p>` : ""}
          ${article.description ? `<p>${article.description}</p>` : ""}
          <div class="content">${
						article.content || "No se pudo extraer el contenido"
					}</div>
        `;
			}
		} catch (error) {
			if (resultDiv) {
				resultDiv.innerHTML = `<p class="error">Error al extraer el artículo: ${error}</p>`;
			}
			console.error("Error al extraer el artículo:", error);
		}
	});
});
