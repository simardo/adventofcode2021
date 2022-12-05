import { INPUT } from './input.ts';

const TEST1 = `Player 1 starting position: 4
Player 2 starting position: 8`;

function doPart(input: string): string | number {
    const startPos: number[] = input.split('\n').map(s => Number.parseInt(s[s.length - 1]));
    const scores: [number, number][] = [[startPos[0], 0], [startPos[1], 0]];
    let dice = 0;
    let numRolls = 0;

    const play: (player: number) => void = (p) => {
        let [pos, score] = scores[p];

        let steps = 0;
        for (let i = 1; i <= 3; i++) {
            dice++;
            if (dice > 100) {
                dice = 1;
            }
            steps += dice;
        }
        for (let newPos = 1; newPos <= steps; newPos++) {
            pos++;
            if (pos > 10) {
                pos = 1;
            }
        }
        score += pos;
        numRolls += 3;

        scores[p] = [pos, score];
    }

    while (!(scores[0][1] >= 1000 || scores[1][1] >= 1000)) {
        play(0);
        if (!(scores[0][1] >= 1000 || scores[1][1] >= 1000)) {
            play(1);
        }
    }

    const [, score] = scores.find(s => s[1] < 1000)!;

    return score * numRolls;
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 739785);
    go(INPUT);
})();
