
import { pushMood } from '@/lib/store';
export async function POST(request){
  const { mood } = await request.json();
  const all = globalThis.__store || {};
  const email = Object.keys(all)[0];
  if(!email) return new Response('no user', { status: 400 });
  pushMood(email, { mood });
  return new Response(JSON.stringify({ ok:true }), { headers:{'Content-Type':'application/json'} });
}
