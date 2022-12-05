import { INPUT } from './input.ts';

const TEST1 = `target area: x=20..30, y=-10..-5`;

function doPart(input: string): string | number {
    const RE = /x=(-?\d+)..(-?\d+),\sy=(-?\d+)..(-?\d+)/g;

    const [x1, x2, y2, y1] = RE.exec(input)!.slice(1).map(s => Number.parseInt(s));
    console.log(x1, x2, y1, y2);

    const [startX, startY] = [0, 0];

    const inRangeStepX: Set<number> = new Set<number>();
    const inRangeStepY: Set<number> = new Set<number>();
    let vx = -1;
    let vy = -1;

    let done = false;
    while (!done || inRangeStepX.size === 0) {
        done = true;

        vx++;
        let x: number = startX;
        let step = 0;
        let veloX: number = vx;

        while (veloX > 0 && x < x2) {
            step++;

            x += veloX;
            veloX--;

            if (x >= x1 && x <= x2) {
                inRangeStepX.add(vx);
                done = false;
            }
        }
    }

    done = false;
    while (!done || inRangeStepY.size === 0) {
        done = true;

        vy++;
        let y: number = startY;
        let step = 0;
        let veloY: number = vy;

        while (y > y2) {
            step++;

            y += veloY;
            veloY--;

            if (y <= y1 && y >= y2) {
                inRangeStepY.add(vy);
                done = false;
            }
        }
    }

    let minX: number = Number.MAX_VALUE;
    let maxX: number = Number.MIN_VALUE;

    let minY: number = Number.MAX_VALUE;
    let maxY: number = Number.MIN_VALUE;

    for (const x of inRangeStepX) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
    }

    for (const y of inRangeStepY) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    minX = -800;
    maxX = 800;
    minY = -800;
    maxY = 800;

    const result: Set<string> = new Set<string>();

    for (let x: number = minX; x <= maxX; x++) {
        for (let y: number = minY; y <= maxY; y++) {
            let vlx: number = x;
            let vly: number = y;
            let fx = 0;
            let fy = 0;
            done = false;
            let tempResult: number = Number.MIN_SAFE_INTEGER;
            while (fy > y2 && !done) {
                fx += vlx;
                fy += vly;
                tempResult = Math.max(fy, tempResult);

                if (vlx > 0) {
                    vlx--;
                } else if (vlx < 0) {
                    vlx++
                }
                vly--;

                if (fx >= x1 && fx <= x2 && fy <= y1 && fy >= y2) {
                    result.add(`x:${x},y:${y}`);
                }
            }
        }
    }

    return result.size;
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 112);
    go(INPUT);
})();
