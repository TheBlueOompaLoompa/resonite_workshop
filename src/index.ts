import Tags from '$routes/tags';
import Assets from '$routes/assets';

const server = Bun.serve({
    async fetch(req: Request) {
        const uri = new URL(req.url);

        const res = await response(uri, req);

        if(res) {
            console.log(`${res.status} ${req.method} ${uri.pathname}`);
            return res;
        }

        return new Response(`This route doesn't exist`, {
            status: 404
        });
    },
    hostname: process.env.HOST ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '3000')
});

async function response(url: import('url').URL, req: Request): Promise<Response | null> {
    switch(url.pathname) {
    case "/tags":
        return await Tags(req);
    case "/assets":
        return await Assets(req);
    default:
        break;
    }

    return null;
}

console.log(`Hosting Resonite Workshop at ${server.url.href}`);
