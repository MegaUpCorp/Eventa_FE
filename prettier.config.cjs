/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  // tailwindcss
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
};
