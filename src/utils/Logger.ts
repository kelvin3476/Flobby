type LogType = 'log' | 'debug' | 'info' | 'warn' | 'error';

const Logger = (level: LogType, ...args: any[]) => {
    if (import.meta.env.MODE !== 'development') return;

    const prefix = `[${level.toUpperCase()}]`;
    switch (level) {
        case 'log':
            console.log(prefix, ...args);
            break;
        case 'debug':
            console.debug(prefix, ...args);
            break;
        case 'info':
            console.info(prefix, ...args);
            break;
        case 'warn':
            console.warn(prefix, ...args);
            break;
        case 'error':
            console.error(prefix, ...args);
            break;
    }
}

const logger = {
    log: (...args: any[]) => Logger('log', ...args),
    debug: (...args: any[]) => Logger('debug', ...args),
    info: (...args: any[]) => Logger('info', ...args),
    warn: (...args: any[]) => Logger('warn', ...args),
    error: (...args: any[]) => Logger('error', ...args),
};

export default logger;