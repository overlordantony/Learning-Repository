// logger.js
const ts = () => new Date().toLocaleTimeString();
const logger = {
  info:  (msg) => console.log(`[INFO]  ${ts()} — ${msg}`),
  warn:  (msg) => console.warn(`[WARN]  ${ts()} — ${msg}`),
  error: (msg) => console.error(`[ERROR] ${ts()} — ${msg}`),
};
export default logger;
