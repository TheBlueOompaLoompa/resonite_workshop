import sql from "$lib/db";

const WINDOW_SIZE = 10;

export default async function(req: Request) {
    const url = new URL(req.url);
    const tag = url.searchParams.get("tag");
    const offset = parseInt(url.searchParams.get("offset") ?? '0')

    if(!tag) return new Response('Missing tag parameter', { status: 403 });

    const res = await sql`
    SELECT assets.title, assets.description, assets.uploader, assets.resource_url
    FROM tag_bridge 
    INNER JOIN assets ON tag_bridge.asset=assets.id
    WHERE tag_bridge.tag=${encodeURIComponent(tag)}
    ORDER BY assets.created_at OFFSET ${offset * WINDOW_SIZE} LIMIT ${WINDOW_SIZE};`
    
    const text = res.reduce((acc, row) => {
        return `${acc}${Object.values(row).reduce((a, v) => a + v + ',', '')};`;
    }, '') 
    
    return new Response(text);
}
