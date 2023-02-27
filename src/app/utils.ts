export {};

declare global {
  interface String {
    padClock: () => string[];
    GMT_Number: () => string;
  }
}

String.prototype.padClock = function () {
  return this.split('.').map((p, i) =>
    !i ? p.padStart(2, '0') : p.padEnd(2, '0')
  );
};
String.prototype.GMT_Number = function () {
  const my_this = this as any as number;
  const h = `${Math.abs(Math.floor(my_this / 60))}`.padStart(2, '0');
  const m = `${Math.abs(my_this % 60)}`.padStart(2, '0');
  return `${Math.sign(my_this) > 0 ? '+' : '-'}${h}:${m}`;
};
