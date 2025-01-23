/* eslint-disable no-undef */
if (!/npm/.test(process.env.npm_execpath || "")) {
  console.log("Please use npm instead of yarn to install dependencies.");
  process.exit(1);
}
