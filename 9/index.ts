import { readFileSync } from "fs";

export class Series {
    readonly values: number[];
    readonly diffs: Series | null;

    constructor(values: number[]) {
        this.values = values;
        if (values.every(i => i === 0)) this.diffs = null;
        else this.diffs = makeDiffSeries(values);
    }

    extrapolate(): number {
        if (this.diffs === null) return 0;
        return this.values[this.values.length - 1] + this.diffs.extrapolate();
    }

    extrapolateLeft(): number {
        if (this.diffs === null) return 0;
        return this.values[0] - this.diffs.extrapolateLeft();
    }
}

function makeDiffSeries(values: number[]): Series {
    const diffs: number[] = [];
    let last: number | undefined = undefined;
    for (const i of values) {
        if (last !== undefined) diffs.push(i - last);
        last = i;
    }
    return new Series(diffs);
}

export function readInput(input: string): Series[] {
    return input
        .split(/\n/)
        .map(line => line.trim())
        .filter(line => line !== "")
        .map(line => new Series(line.split(/\s+/).map(i => parseInt(i))))
}

export function puzzle1(input: Series[]): number {
    return input
        .map(series => series.extrapolate())
        .reduce((acc, i) => acc + i);
}

export function puzzle2(input: Series[]): number {
    return input
        .map(series => series.extrapolateLeft())
        .reduce((acc, i) => acc + i);
}

const input = readInput(readFileSync("input.txt").toString());
console.log(puzzle1(input));
console.log(puzzle2(input));
