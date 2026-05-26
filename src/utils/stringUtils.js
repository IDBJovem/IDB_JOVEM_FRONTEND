export function normalizeString(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function fuzzyMatch(query, target, maxDistance = 2) {
  if (!query) return true;
  if (!target) return false;

  const normalizedQuery = normalizeString(query);
  const normalizedTarget = normalizeString(target);

  if (normalizedTarget.includes(normalizedQuery)) return true;

  const queryWords = normalizedQuery.split(/\s+/);
  const targetWords = normalizedTarget.split(/\s+/);

  for (const qWord of queryWords) {
    let wordMatched = false;
    for (const tWord of targetWords) {
      const allowedDistance = Math.min(maxDistance, Math.floor(tWord.length / 3));

      if (tWord.includes(qWord) || levenshteinDistance(qWord, tWord) <= allowedDistance) {
        wordMatched = true;
        break;
      }

      if (tWord.length >= qWord.length) {
        const prefix = tWord.substring(0, qWord.length);
        if (levenshteinDistance(qWord, prefix) <= allowedDistance) {
          wordMatched = true;
          break;
        }
      }
    }

    if (!wordMatched) return false;
  }

  return true;
}
