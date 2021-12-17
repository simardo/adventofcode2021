import { INPUT } from './input.ts';

const TEST1: string = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

type Coords = [number, number];

type DijNode = {
    coords: Coords;
    parent?: DijNode;
    score: number;
    visited?: boolean;
    destination?: boolean;
}

type DijScore = { [key: string]: DijNode }

function toString(x: number, y: number): string {
    return `x:${x},y:${y}`;
}

function dijkstra(
    fromFn: () => Coords,
    toFn: () => Coords,
    nextFromFn: (x: number, y: number) => Coords[],
    scoreAtFn: (x: number, y: number) => number | undefined): DijNode | undefined {

    const scoredNodes: DijScore = {};
    const visitedNodes: DijScore = {};

    const [fromX, fromY] = fromFn();
    const [toX, toY] = toFn();

    const node0: DijNode = { coords: [fromX, fromY], score: 0 };
    scoredNodes[toString(fromX, fromY)] = node0;

    let completed: boolean = false;

    while (!completed) {
        const bestNode: DijNode = Object.values(scoredNodes).reduce((p, sn) => p === undefined || sn.score < p.score ? sn : p, undefined!);

        const visit: (x: number, y: number) => void = ((x, y) => {
            const score: number | undefined = scoreAtFn(x, y);
            if (score) {
                const key: string = toString(x, y);
                let currentNode: DijNode | undefined = scoredNodes[key];
                let visitedNode: DijNode | undefined = visitedNodes[key];

                if (currentNode === undefined && visitedNode === undefined) {
                    currentNode = { coords: [x, y], score: Number.MAX_VALUE, destination: x === toX && y === toY };
                    scoredNodes[key] = currentNode;
                }
                if (currentNode) {
                    const newScore: number = bestNode.score + score;
                    if (newScore < currentNode.score) {
                        currentNode.score = newScore;
                        currentNode.parent = bestNode;
                    }
                }
            }
        });

        if (bestNode) {
            const [nodeX, nodeY] = bestNode.coords;
            nextFromFn(nodeX, nodeY).forEach(n => {
                const [toVisitX, toVisitY] = n;
                visit(toVisitX, toVisitY);
            });

            bestNode.visited = true;
            const nodeKey: string = toString(nodeX, nodeY);
            delete scoredNodes[nodeKey];
            visitedNodes[nodeKey] = bestNode;

            completed = bestNode.visited === true && bestNode.destination === true;
        } else {
            completed = true;
        }
    }

    return Object.values(visitedNodes).find(f => f.destination === true);
}

function doPart(input: string): string | number {
    const map: number[][] = input.split('\n').map(s => [...s].map(n => Number.parseInt(n)));

    const dn: DijNode = dijkstra(
        () => [0, 0],
        () => [map[0].length - 1, map.length - 1],
        (x, y) => [
            [x, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x, y + 1]
        ],
        (x, y) => x >= 0 && y >= 0 && map[y] !== undefined && map[y][x] !== undefined ? map[y][x] : undefined
    )!;

    return dn.score;
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 40);
    go(INPUT);
})();
