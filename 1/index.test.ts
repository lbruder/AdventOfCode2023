import { isDigit, getDigitWord, getValueForLine, puzzleOne, puzzleTwo } from "./index"
import { test, expect } from "bun:test"

test("IsDigit", () => {
    expect(isDigit("")).toBe(false);
    expect(isDigit("a")).toBe(false);
    expect(isDigit(" ")).toBe(false);
    expect(isDigit("Z")).toBe(false);
    expect(isDigit("0")).toBe(true);
    expect(isDigit("3")).toBe(true);
    expect(isDigit("9")).toBe(true);
});

test("getDigitWord", () => {
    expect(getDigitWord("")).toBe(false);
    expect(getDigitWord("12")).toBe(false);
    expect(getDigitWord("gah")).toBe(false);
    expect(getDigitWord("12onetwothree")).toBe(false);
    expect(getDigitWord("oneight")).toBe(1);
    expect(getDigitWord("twousers")).toBe(2);
    expect(getDigitWord("threeleven")).toBe(3);
    expect(getDigitWord("fourawr")).toBe(4);
    expect(getDigitWord("five")).toBe(5);
    expect(getDigitWord("six")).toBe(6);
    expect(getDigitWord("sevenses")).toBe(7);
    expect(getDigitWord("eighteen")).toBe(8);
    expect(getDigitWord("nineleven")).toBe(9);
});

test("getValueForLine1", () => {
    expect(getValueForLine("")).toBe(0);
    expect(getValueForLine("1abc2")).toBe(12);
    expect(getValueForLine("pqr3stu8vwx")).toBe(38);
    expect(getValueForLine("a1b2c3d4e5f")).toBe(15);
    expect(getValueForLine("treb7uchet")).toBe(77);
});

test("puzzleOne", () => {
    expect(puzzleOne("")).toBe(0);
    expect(puzzleOne("  1abc2 \r\npqr3stu8vwx\t\na1b2c3d4e5f\ntreb7uchet")).toBe(142);
});

test("getValueForLine2", () => {
    expect(getValueForLine("", true)).toBe(0);
    expect(getValueForLine("two1nine", true)).toBe(29);
    expect(getValueForLine("eightwothree", true)).toBe(83);
    expect(getValueForLine("abcone2threexyz", true)).toBe(13);
    expect(getValueForLine("xtwone3four", true)).toBe(24);
    expect(getValueForLine("4nineeightseven2", true)).toBe(42);
    expect(getValueForLine("zoneight234", true)).toBe(14);
    expect(getValueForLine("7pqrstsixteen", true)).toBe(76);
});

test("puzzleTwo", () => {
    expect(puzzleTwo("two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen\n")).toBe(281);
});
