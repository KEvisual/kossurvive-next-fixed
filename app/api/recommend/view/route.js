
import { getUser, updateScore } from '@/lib/store';
import { applyInteraction } from '@/lib/reco';
import { RECIPES } from '@/lib/data';

export async function POST(request){
  const { recipeId } = await request.json();
  const all = globalThis.__store || {};
  const email = Object.keys(all)[0];
  if(!email) return new Response('no user', { status: 400 });
  const user = all[email];
  const r = RECIPES.find(x=>x.id===recipeId);
  const next = applyInteraction(user.score||{}, r, 'view');
  updateScore(email, next);
  return new Response(JSON.stringify({ ok:true, score: next }), { headers:{'Content-Type':'application/json'} });
}
