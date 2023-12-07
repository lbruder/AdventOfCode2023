import { test, expect } from "bun:test";
import { Hand, getWinnings, handType, parsePuzzle } from "./index";

test("part1", () => {
    const fiveOfAKind  = new Hand("AAAAA 1", false);
    const fourOfAKind  = new Hand("AA8AA 1", false);
    const fullHouse    = new Hand("23332 1", false);
    const threeOfAKind = new Hand("TTT98 1", false);
    const twoPair      = new Hand("23432 1", false);
    const onePair      = new Hand("A23A4 1", false);
    const highCard     = new Hand("23456 1", false);

    expect(fiveOfAKind.type).toBe(handType.fiveOfAKind);
    expect(fourOfAKind.type).toBe(handType.fourOfAKind);
    expect(fullHouse.type).toBe(handType.fullHouse);
    expect(threeOfAKind.type).toBe(handType.threeOfAKind);
    expect(twoPair.type).toBe(handType.twoPair);
    expect(onePair.type).toBe(handType.onePair);
    expect(highCard.type).toBe(handType.highCard);

    expect(fiveOfAKind.compareTo(fiveOfAKind)).toBe(0);
    expect(fiveOfAKind.compareTo(fourOfAKind)).toBe(1);
    expect(fiveOfAKind.compareTo(fullHouse)).toBe(1);
    expect(fiveOfAKind.compareTo(threeOfAKind)).toBe(1);
    expect(fiveOfAKind.compareTo(twoPair)).toBe(1);
    expect(fiveOfAKind.compareTo(onePair)).toBe(1);
    expect(fiveOfAKind.compareTo(highCard)).toBe(1);

    expect(fourOfAKind.compareTo(fiveOfAKind)).toBe(-1);
    expect(fourOfAKind.compareTo(fourOfAKind)).toBe(0);
    expect(fourOfAKind.compareTo(fullHouse)).toBe(1);
    expect(fourOfAKind.compareTo(threeOfAKind)).toBe(1);
    expect(fourOfAKind.compareTo(twoPair)).toBe(1);
    expect(fourOfAKind.compareTo(onePair)).toBe(1);
    expect(fourOfAKind.compareTo(highCard)).toBe(1);

    expect(fullHouse.compareTo(fiveOfAKind)).toBe(-1);
    expect(fullHouse.compareTo(fourOfAKind)).toBe(-1);
    expect(fullHouse.compareTo(fullHouse)).toBe(0);
    expect(fullHouse.compareTo(threeOfAKind)).toBe(1);
    expect(fullHouse.compareTo(twoPair)).toBe(1);
    expect(fullHouse.compareTo(onePair)).toBe(1);
    expect(fullHouse.compareTo(highCard)).toBe(1);

    expect(threeOfAKind.compareTo(fiveOfAKind)).toBe(-1);
    expect(threeOfAKind.compareTo(fourOfAKind)).toBe(-1);
    expect(threeOfAKind.compareTo(fullHouse)).toBe(-1);
    expect(threeOfAKind.compareTo(threeOfAKind)).toBe(0);
    expect(threeOfAKind.compareTo(twoPair)).toBe(1);
    expect(threeOfAKind.compareTo(onePair)).toBe(1);
    expect(threeOfAKind.compareTo(highCard)).toBe(1);

    expect(twoPair.compareTo(fiveOfAKind)).toBe(-1);
    expect(twoPair.compareTo(fourOfAKind)).toBe(-1);
    expect(twoPair.compareTo(fullHouse)).toBe(-1);
    expect(twoPair.compareTo(threeOfAKind)).toBe(-1);
    expect(twoPair.compareTo(twoPair)).toBe(0);
    expect(twoPair.compareTo(onePair)).toBe(1);
    expect(twoPair.compareTo(highCard)).toBe(1);

    expect(onePair.compareTo(fiveOfAKind)).toBe(-1);
    expect(onePair.compareTo(fourOfAKind)).toBe(-1);
    expect(onePair.compareTo(fullHouse)).toBe(-1);
    expect(onePair.compareTo(threeOfAKind)).toBe(-1);
    expect(onePair.compareTo(twoPair)).toBe(-1);
    expect(onePair.compareTo(onePair)).toBe(0);
    expect(onePair.compareTo(highCard)).toBe(1);

    expect(highCard.compareTo(fiveOfAKind)).toBe(-1);
    expect(highCard.compareTo(fourOfAKind)).toBe(-1);
    expect(highCard.compareTo(fullHouse)).toBe(-1);
    expect(highCard.compareTo(threeOfAKind)).toBe(-1);
    expect(highCard.compareTo(twoPair)).toBe(-1);
    expect(highCard.compareTo(onePair)).toBe(-1);
    expect(highCard.compareTo(highCard)).toBe(0);
});

test("part2", () => {
    expect(new Hand("32T3K 1", true).type).toBe(handType.onePair);
    expect(new Hand("T55J5 1", true).type).toBe(handType.fourOfAKind);
    expect(new Hand("KK677 1", true).type).toBe(handType.twoPair);
    expect(new Hand("KTJJT 1", true).type).toBe(handType.fourOfAKind);
    expect(new Hand("QQQJA 1", true).type).toBe(handType.fourOfAKind);
});

test("getWinningsPart1", () => {
    const testInput = parsePuzzle(`
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
    `, false);
    expect(getWinnings(testInput)).toBe(6440);
});

test("getWinningsPart2", () => {
    const testInput = parsePuzzle(`
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
    `, true);
    expect(getWinnings(testInput)).toBe(5905);
});
