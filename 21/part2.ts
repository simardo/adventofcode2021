import { INPUT } from './input.ts';

const TEST1 = `Player 1 starting position: 4
Player 2 starting position: 8`;

type Step = {
    diceSum: number;
    pos1: number;
    score1: number;
    pos2: number;
    score2: number;
    p1ToPlay: boolean;
    occ: number;
}

function computeDistinctSums(): Record<number, number> {
    const result: Record<number, number> = {};
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                const r: number = i + j + k;
                if (result[r] === undefined) {
                    result[r] = 0;
                }
                result[r] = result[r] + 1;
            }
        }
    }
    return result;
}

function doPart(input: string): string | number {
    const startPos: number[] = input.split('\n').map(s => Number.parseInt(s[s.length - 1]));

    const stepSums: Record<number, number> = computeDistinctSums();

    let win1 = 0;
    let win2 = 0;

    const map: Step[] = []
    map.push({ diceSum: 0, pos1: startPos[0], score1: 0, pos2: startPos[1], score2: 0, occ: 1, p1ToPlay: true });
    let toProcess: Step[] = [];
    toProcess.push(map[0]);
    while (toProcess.length > 0) {
        const nextToProcess: Step[] = [];
        toProcess.forEach(tp => {
            const pos: number = tp.p1ToPlay ? tp.pos1 : tp.pos2;
            Object.keys(stepSums).map(k => Number.parseInt(k)).forEach(k => {
                const newPos: number = pos + k;
                const realNewPos: number = newPos > 10 ? newPos - 10 : newPos;

                const newStep: Step = tp.p1ToPlay
                    ? { diceSum: k, pos1: realNewPos, pos2: tp.pos2, score1: tp.score1 + realNewPos, score2: tp.score2, occ: stepSums[k] * tp.occ, p1ToPlay: false }
                    : { diceSum: k, pos1: tp.pos1, pos2: realNewPos, score1: tp.score1, score2: tp.score2 + realNewPos, occ: stepSums[k] * tp.occ, p1ToPlay: true };
                if ((tp.p1ToPlay && newStep.score1 < 21) || (!tp.p1ToPlay && newStep.score2 < 21)) {
                    nextToProcess.push(newStep);
                } else {
                    if (tp.p1ToPlay) {
                        win1 += newStep.occ;
                    } else {
                        win2 += newStep.occ;
                    }
                }
            });
        });
        toProcess = nextToProcess;
    }

    return Math.max(win1, win2);
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 444356092776315);
    go(INPUT);
})();
