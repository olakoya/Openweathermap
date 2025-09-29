const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;
type LogLevel = typeof LOG_LEVELS[number];

const CURRENT_LEVEL = (process.env.LOG_LEVEL && LOG_LEVELS.includes(process.env.LOG_LEVEL as LogLevel)
  ? process.env.LOG_LEVEL
  : 'info') as LogLevel;

function log(level: LogLevel, message: string, error?: any) {
  if (LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(CURRENT_LEVEL)) {
    const prefix = `[${level.toUpperCase()}] ${new Date().toISOString()} -`;
    if (error) console.error(prefix, message, error);
    else console.log(prefix, message);
  }
}

export const TestLogger = {
  debug: (msg: string) => log('debug', msg),
  info: (msg: string) => log('info', msg),
  warn: (msg: string) => log('warn', msg),
  error: (msg: string, err?: any) => log('error', msg, err),
};
