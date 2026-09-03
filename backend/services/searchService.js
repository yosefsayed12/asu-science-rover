const { loadKnowledge } = require("./knowledgeService");


// ========================================
// Settings
// ========================================

const STRICT_THRESHOLD = 0.5;
const BROAD_THRESHOLD = 0.3;

const MAX_RESULTS = 3;


// ========================================
// Arabic Synonyms
// ========================================

const synonyms = {
    "انضمام": [
        "شارك",
        "مشاركة",
        "التحاق",
        "التحق",
        "اشترك",
        "اشتراك",
        "تقديم",
        "التقديم",
    ],

    "لجنة": [
        "لجان",
        "اللجان",
    ],

    "نشاط": [
        "انشطة",
        "نشاطات",
        "فعالية",
        "فعاليات",
    ],

    "طالب": [
        "طلاب",
        "الطلبة",
        "الطالب",
    ],

    "كلية": [
        "الكلية",
    ],

    "قسم": [
        "اقسام",
        "الأقسام",
        "القسم",
    ],

    "عشيرة": [
        "العشيرة",
        "جوالة",
        "الجوالة",
    ],
};


// ========================================
// Normalize Text
// ========================================

function normalizeText(text) {
    return text
        .toLowerCase()

        // Remove Arabic diacritics
        .replace(/[ًٌٍَُِّْـ]/g, "")

        // Normalize Arabic letters
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")

        // Remove punctuation
        .replace(/[^\u0600-\u06FFa-z0-9\s]/g, " ")

        // Remove extra spaces
        .replace(/\s+/g, " ")

        .trim();
}


// ========================================
// Tokenize
// ========================================

function tokenize(text) {
    return [
        ...new Set(
            normalizeText(text)
                .split(" ")
                .filter(Boolean)
        ),
    ];
}


// ========================================
// Expand Query
// ========================================

function expandQuery(words) {
    const expandedWords = new Set(words);

    for (const word of words) {

        // If the word is a key
        if (synonyms[word]) {
            for (const synonym of synonyms[word]) {
                expandedWords.add(
                    normalizeText(synonym)
                );
            }
        }

        // If the word is a synonym
        for (const [key, values] of Object.entries(synonyms)) {

            const normalizedValues =
                values.map((value) =>
                    normalizeText(value)
                );

            if (normalizedValues.includes(word)) {

                expandedWords.add(
                    normalizeText(key)
                );

                for (const value of values) {
                    expandedWords.add(
                        normalizeText(value)
                    );
                }
            }
        }
    }

    return [...expandedWords];
}


// ========================================
// Exact Score
// ========================================

function calculateExactScore(question, content) {

    const questionWords =
        tokenize(question);

    const expandedWords =
        expandQuery(questionWords);

    const contentWords =
        new Set(tokenize(content));

    if (expandedWords.length === 0) {
        return 0;
    }

    let matchedWords = 0;

    for (const word of expandedWords) {

        if (contentWords.has(word)) {
            matchedWords++;
        }
    }

    return matchedWords / expandedWords.length;
}


// ========================================
// Broad Score
// ========================================

function calculateBroadScore(question, content) {

    const questionWords =
        tokenize(question);

    const expandedWords =
        expandQuery(questionWords);

    const normalizedContent =
        normalizeText(content);

    if (expandedWords.length === 0) {
        return 0;
    }

    let matchedWords = 0;

    for (const word of expandedWords) {
        // Exact word
        if (
            normalizedContent.includes(
                 `${word}` 
            )
        ) {
            matchedWords++;
            continue;
        }

        // Partial match
        if (
            word.length >= 3 &&
            normalizedContent.includes(word)
        ) {
            matchedWords++;
        }
    }

    return matchedWords / expandedWords.length;
}


// ========================================
// Phrase Score
// ========================================

function calculatePhraseScore(question, content) {

    const normalizedQuestion =
        normalizeText(question);

    const normalizedContent =
        normalizeText(content);

    if (!normalizedQuestion) {
        return 0;
    }

    // Exact phrase
    if (
        normalizedContent.includes(
            normalizedQuestion
        )
    ) {
        return 1;
    }

    // Check important consecutive words
    const words =
        normalizedQuestion.split(" ");

    if (words.length < 2) {
        return 0;
    }

    let consecutiveMatches = 0;

    for (let i = 0; i < words.length - 1; i++) {

        const phrase =
            `${words[i]} ${words[i + 1]}`;

        if (normalizedContent.includes(phrase)) {
            consecutiveMatches++;
        }
    }

    return consecutiveMatches /
        (words.length - 1);
}


// ========================================
// Final Score
// ========================================

function calculateScore(question, content) {

    const exactScore =
        calculateExactScore(
            question,
            content
        );

    const broadScore =
        calculateBroadScore(
            question,
            content
        );

    const phraseScore =
        calculatePhraseScore(
            question,
            content
        );

    /*
        We give more importance to:
        - Exact matches
        - Phrase matches

        Broad matching is used as
        a secondary signal.
    */

    const score =
        (exactScore * 0.5) +
        (broadScore * 0.3) +
        (phraseScore * 0.2);

    return Math.min(score, 1);
}


// ========================================
// Search
// ========================================

function searchResults(
    question,
    knowledge,
    searchType
) {

    const results = knowledge.map((item) => {

        const score =
            calculateScore(
                question,
                item.content
            );

        return {
            ...item,
            score: Number(
                score.toFixed(3)
            ),
            searchType,
        };
    });

    return results
        .filter(
            (result) => result.score > 0
        )
        .sort(
            (a, b) => b.score - a.score
        )
        .slice(0, MAX_RESULTS);
}


// ========================================
// Main Search Function
// ========================================

async function searchKnowledge(question) {

    if (
        !question ||
        !question.trim()
    ) {
        return {
            found: false,
            results: [],
            searchType: null,
        };
    }

    const knowledge =
        await loadKnowledge();


    // ====================================
    // 1. Strict Search
    // ====================================

    const strictResults =
        searchResults(
            question,
            knowledge,
            "strict"
        );

    const bestStrict =
        strictResults[0];


    if (
        bestStrict &&
        bestStrict.score >= STRICT_THRESHOLD
    ) {

        return {
            found: true,
            results: strictResults,
            searchType: "strict",
        };
    }


    // ====================================
    // 2. Broad Search
    // ====================================

    const broadResults =
        searchResults(
            question,
            knowledge,
            "broad"
        );

    const bestBroad =
        broadResults[0];


    if (
        bestBroad &&
        bestBroad.score >= BROAD_THRESHOLD
    ) {return {
        found: true,
        results: broadResults,
        searchType: "broad",
    };
}


// ====================================
// 3. No Reliable Information
// ====================================

return {
    found: false,
    results: [],
    searchType: null,
};
}


// ========================================
// Export
// ========================================

module.exports = {
searchKnowledge,
};