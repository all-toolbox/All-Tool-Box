export function convertBaseBuiltin(n: string, base: number): string {
  if (isNaN(+n) || !Number.isInteger(+n)) throw new TypeError(`Value of ${n} is not an integer.`);
  return parseInt(n).toString(base);
}

export function convertToDecimal(s: string, radix: number): string {
  if (isNaN(+s)) throw new TypeError(`Value of ${s} is not a valid numeric string.`);
  if (isNaN(radix) || !Number.isInteger(radix)) throw new TypeError(`Value of ${radix} is not a valid Radix.`);
  return parseInt(s, radix).toString();
}

export function decimalToBinaryBuiltin(n: string): string {
  return convertBaseBuiltin(n, 2);
}

export function decimalToOctalBuiltin(n: string): string {
  return convertBaseBuiltin(n, 8);
}

export function decimalToHexBuiltin(n: string): string {
  return convertBaseBuiltin(n, 16);
}

export function decimalToAsciiBuiltin(n: string): string {
  return convertBaseBuiltin(n, 32);
}

export function binaryToDecimalBuiltin(s: string): string {
  // @ts-ignore
  const n = parseInt(Number(`0b${s}`), 10);
  return n.toString();
}

export function octalToDecimalBuiltin(s: string): string {
  // @ts-ignore
  const n = parseInt(Number(`0o${s}`), 10);
  return n.toString();
}

export function hexToDecimalBuiltin(s: string): string {
  // @ts-ignore
  const n = parseInt(Number(`0x${s}`), 10);
  return n.toString();
}

export function AsciiToDecimalBuiltin(s: string): string {
  return convertToDecimal(s, 32);
}