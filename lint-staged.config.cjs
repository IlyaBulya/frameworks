module.exports = {
  '*.{js,ts,jsx,tsx,vue,json,css}': (files) => {
    // Если нет файлов для обработки, вернем пустой массив
    if (files.length === 0) return [];

    const filePaths = files.join(' ');
    return [
      `npx biome format --write .`,
      `npx biome check --write ${filePaths}`,
    ];
  },
};
