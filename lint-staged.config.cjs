module.exports = {
  "*.{js,ts,jsx,tsx,vue,json,css,md}": ["npx biome format --write", "npx biome check --write"],
};