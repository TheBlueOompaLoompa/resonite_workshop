import sql from '$lib/db';

export default async function tags(_req: any) {
    const res = await sql`
    select tag from tags where recommended=true
    `;
    
    const tags = res.map(row => row.tag);
    
    return new Response(tags.join(',') + ',', {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
