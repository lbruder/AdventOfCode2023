import { readFileSync } from "fs";

export class Card {
    readonly id:      number;
    readonly winning: number[];
    readonly having:  number[];
    readonly matches: number;
    readonly points:  number;

    constructor(id: number, winning: number[], having: number[]) {
        this.id      = id;
        this.winning = winning;
        this.having  = having;
        
        let matches = 0;
        for (const i of having) {
            if (winning.includes(i)) {
                matches++;
            }
        }
        this.matches = matches;
        this.points = matches == 0 ? 0 : 1 << (matches-1);
    }
}

export function parseLine(line: string): Card {
    const m = /^Card  *(\d+): (.*)\|(.*)$/.exec(line);
    if (!m) throw line;
    const winning = m[2].trim().split(/  */).map(i => parseInt(i));
    const having  = m[3].trim().split(/  */).map(i => parseInt(i));
    return new Card(parseInt(m[1]), winning, having);
}

const input = readFileSync("input.txt").toString();

const cards = input
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => parseLine(line))
    .filter(card => card !== null);

const puzzle1 = cards
    .map(card => card.points)
    .reduce((acc, i) => acc+i);
console.log(puzzle1);

export function puzzle2(cards: Card[]): number {
    const cardStack = new Array(cards.length).fill(1);
    for (let i=0; i<cardStack.length; i++) {
        const matches = cards[i].matches;
        for (let j=0; j<matches; j++) {
            cardStack[i+j+1] += cardStack[i];
        }
    }
    return cardStack.reduce((acc, i) => acc+i);
}

console.log(puzzle2(cards));
