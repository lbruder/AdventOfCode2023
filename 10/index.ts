import { readFileSync } from "fs";

export class Board {
    private readonly tiles: string[] = [];

    constructor(tiles: string[]) {
        this.tiles = tiles;
    }

    getTile(x: number, y: number): string {
        if (x < 0 || y < 0 || y >= this.tiles.length) return ".";
        if (x >= this.tiles[y].length) return ".";
        return this.tiles[y][x];
    }

    findStartPosition(): Position {
        for (let y=0; y<this.tiles.length; y++) {
            const row = this.tiles[y];
            for (let x=0; x<row.length; x++) {
                if (row[x] === "S") {
                    return new Position(this, x, y, null);
                }
            }
        }
        throw "No starting position found";
    }
}

export function parseInput(input: string): Board {
    return new Board(input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== ""));
}

export class Position {
    readonly board: Board;
    readonly x: number;
    readonly y: number;
    readonly fromWhere: Position | null;

    constructor(board: Board, x: number, y: number, fromWhere: Position | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.fromWhere = fromWhere;
    }

    step(): Position {
        const connections = this.getConnections();
        const fromWhere = this.fromWhere; // just to make Typescript happy
        if (fromWhere === null) return connections[0];
        return connections.filter(i => !(i.x === fromWhere.x && i.y === fromWhere.y))[0];
    }

    getConnections(): Position[] {
        const connections: Position[] = [];
        const tile = this.board.getTile(this.x, this.y);
        switch (tile) {
            case "|":
                connections.push(new Position(this.board, this.x, this.y+1, this));
                connections.push(new Position(this.board, this.x, this.y-1, this));
                break;
            case "-":
                connections.push(new Position(this.board, this.x+1, this.y, this));
                connections.push(new Position(this.board, this.x-1, this.y, this));
                break;
            case "L":
                connections.push(new Position(this.board, this.x+1, this.y, this));
                connections.push(new Position(this.board, this.x, this.y-1, this));
                break;
            case "J":
                connections.push(new Position(this.board, this.x-1, this.y, this));
                connections.push(new Position(this.board, this.x, this.y-1, this));
                break;
            case "7":
                connections.push(new Position(this.board, this.x-1, this.y, this));
                connections.push(new Position(this.board, this.x, this.y+1, this));
                break;
            case "F":
                connections.push(new Position(this.board, this.x+1, this.y, this));
                connections.push(new Position(this.board, this.x, this.y+1, this));
                break;
            case "S":
                const north = this.board.getTile(this.x, this.y-1);
                const south = this.board.getTile(this.x, this.y+1);
                const east  = this.board.getTile(this.x+1, this.y);
                const west  = this.board.getTile(this.x-1, this.y);
                if (north == "|" || north == "7" || north == "F") connections.push(new Position(this.board, this.x, this.y-1, this));
                if (south == "|" || north == "J" || north == "L") connections.push(new Position(this.board, this.x, this.y+1, this));
                if (east  == "-" || east == "7"  || east  == "J") connections.push(new Position(this.board, this.x+1, this.y, this));
                if (west  == "-" || west == "F"  || west  == "L") connections.push(new Position(this.board, this.x-1, this.y, this));
                break;
            default:
                throw "Whoopsie";
        }
        return connections.filter(i => this.board.getTile(i.x, i.y) != "S");
    }

    puzzle1(): number {
        let steps = 1;
        let positions = this.getConnections();
        if (positions.length != 2) throw "Whoopsie";
        while (true) {
            positions = positions.map(i => i.step());
            steps++;
            if (positions[0].x == positions[1].x && positions[0].y == positions[1].y) return steps;
        }
    }
}


const input = parseInput(readFileSync("input.txt").toString());
console.log(input.findStartPosition().puzzle1());
