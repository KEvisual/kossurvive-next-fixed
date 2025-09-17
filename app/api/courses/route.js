
import { COURSES } from '@/lib/data';
export async function GET(){ return new Response(JSON.stringify(COURSES), { headers:{'Content-Type':'application/json'} }); }
