import { readFileSync } from "fs";

export class Range {
    readonly startInput:  number;
    readonly startOutput: number;
    readonly count:       number;

    constructor(startInput: number, startOutput: number, count: number) {
        this.startInput  = startInput;
        this.startOutput = startOutput;
        this.count       = count;
    }

    getValue(input: number): number | null {
        if (input < this.startInput) return null;
        const offset = input - this.startInput;
        if (offset >= this.count) return null;
        return this.startOutput + offset;
    }

    getReverse(num: number): number | null {
        const offset = num - this.startOutput;
        return offset >= 0 && offset < this.count ? this.startInput + offset : null;
    }
}

export class Map {
    readonly input:  string;
    readonly output: string;
    readonly ranges: Range[];

    constructor(input: string, output: string, ranges: Range[]) {
        this.input  = input;
        this.output = output;
        this.ranges = ranges;
    }

    getValue(input: number): number {
        for (const range of this.ranges) {
            const tmp = range.getValue(input);
            if (tmp !== null) return tmp;
        }
        return input;
    }

    getReverse(output: number): number[] {
        const ret: number[] = [];
        for (const range of this.ranges) {
            const tmp = range.getReverse(output);
            if (tmp !== null) ret.push(tmp);
        }
        if (ret.length == 0) return [output]; // Special case: If no range matches, input == output!
        return ret;
    }
}

export class Almanac {
    readonly seeds: number[];
    readonly maps: Map[];
    readonly seedToSoilMap           : Map;
    readonly soilToFertilizerMap     : Map;
    readonly fertilizerToWaterMap    : Map;
    readonly waterToLightMap         : Map;
    readonly lightToTemperatureMap   : Map;
    readonly temperatureToHumidityMap: Map;
    readonly humidityToLocationMap   : Map;

    constructor(seeds: number[], maps: Map[]) {
        this.seeds = seeds;
        this.maps = maps;

        const findMap = (from: string, to: string) => {
            for (const i of this.maps) if (i.input === from && i.output === to) return i;
            throw "Invalid almanac: Couldn't find map from " + from + " to " + to;
        };

        this.seedToSoilMap            = findMap("seed",        "soil");
        this.soilToFertilizerMap      = findMap("soil",        "fertilizer");
        this.fertilizerToWaterMap     = findMap("fertilizer",  "water");
        this.waterToLightMap          = findMap("water",       "light");
        this.lightToTemperatureMap    = findMap("light",       "temperature");
        this.temperatureToHumidityMap = findMap("temperature", "humidity");
        this.humidityToLocationMap    = findMap("humidity",    "location");
    }

    // FIXME: This doesn't account for circular maps
    getValue(fromType: string, fromValue: number, toType: string): number | null {
        if (fromType == toType) return fromValue;
        for (const map of this.maps) {
            if (map.input == fromType) {
                const tmp = this.getValue(map.output, map.getValue(fromValue), toType);
                if (tmp !== null) return tmp;
            }
        }
        return null;
    }

    getMinLocation(): number | null {
        let ret: number | null = null;
        for (const seed of this.seeds) {
            const locationForThisSeed = this.getValue("seed", seed, "location");
            if (locationForThisSeed !== null) {
                if (ret === null || locationForThisSeed < ret) {
                    ret = locationForThisSeed;
                }
            }
        }
        return ret;
    }

    getMinLocationWithSeedRanges(): number {
        if (this.seeds.length % 2 !== 0) throw "Invalid almanac: Odd number of seed values";

        const validSeedRanges: {start: number, end: number}[] = [];
        for (let i=0; i<this.seeds.length; i+=2) {
            const start = this.seeds[i];
            const count = this.seeds[i+1];
            validSeedRanges.push({start, end: start+count-1});
        }
        const isValidSeed = (x: number) => validSeedRanges.some(i => x >= i.start && x <= i.end);

        for (let location=0; ; location++) {
            for (const seed of this.getSeedForLocation(location)) {
                if (isValidSeed(seed)) return location;
            }
        }
    }

    getSeedForLocation(location: number): number[] {
        return this.humidityToLocationMap.getReverse(location)
            .flatMap(i => this.temperatureToHumidityMap.getReverse(i))
            .flatMap(i => this.lightToTemperatureMap.getReverse(i))
            .flatMap(i => this.waterToLightMap.getReverse(i))
            .flatMap(i => this.fertilizerToWaterMap.getReverse(i))
            .flatMap(i => this.soilToFertilizerMap.getReverse(i))
            .flatMap(i => this.seedToSoilMap.getReverse(i));
    }
}

export function parseInput(input: string): Almanac {
    const seeds: number[] = [];
    const maps:  Map[]    = [];

    const lines = input
        .trim()
        .split("\n")
        .map(line => line.trim());

    for (let i=0; i<lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("seeds: ")) {
            seeds.push(...line.substring(7).split(" ").map(i => parseInt(i)));
            continue;
        }
        
        const m = /^(.*)-to-(.*) map:$/.exec(line);
        if (m === null) continue;
        const from            = m[1];
        const to              = m[2];
        const ranges: Range[] = [];
        for (i++; i<lines.length; i++) {
            const mapLine = lines[i];
            if (mapLine == "") break;
            const numbers = mapLine
                .split(" ")
                .map(part => parseInt(part));
            if (numbers.length !== 3) throw "Invalid map line: " + mapLine;
            ranges.push(new Range(numbers[1], numbers[0], numbers[2]));
        }
        maps.push(new Map(from, to, ranges));
    }

    return new Almanac(seeds, maps);
}

const puzzleInput = readFileSync("input.txt").toString();
const almanac = parseInput(puzzleInput);
console.log(almanac.getMinLocation());
console.log(almanac.getMinLocationWithSeedRanges());
