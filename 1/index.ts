import { readFile, readFileSync } from "fs";

export function isDigit(s: string): boolean {
    if (s.length != 1) return false;
    return s[0] >= "0" && s[0] <= "9";
}

export function getDigitWord(s: string): number | false {
    if (s.startsWith("one")) return 1;
    if (s.startsWith("two")) return 2;
    if (s.startsWith("three")) return 3;
    if (s.startsWith("four")) return 4;
    if (s.startsWith("five")) return 5;
    if (s.startsWith("six")) return 6;
    if (s.startsWith("seven")) return 7;
    if (s.startsWith("eight")) return 8;
    if (s.startsWith("nine")) return 9;
    return false;
}

export function getValueForLine(line: string, extendedMode?: boolean): number {
    let ret = 0;
    for (let i=0; ret < line.length; i++) {
        if (isDigit(line[i])) {
            ret = 10 * parseInt(line[i]);
            break;
        } else if (extendedMode) {
            const digit = getDigitWord(line.substring(i));
            if (digit !== false) {
                ret = 10 * digit;
                break;
            }
        }
    }
    for (let i=line.length-1; i>=0; i--) {
        if (isDigit(line[i])) {
            ret += parseInt(line[i]);
            break;
        } else if (extendedMode) {
            const digit = getDigitWord(line.substring(i));
            if (digit !== false) {
                ret += digit;
                break;
            }
        }
    }
    return ret;
}

export function puzzleOne(fileContents: string): number {
    return fileContents
        .split("\n")
        .map(line => line.trim())
        .map(line => getValueForLine(line))
        .reduce((acc, i) => acc+i);
}

export function puzzleTwo(fileContents: string): number {
    return fileContents
        .split("\n")
        .map(line => line.trim())
        .map(line => getValueForLine(line, true))
        .reduce((acc, i) => acc+i);
}

console.log("Day one: " + puzzleOne(readFileSync("input.txt").toString()));
console.log("Day two: " + puzzleTwo(readFileSync("input.txt").toString()));
