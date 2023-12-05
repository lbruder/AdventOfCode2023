import { test, expect } from "bun:test";
import { Card, parseLine, puzzle2 } from ".";

const card1 = parseLine("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
const card2 = parseLine("Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19");
const card3 = parseLine("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1");
const card4 = parseLine("Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83");
const card5 = parseLine("Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36");
const card6 = parseLine("Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11");
const cards = [card1, card2, card3, card4, card5, card6];

test("parseLine", () => {
    cards.forEach((card, i) => {
        expect(card.id).toBe(i+1);
        expect(card.winning.length).toBe(5);
        expect(card.having.length).toBe(8);
    });
});

test("matches", () => {
    expect(card1.matches).toBe(4);
    expect(card2.matches).toBe(2);
    expect(card3.matches).toBe(2);
    expect(card4.matches).toBe(1);
    expect(card5.matches).toBe(0);
    expect(card6.matches).toBe(0);
});

test("points", () => {
    expect(card1.points).toBe(8);
    expect(card2.points).toBe(2);
    expect(card3.points).toBe(2);
    expect(card4.points).toBe(1);
    expect(card5.points).toBe(0);
    expect(card6.points).toBe(0);
});

test("puzzle2", () => {
    expect(puzzle2(cards)).toBe(30);
});
