export {};

declare global {
  interface String {
    padClock: () => string[];
  }
}

String.prototype.padClock = function () {
  return this.split('.').map((p, i) =>
    !i ? p.padStart(2, '0') : p.padEnd(2, '0')
  );
};
