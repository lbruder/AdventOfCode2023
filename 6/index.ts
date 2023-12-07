import { readFileSync } from "fs";

export class Race {
    readonly time:     number;
    readonly distance: number;

    constructor(time: number, distance: number) {
        this.time     = time;
        this.distance = distance;
    }

    getDistance(buttonPressTime: number): number {
        const speed       = buttonPressTime;
        const timeAtSpeed = this.time - buttonPressTime;
        const distance    = speed * timeAtSpeed; // = buttonPressTime * (this.time - buttonPressTime) = -b²+bt
        return distance;
    }

    getNumWinningPressTimes(): number {
        // PERFORMANCE: Replace with solving the quadratic equation. Use simple algo for now.
        let count = 0;
        for (let i=0; i<=this.time; i++) {
            if (this.getDistance(i) > this.distance) {
                count++;
            }
        }
        return count;
    }
}

export function parseInput(input: string): Race[] {
    const lines = input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line != "");
    
    let times:     number[] = [];
    let distances: number[] = [];

    for (const line of lines) {
        if (line.startsWith("Time:")) {
            times = line
                .substring(5)
                .split(/ /)
                .filter(i => i != "")
                .map(i => parseInt(i));
        }
        if (line.startsWith("Distance:")) {
            distances = line
                .substring(9)
                .split(/ /)
                .filter(i => i != "")
                .map(i => parseInt(i));
        }
    }
    if (times.length != distances.length) return [];

    const ret: Race[] = [];
    for (let i=0; i<times.length; i++)
        ret.push(new Race(times[i], distances[i]));
    return ret;
}

const races = parseInput(readFileSync("input.txt").toString());
let puzzle1 = 1;
for (const race of races) {
    puzzle1 *= race.getNumWinningPressTimes();
}
console.log(puzzle1);

const puzzle2Race = parseInput(readFileSync("input.txt").toString().replaceAll(" ", ""))[0];
console.log(puzzle2Race.getNumWinningPressTimes());
