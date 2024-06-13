import Tags from '$routes/tags';
import Assets from '$routes/assets';

const server = Bun.serve({
    async fetch(req: Request) {
        const uri = new URL(req.url);

        const res = await response(uri, req);
        console.log(`${res.status} ${req.method} ${uri.pathname}`);
        return res;
    },
    hostname: process.env.HOST ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '3000')
});

async function response(url: import('url').URL, req: Request): Promise<Response> {
    switch(url.pathname) {
    case "/tags":
        return await Tags(req);
    case "/assets":
        return await Assets(req);
    }
    
    return new Response(`This route doesn't exist`, {
        status: 404
    });
}

console.log(`Hosting Resonite Workshop at ${server.url.href}`);
