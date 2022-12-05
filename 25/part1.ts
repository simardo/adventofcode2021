import { INPUT } from './input.ts';

const TEST1 = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

type Cell = {
    actual: number;
    next?: number;
}

function doPart1(input: string): void {
    const map: Cell[][] = input.split('\n').map(s => [...s].map(c => c === '>' ? { actual: 1 } : c === 'v' ? { actual: 2 } : { actual: 0 }));

    const apply: () => boolean = () => {
        let result = false;
        map.forEach(line => {
            line.forEach(cell => {
                if (cell.next !== undefined) {
                    cell.actual = cell.next;
                    cell.next = undefined;
                    result = true;
                }
            });
        });
        return result;
    }

    let hasMove = true;
    let step = 0;
    while (hasMove) {
        hasMove = false;
        // step a;
        map.forEach((line, y) => {
            line.forEach((cell, x) => {
                const n: number = x < line.length - 1 ? x + 1 : 0;
                if (map[y][x].actual === 1 && map[y][n].actual === 0) {
                    map[y][n].next = 1;
                    cell.next = 0;
                }
            })
        });
        hasMove = apply();
        // step b;
        map.forEach((line, y) => {
            line.forEach((cell, x) => {
                const n: number = y < map.length - 1 ? y + 1 : 0;
                if (map[y][x].actual === 2 && map[n][x].actual === 0) {
                    map[n][x].next = 2;
                    cell.next = 0;
                }
            })
        });
        hasMove = apply() || hasMove;
        step++;
    }
    console.log(step);
}

doPart1(TEST1);
doPart1(INPUT);
