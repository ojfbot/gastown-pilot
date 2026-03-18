export function getLogger(module: string) {
  const prefix = `[gastown-pilot:${module}]`;
  return {
    info: (...args: unknown[]) => console.log(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
    debug: (...args: unknown[]) => console.debug(prefix, ...args),
  };
}
