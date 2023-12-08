import { readFileSync } from "fs";

export class Node {
    readonly name: string;
    readonly left: string;
    readonly right: string;

    constructor(line: string) {
        const m = /^(...) = \((...), (...)\)$/.exec(line);
        if (m === null) throw "Invalid node def: '" + line + "'";
        this.name = m[1];
        this.left = m[2];
        this.right = m[3];
    }
}

export class Instructions {
    private readonly commands: string;
    private position: number;

    constructor(line: string) {
        this.commands = line;
        this.position = 0;
    }

    getNext(): "R"|"L" {
        const ret = this.commands[this.position++];
        if (this.position >= this.commands.length) this.position = 0;
        if (ret == "R" || ret == "L") return ret;
        throw "Invalid instruction: '" + ret + "'";
    }
}

function ggt(a: number, b: number): number {
    let tmp = 1;
    while (tmp > 0) {
        tmp = a % b;
        a = b;
        b = tmp;
    }
    return a;
}

export class Map {
    readonly instructions: Instructions;
    readonly nodes: Node[];
    readonly nodesByName: Record<string, Node> = {};

    constructor(instructions: Instructions, nodes: Node[]) {
        this.instructions = instructions;
        this.nodes = nodes;
        for (const node of nodes) this.nodesByName[node.name] = node;
    }

    walk(): number {
        let steps = 0;
        let currentNode = "AAA";
        while (currentNode != "ZZZ") {
            steps++;
            const node = this.nodesByName[currentNode];
            if (!node) throw "Where am I? " + currentNode;
            currentNode = this.instructions.getNext() == "L" ? node.left : node.right;
        }
        return steps;
    }

    booo(): number {
        let startNodes = this
            .nodes
            .filter(node => node.name.endsWith("A"))
            .map(node => node.name);
        const allSteps: number[] = [];

        for (let currentNode of startNodes) {
            let steps = 0;
            while (!currentNode.endsWith("Z")) {
                steps++;
                const node = this.nodesByName[currentNode];
                if (!node) throw "Where am I? " + currentNode;
                currentNode = this.instructions.getNext() == "L" ? node.left : node.right;
            }
            allSteps.push(steps);
        }

        return allSteps.reduce((acc, i) => acc * i / ggt(acc, i));
    }
}

export function parseInput(input: string): Map {
    const lines = input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line != "");
    const instructions = new Instructions(lines.shift() ?? "");
    const nodes = lines.map(line => new Node(line));
    return new Map(instructions, nodes);
}

const input = readFileSync("input.txt").toString();
console.log(parseInput(input).walk());
console.log(parseInput(input).booo());
