import sql from "$lib/db";

export default async function(req: Request) {
    const url = new URL(req.url);
    const tag = url.searchParams.get("tag");

    if(!tag) return new Response('Missing tag parameter', { status: 403 });

    const res = await sql`
    select assets.title, assets.description, assets.uploader, assets.resource_url from tag_bridge 
    inner join assets on tag_bridge.asset=assets.id where tag_bridge.tag=${encodeURIComponent(tag)} limit 10;`
    
    const text = res.reduce((acc, row) => {
        return `${acc}${Object.values(row).reduce((a, v) => a + v + ',', '')};`;
    }, '') 
    
    return new Response(text);
}
