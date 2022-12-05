import { INPUT } from './input.ts';

const TEST1 = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

function key(x: number, y: number): string {
    return `x:${x},y:${y}`;
}

function doPart(input: string): string | number {
    const [algoS, imageS] = input.split('\n\n');

    const image: { [key: string]: [string, string] } = {};

    const algo: string[] = [...algoS];

    let minX: number = Number.MAX_VALUE;
    let maxX: number = Number.MIN_SAFE_INTEGER;
    let minY: number = Number.MAX_VALUE;
    let maxY: number = Number.MIN_SAFE_INTEGER;

    imageS.split('\n').forEach((vy, y) => {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        [...vy].forEach((vx, x) => {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            image[key(x, y)] = [vx, vx];
        });
    });

    const getCellValue: (x: number, y: number) => string = (x, y) => {
        const k: string = key(x, y);
        const pixel: [string, string] = image[k];
        if (pixel === undefined) {
            image[k] = ['.', '.'];
        }
        return image[k][0];
    }

    const getColorFor: (x: number, y: number) => string = (x, y) => {
        const line1: string[] = [];
        const line2: string[] = [];
        const line3: string[] = [];

        line1.push(getCellValue(x - 1, y - 1));
        line1.push(getCellValue(x, y - 1));
        line1.push(getCellValue(x + 1, y - 1));

        line2.push(getCellValue(x - 1, y));
        line2.push(getCellValue(x, y));
        line2.push(getCellValue(x + 1, y));

        line3.push(getCellValue(x - 1, y + 1));
        line3.push(getCellValue(x, y + 1));
        line3.push(getCellValue(x + 1, y + 1));

        const colorNum: number = Number.parseInt(line1.concat(line2).concat(line3).map(s => s === '.' ? '0' : '1').join(''), 2);
        return algo[colorNum];
    }

    for (let step = 1; step <= 50; step++) {
        const iter: number = step % 2 === 0 ? 0 : 4;

        for (let x: number = minX - iter; x <= maxX + iter; x++) {
            for (let y: number = minY - iter; y <= maxY + iter; y++) {
                const color: string = getColorFor(x, y);
                image[key(x, y)][1] = color;
                if (!(color === '.' || color === '#')) {
                    throw color;
                }
            }
        }

        minX -= iter;
        maxX += iter;
        minY -= iter;
        maxY += iter;

        if (step % 2 === 0) {
            for (let x: number = minX; x <= maxX; x++) {
                image[key(x, minY)][1] = '.';
            }

            for (let y: number = minY; y <= maxY; y++) {
                image[key(minX, y)][1] = '.';
            }
        }

        Object.values(image).forEach(v => {
            v[0] = v[1];
        });
    }

    let r = 0;
    for (let y: number = minY; y <= maxY; y++) {
        const line: string[] = [];
        for (let x: number = minX; x <= maxX; x++) {
            const cell: string = getCellValue(x, y);
            line.push(cell);
            if (cell === '#') {
                r++;
            }
        }
    }

    return r;
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 3351);
    go(INPUT);
})();
