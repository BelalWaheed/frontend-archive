export function safeFilter(results = []) {
  if (!Array.isArray(results)) return [];

  const bannedWords = new Set(
    [
      "sex",
      "sexual",
      "sexuality",
      "nudity",
      "nude",
      "naked",
      "erotic",
      "erotica",
      "porn",
      "pornographic",
      "adult",
      "explicit",
      "xxx",
      "hentai",
      "ecchi",
      "stepsister",
      "fetish",
      "strip",
      "stripper",
      "striptease",
      "affair",
      "affairs",
      "intimate",
      "intimacy",
      "seduce",
      "seduction",
      "seductive",
      "lust",
      "lustful",
      "horny",
      "18+",
      "18",
      "asmr",
      "provocative",
      "sensual",
      "sensuality",
      "desire",
      "pleasure",
      "passionate",
      "guilty pleasure",
      "forbidden",
      "temptation",
      "tempting",
      "mistress",
      "lover",
      "lovers",
      "obsession",
      "obsessed",
      "steamy",
      "body",
      "bodies",
      "curves",
      "revealing",
      "exposed",
      "bare",
      "breast",
      "breasts",
      "cleavage",
      "panty",
      "panties",
      "underwear",
      "bikini",
      "softcore",
      "mature",
      "rated r",
      "unrated",
      "provocative drama",
      "naughty",
      "dirty",
      "kinky",
      "wild night",
      "one night",
      "secret affair",
      "behind closed doors",
      "after dark",
      "private",
      "indecent",
      "high school",
      "schoolgirl",
      "schoolboy",
      "teen",
      "teenage romance",
      "coming of age",
      "harem",
      "reverse harem",
      "fanservice",
      "fan service",
      "bath scene",
      "hot springs",
      "accidental",
      "stumble",
      "walk in",
      "animal ears",
      "cat girl",
      "catgirl",
      "dog girl",
      "fox girl",
      "kemonomimi",
      "beast",
      "furry",
      "girlfriends",
      "girlfriend",
      "mygirlfriend",
      "anais nin",
      "anaïs nin",
      "henry & june",
      "diaries",
      "fifty shades",
      "emmanuelle",
      "blue lagoon",
      "dog days",
      "thriller",
      "psychological thriller",
      "obsessive",
      "stalker",
      "bedroom",
      "bed",
      "sheets",
      "massage",
      "touch",
      "caress",
      "pretty young sister",
      "raw squeezing",
      "fantasy",
      "maid",
      "bunny girl",
      "exercise routines",
      "summer camp",
      "young girl from japan",
      "crazy in love",
      "attractive Lady",
      "10th",
      "A couple go for swinger party.",
      "beautiful two-thousand-year-old female genie",
    ].map((word) => word.toLowerCase())
  );

  // Regex patterns for contextual NSFW detection
  const suspiciousPatterns = [
    /\btwo\s+(women|men|people)\s+(and|&)\s+(a|one)\s+(man|woman)/i,
    /\b(sexual|erotic|steamy|hot)\s+(thriller|drama|romance)/i,
    /\b(forbidden|secret|hidden)\s+(love|romance|affair|relationship)/i,
    /\b(young|teen|teenage)\s+(love|romance|passion)/i,
    /\b(one|single)\s+night\s+(stand|together|affair)/i,
    /\b(behind|after)\s+(closed\s+doors|dark)/i,
    /\b(mature|adult)\s+(content|themes|situations)/i,
    /\b(explores?\s+)?(sexuality|desire|passion)/i,
    /\bseductive\s+(woman|man|stranger)/i,
    /\b(no\s+strings|casual)\s+(sex|encounter|relationship)/i,
    /\banimal\s+ears/i,
    /\b(cat|dog|fox|bunny)\s+(girl|boy|ears)/i,
    /\b(harem|reverse\s+harem)/i,
    /\b(fan\s?service|fanservice)/i,
    /\bsummoned\s+to\s+(another|alternate)\s+world/i,
    /\blook\s+like\s+humans?\s+but\s+with/i,
    /\bhero.*alternate\s+world/i,
  ];

  return results.filter((item) => {
    if (!item) return false;

    if (item.adult === true) return false;

    // Combine all relevant text fields into a single string and lowercase once
    const text = [
      item.name,
      item.title,
      item.overview,
      item.tagline,
      item.genres?.map((g) => g.name).join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    for (const word of bannedWords) {
      if (text.includes(word)) return false;
    }

    if (suspiciousPatterns.some((pattern) => pattern.test(text))) return false;

    if (item.overview) {
      const words = item.overview.split(/\s+/).map((w) => w.toLowerCase());
      const flaggedCount = words.reduce(
        (count, w) => count + (bannedWords.has(w) ? 1 : 0),
        0
      );
      if (flaggedCount / words.length > 0.05) return false;
    }

    return true;
  });
}
