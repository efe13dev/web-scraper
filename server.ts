import { extract } from '@extractus/article-extractor';

const PORT = 8080;
const errorStatus = 500;
const notFoundStatus = 404;

interface ExtractRequest {
	url: string;
}

// Función de guarda de tipo para validar ExtractRequest
function isExtractRequest(obj: unknown): obj is ExtractRequest {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'url' in obj &&
		typeof (obj as { url: unknown }).url === 'string'
	);
}

const server = Bun.serve({
	port: PORT,
	async fetch(req) {
		// Habilitar CORS
		if (req.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		// Solo procesar peticiones POST a /extract
		if (req.method === 'POST' && req.url.endsWith('/extract')) {
			try {
				const body = (await req.json()) as unknown;

				if (!isExtractRequest(body)) {
					return new Response(
						JSON.stringify({ error: 'URL inválida o faltante' }),
						{
							status: notFoundStatus,
							headers: {
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*',
							},
						},
					);
				}

				const article = await extract(body.url);
				return Response.json(article, {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'Un error desconocido ha ocurrido';
				return Response.json(
					{ error: errorMessage },
					{
						status: errorStatus,
						headers: {
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
			}
		}

		return new Response('Not Found', { status: notFoundStatus });
	},
});
// biome-ignore lint: server info
console.log(`Servidor corriendo en http://localhost:${server.port}`);
