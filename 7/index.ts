import { readFileSync } from "fs";

function getValueForLabel(label: string, withJokers: boolean): number {
    switch (label) {
        case "A": return 14;
        case "K": return 13;
        case "Q": return 12;
        case "J": return withJokers ? 1 : 11;
        case "T": return 10;
        default:  return parseInt(label);
    }
}

export class Card {
    readonly label: string;
    readonly value: number;

    constructor(label: string, withJokers: boolean) {
        this.label = label;
        this.value = getValueForLabel(label, withJokers);
    }
}

export enum handType {
    highCard,
    onePair,
    twoPair,
    threeOfAKind,
    fullHouse,
    fourOfAKind,
    fiveOfAKind,
}

function getHandType(hand: string, withJokers: boolean): handType {
    const counts: Record<string, number> = {};
    for (const c of hand.split("")) counts[c] = (counts[c] ?? 0) + 1;

    const countsAsString = Object.values(counts).sort().join("");
    if (countsAsString == "5") return handType.fiveOfAKind;

    if (withJokers) {
        if (countsAsString == "14")    return counts.J >= 1 ? handType.fiveOfAKind  : handType.fourOfAKind;
        if (countsAsString == "23")    return counts.J >= 1 ? handType.fiveOfAKind  : handType.fullHouse;
        if (countsAsString == "113")   return counts.J >= 1 ? handType.fourOfAKind  : handType.threeOfAKind;
        if (countsAsString == "122")   return counts.J == 1 ? handType.fullHouse    : counts.J == 2 ? handType.fourOfAKind : handType.twoPair;
        if (countsAsString == "1112")  return counts.J >= 1 ? handType.threeOfAKind : handType.onePair;
        if (countsAsString == "11111") return counts.J == 1 ? handType.onePair      : handType.highCard;
    } else {
        if (countsAsString == "14")   return handType.fourOfAKind;
        if (countsAsString == "23")   return handType.fullHouse;
        if (countsAsString == "113")  return handType.threeOfAKind;
        if (countsAsString == "122")  return handType.twoPair;
        if (countsAsString == "1112") return handType.onePair;
    }

    return handType.highCard;
}

export class Hand {
    readonly cards: Card[];
    readonly bid: number;
    readonly type: handType;

    constructor(inputLine: string, withJokers: boolean) {
        const parts = inputLine.split(" ");
        const hand  = parts[0];

        this.cards = hand.split("").map(label => new Card(label, withJokers));
        this.bid   = parseInt(parts[1]);
        this.type = getHandType(hand, withJokers);
    }

    compareTo(other: Hand): number {
        if (this.type != other.type) return this.type > other.type ? 1 : -1;
        for (let i=0; i<this.cards.length; i++) {
            const mine   = this.cards[i];
            const theirs = other.cards[i];
            if (mine.value != theirs.value) return mine.value - theirs.value;
        }
        return 0;
    }
}

export function parsePuzzle(input: string, withJokers: boolean): Hand[] {
    return input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line != "")
        .map(line => new Hand(line, withJokers));
}

export function getWinnings(hands: Hand[]): number {
    hands.sort((a: Hand, b: Hand) => a.compareTo(b));
    let ret = 0;
    hands.forEach((hand: Hand, index: number) => ret += hand.bid * (index + 1));
    return ret;
}

const input = readFileSync("input.txt").toString();
console.log(getWinnings(parsePuzzle(input, false)));
console.log(getWinnings(parsePuzzle(input, true)));
