import sql from '$lib/db';
import Tags from '$routes/tags';
import Assets from '$routes/assets';

const server = Bun.serve({
    async fetch(req: Request) {
        const url = new URL(req.url);

        switch(url.pathname) {
            case "/tags":
                return Tags(req);
            case "/assets":
                return Assets(req);
            default:
                break;
        }

        return new Response(`This route doesn't exist`, {
            status: 404
        });
    },
    hostname: '0.0.0.0'
});

console.log(`Hosting Resonite Workshop ${server.url.href}`);
