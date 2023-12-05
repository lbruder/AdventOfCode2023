import { test, expect } from "bun:test";
import { Game, isGamePossible, sumOfPossibleIDs } from "./index";

const game1 = new Game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");
const game2 = new Game("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue");
const game3 = new Game("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");
const game4 = new Game("Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red");
const game5 = new Game("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green");

test("constructor", () => {
    expect(game1.id).toBe(1);
    expect(game1.maxRed).toBe(4);
    expect(game1.maxGreen).toBe(2);
    expect(game1.maxBlue).toBe(6);

    expect(game2.id).toBe(2);
    expect(game2.maxRed).toBe(1);
    expect(game2.maxGreen).toBe(3);
    expect(game2.maxBlue).toBe(4);

    expect(game3.id).toBe(3);
    expect(game3.maxRed).toBe(20);
    expect(game3.maxGreen).toBe(13);
    expect(game3.maxBlue).toBe(6);

    expect(game4.id).toBe(4);
    expect(game4.maxRed).toBe(14);
    expect(game4.maxGreen).toBe(3);
    expect(game4.maxBlue).toBe(15);

    expect(game5.id).toBe(5);
    expect(game5.maxRed).toBe(6);
    expect(game5.maxGreen).toBe(3);
    expect(game5.maxBlue).toBe(2);
});

test("isGamePossible", () => {
    expect(isGamePossible(12, 13, 14, game1)).toBe(true);
    expect(isGamePossible(12, 13, 14, game2)).toBe(true);
    expect(isGamePossible(12, 13, 14, game3)).toBe(false);
    expect(isGamePossible(12, 13, 14, game4)).toBe(false);
    expect(isGamePossible(12, 13, 14, game5)).toBe(true);
});

test("sumOfPossibleIDs", () => {
    expect(sumOfPossibleIDs(12, 13, 14, [game1, game2, game3, game4, game5])).toBe(8);
});

test("power", () => {
    expect(game1.getPower()).toBe(48);
    expect(game2.getPower()).toBe(12);
    expect(game3.getPower()).toBe(1560);
    expect(game4.getPower()).toBe(630);
    expect(game5.getPower()).toBe(36);
});
