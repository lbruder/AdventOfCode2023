import { readFileSync } from "fs";

export class Number {
    readonly row:      number;
    readonly startCol: number;
    readonly endCol:   number;
    readonly value:    number;

    constructor(row: number, startCol: number, endCol: number, value: number) {
        this.row      = row;
        this.startCol = startCol;
        this.endCol   = endCol;
        this.value    = value;
    }
}

export function makeField(input: string): string[] {
    const lines = input
        .split("\n")
        .map(line => "." + line.trim() + ".");
    const lineLength = lines[0].length;
    const emptyLine = new Array(lineLength)
        .fill(".")
        .join("");
    lines.unshift(emptyLine);
    lines.push(emptyLine);
    return lines;
}

function isDigit(s: string): boolean {
    return s.length == 1 && s >= "0" && s <= "9";
}

export function findNumbers(field: string[]): Number[] {
    const ret: Number[] = [];
    for (let row = 0; row < field.length; row++) {
        const line = field[row];
        for (let col = 0; col < line.length; col++) {
            if (isDigit(line[col])) {
                let i = col;
                while (isDigit(line[i])) i++;
                ret.push(new Number(row, col, i-1, parseInt(line.substring(col, i))));
                col = i;
            }
        }
    }
    return ret;
}

export function findPartNumbers(input: string): Number[] {
    const field = makeField(input);
    const numbers = findNumbers(field);
    const ret: Number[] = [];

    for (const number of numbers) {
        const lineAbove = field[number.row-1].substring(number.startCol-1, number.endCol+2);
        const lineBelow = field[number.row+1].substring(number.startCol-1, number.endCol+2);
        const charLeft  = field[number.row][number.startCol-1];
        const charRight = field[number.row][number.endCol+1];
        const surroundingRectangle = lineAbove + charLeft + charRight + lineBelow;
        
        for (let i=0; i<surroundingRectangle.length; i++) {
            if (surroundingRectangle[i] != ".") {
                ret.push(number);
                continue;
            }
        }
    }

    return ret;
}

export function partNumberSum(input: string): number {
    return findPartNumbers(input)
        .map(i => i.value)
        .reduce((acc, i) => acc+i);
}

function between(i: number, left: number, right: number): boolean {
    return i >= left && i <= right;
}

export class Star {
    readonly row: number;
    readonly column: number;
    
    constructor(row: number, column: number) {
        this.row    = row;
        this.column = column;
    }

    isAdjacent(number: Number): boolean {
        if (number.row >= this.row - 1 && number.row <= this.row + 1) {
            return between(this.column, number.startCol-1, number.endCol+1);
        }
        return false;
    }
}

export function findStars(field: string[]): Star[] {
    const ret: Star[] = [];
    for (let row = 0; row < field.length; row++) {
        const line = field[row];
        for (let col = 0; col < line.length; col++) {
            if (line[col] == "*") {
                ret.push(new Star(row, col));
            }
        }
    }
    return ret;
}

export class Gear {
    readonly star:  Star;
    readonly num1:  Number;
    readonly num2:  Number;
    readonly ratio: number;

    constructor(star: Star, num1: Number, num2: Number) {
        this.star  = star;
        this.num1  = num1;
        this.num2  = num2;
        this.ratio = num1.value * num2.value;
    }
}

export function findGears(input: string): Gear[] {
    const field   = makeField(input);
    const stars   = findStars(field);
    const numbers = findNumbers(field);
    const ret: Gear[] = [];

    for (const star of stars) {
        const adjacentNumbers = numbers.filter(i => star.isAdjacent(i));
        if (adjacentNumbers.length == 2) {
            ret.push(new Gear(star, adjacentNumbers[0], adjacentNumbers[1]));
        }
    }

    return ret;
}

const input = readFileSync("input.txt").toString();
console.log(partNumberSum(input));
console.log(findGears(input).map(gear => gear.ratio).reduce((acc, i) => acc+i));
