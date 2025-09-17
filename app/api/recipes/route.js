
import { RECIPES } from '@/lib/data';
export async function GET(){ return new Response(JSON.stringify(RECIPES), { headers:{'Content-Type':'application/json'} }); }
