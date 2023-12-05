import { readFileSync } from "fs";

const reGame = /^Game (\d+): (.*)$/;
const reColor = /^(\d+) (red|green|blue)$/;

export class Game {
    id:       number;
    maxRed:   number;
    maxGreen: number;
    maxBlue:  number;

    constructor(s: string) {
        const m = reGame.exec(s);
        if (m === null) throw "Nope: " + s;
        this.id = parseInt(m[1]);
        const definition = m[2];
        const parts = definition.split(";").map(i => i.trim());

        this.maxRed = this.maxGreen = this.maxBlue = 0;

        for (const part of parts) {
            const colors = part.split(",").map(i => i.trim());
            for (const color of colors) {
                const cm = reColor.exec(color);
                if (cm !== null) {
                    const amount = parseInt(cm[1]);
                    switch(cm[2]) {
                        case "red":   this.maxRed   = Math.max(this.maxRed,   amount); break;
                        case "green": this.maxGreen = Math.max(this.maxGreen, amount); break;
                        case "blue":  this.maxBlue  = Math.max(this.maxBlue,  amount); break;
                    }
                }
            }
        }
    }

    getPower(): number {
        return this.maxRed * this.maxGreen * this.maxBlue;
    }
};

export function isGamePossible(red: number, green: number, blue: number, game: Game): boolean {
    if (game.maxRed > red)     return false;
    if (game.maxGreen > green) return false;
    if (game.maxBlue > blue)   return false;
    return true;
}

export function sumOfPossibleIDs(red: number, green: number, blue: number, games: Game[]): number {
    return games
        .filter(i => isGamePossible(red, green, blue, i))
        .map(i => i.id)
        .reduce((acc, i) => acc+i);
}

function puzzle3(input: string) {
    const lines = input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line != "");
    const games = lines.map(line => new Game(line));
    console.log(sumOfPossibleIDs(12, 13, 14, games));
}

function puzzle4(input: string) {
    const lines = input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line != "");
    const games = lines.map(line => new Game(line));
    const powerSum = games
        .map(game => game.getPower())
        .reduce((acc, i) => acc+i);
    console.log(powerSum);
}

puzzle3(readFileSync("input.txt").toString());
puzzle4(readFileSync("input.txt").toString());
