const fs = require("fs").promises;
const path = require("path");

const knowledgePath = path.join(__dirname, "../knowledge");

async function loadKnowledge() {
    const chunks = [];

    async function readFolder(folderPath, category) {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            if (!file.endsWith(".txt")) continue;

            const filePath = path.join(folderPath, file);
            const content = await fs.readFile(filePath, "utf-8");

            chunks.push({
                category,
                file,
                content: content.trim(),
            });
        }
    }

    const categories = await fs.readdir(knowledgePath, {
        withFileTypes: true,
    });

    for (const category of categories) {
        if (!category.isDirectory()) continue;
        const categoryPath = path.join(knowledgePath, category.name);
        await readFolder(categoryPath, category.name);
    }
    return chunks;
}

module.exports = {
    loadKnowledge,
};