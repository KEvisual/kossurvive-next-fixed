
import { WORKOUTS } from '@/lib/data';
export async function GET(){ return new Response(JSON.stringify(WORKOUTS), { headers:{'Content-Type':'application/json'} }); }
