import { test, expect } from "bun:test";
import { parseInput } from "./index";

const testInput1 = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const testInput2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const testInput3 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

test("parseInput", () => {
    const map = parseInput(testInput1);
    expect(map.instructions.getNext()).toBe("R");
    expect(map.instructions.getNext()).toBe("L");
    expect(map.instructions.getNext()).toBe("R");
    expect(map.instructions.getNext()).toBe("L");
    expect(map.instructions.getNext()).toBe("R");
    expect(map.instructions.getNext()).toBe("L");
    expect(map.nodes).toBeArrayOfSize(7);
    expect(map.nodes[0].name).toBe("AAA");
    expect(map.nodes[0].left).toBe("BBB");
    expect(map.nodes[0].right).toBe("CCC");
});

test("walk", () => {
    const map = parseInput(testInput1);
    expect(map.walk()).toBe(2);

    const map2 = parseInput(testInput2);
    expect(map2.walk()).toBe(6);
});

test("booo", () => {
    const map = parseInput(testInput3);
    expect(map.booo()).toBe(6);
});
