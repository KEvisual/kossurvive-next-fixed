
import { CATEGORIES, RECIPES } from './data';

export function defaultScore() {
  const score = {};
  for (const c of CATEGORIES) score[c] = 0;
  return score;
}

export function bootstrapFromPrefs(prefs = []) {
  const s = defaultScore();
  for (const p of prefs) if (s[p] !== undefined) s[p] += 10;
  return s;
}

export function applyInteraction(score, recipe, action='view') {
  for (const cat of recipe.categories) {
    if (!(cat in score)) score[cat] = 0;
    if (action === 'like') score[cat] += 5;
    if (action === 'save') score[cat] += 4;
    if (action === 'view') score[cat] += 1;
  }
  return score;
}

export function rankRecipes(score) {
  return [...RECIPES].sort((a,b)=>{
    const sa = a.categories.reduce((acc,c)=>acc+(score[c]||0),0);
    const sb = b.categories.reduce((acc,c)=>acc+(score[c]||0),0);
    return sb - sa;
  });
}
