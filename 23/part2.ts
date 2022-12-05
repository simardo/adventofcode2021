import { INPUT_2 } from './input.ts';

const TEST0 = `#############
#...........#
###B#C#B#D###
  #D#C#B#A#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

const TEST1 = `#############
#...........#
###.#.#.#.###
  #D#C#B#A#
  #D#B#A#C#
  #A#D#C#A#
  #########`;

const EMPTY_MAP = `#############
#...........#
###.#.#.#.###
  #.#.#.#.#
  #.#.#.#.#
  #.#.#.#.#
  #########`;

type Coords = [number, number];

enum AmphipodState {
    None,
    Exiting,
    Entering,
    Waiting,
    Complete
}

type Amphipod = {
    id: string;
    seq: number;
    coord: Coords;
    state: AmphipodState;
};

type Burrow = Amphipod[];

type BurrowMove = {
    burrow: Burrow;
    energy: number;
};

type DijNode = {
    burrowMove: BurrowMove;
    score: number;
    visited?: boolean;
    destination?: boolean;
};

type DijScore = Map<string, DijNode>;

function toStr(bm: BurrowMove): string {
    const key: string = bm.burrow.map(a => {
        const [x, y] = a.coord;
        return `:${a.id}:${a.seq}:${x}:${y}:${a.state}`;
    }).join();
    return key;
}

function isDest(b: Burrow): boolean {
    return b.every((a, _, all) => {
        const [x, y] = a.coord;
        const [ex1, ey1] = exit.get(a.id)![0];
        const [ex2, ey2] = exit.get(a.id)![1];
        const [ex3, ey3] = exit.get(a.id)![2];
        const [ex4, ey4] = exit.get(a.id)![3];

        return (x === ex4 && y === ey4) ||
            (x === ex3 && y === ey3 && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex4 && v.coord[1] === ey4)) ||
            (x === ex2 && y === ey2 && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex3 && v.coord[1] === ey3) && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex4 && v.coord[1] === ey4)) ||
            (x === ex1 && y === ey1 && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex2 && v.coord[1] === ey2) && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex3 && v.coord[1] === ey3) && all.find(v => v.id === a.id && v.seq !== a.seq && v.coord[0] === ex4 && v.coord[1] === ey4));
    });
}

function isPathFree(burrow: Burrow, emptyMap: string[][], fromAmphipodX: number, toExitX: number): boolean {
    let result = true;
    if (fromAmphipodX < toExitX) {
        for (let x = fromAmphipodX + 1; x < toExitX; x++) {
            result = canMoveTo(burrow, x, 1, emptyMap);
            if (!result) {
                break;
            }
        }
    } else {
        for (let x = fromAmphipodX - 1; x > toExitX; x--) {
            result = canMoveTo(burrow, x, 1, emptyMap);
            if (!result) {
                break;
            }
        }
    }

    return result;
}

function getNext(bm: BurrowMove, emptyMap: string[][], result: BurrowMove[], visited: Set<string>): void {
    const moves: BurrowMove[] = [];

    let mustMoveDone = false;

    const amphipodExiting: Amphipod | undefined = bm.burrow.find(a => a.state === AmphipodState.Exiting);
    if (amphipodExiting) {
        mustMoveDone = true;
        const [x, y] = amphipodExiting.coord;

        const exiting: BurrowMove[] = [];

        if (canMoveTo(bm.burrow, x - 1, y, emptyMap)) {
            exiting.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodExiting.id, seq: amphipodExiting.seq, coord: [x - 1, y], state: AmphipodState.Exiting }),
                energy: bm.energy + energy.get(amphipodExiting.id)!
            });
        }
        if (canMoveTo(bm.burrow, x + 1, y, emptyMap)) {
            exiting.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodExiting.id, seq: amphipodExiting.seq, coord: [x + 1, y], state: AmphipodState.Exiting }),
                energy: bm.energy + energy.get(amphipodExiting.id)!
            });
        }
        if (canMoveTo(bm.burrow, x, y - 1, emptyMap)) {
            exiting.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodExiting.id, seq: amphipodExiting.seq, coord: [x, y - 1], state: AmphipodState.Exiting }),
                energy: bm.energy + energy.get(amphipodExiting.id)!
            });
        }
        if (y === 1 && doors.find(d => d[0] === x && d[1] === y) === undefined) {
            moves.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodExiting.id, seq: amphipodExiting.seq, coord: [x, y], state: AmphipodState.Waiting }),
                energy: bm.energy
            });
        }

        exiting.forEach(e => {
            const k: string = toStr(e);
            if (!visited.has(k)) {
                visited.add(k);
                const n: BurrowMove[] = [];
                getNext(e, emptyMap, n, visited);
                moves.push(...n);
            }
        });
    }

    const amphipodEntering: Amphipod | undefined = bm.burrow.find(a => a.state === AmphipodState.Entering);
    if (amphipodEntering) {
        mustMoveDone = true;
        const [x, y] = amphipodEntering.coord;

        const entering: BurrowMove[] = [];

        if (exit.get(amphipodEntering.id)![0][0] < x && canMoveTo(bm.burrow, x - 1, y, emptyMap)) {
            entering.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodEntering.id, seq: amphipodEntering.seq, coord: [x - 1, y], state: AmphipodState.Entering }),
                energy: bm.energy + energy.get(amphipodEntering.id)!
            });
        }
        if (exit.get(amphipodEntering.id)![0][0] > x && canMoveTo(bm.burrow, x + 1, y, emptyMap)) {
            entering.push({
                burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodEntering.id, seq: amphipodEntering.seq, coord: [x + 1, y], state: AmphipodState.Entering }),
                energy: bm.energy + energy.get(amphipodEntering.id)!
            });
        }
        if (exit.get(amphipodEntering.id)![0][0] === x || exit.get(amphipodEntering.id)![1][0] === x) {
            if (canMoveTo(bm.burrow, x, y + 1, emptyMap)) {
                entering.push({
                    burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodEntering.id, seq: amphipodEntering.seq, coord: [x, y + 1], state: AmphipodState.Entering }),
                    energy: bm.energy + energy.get(amphipodEntering.id)!
                });
            } else {
                moves.push({
                    burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipodEntering.id, seq: amphipodEntering.seq, coord: [x, y], state: AmphipodState.Complete }),
                    energy: bm.energy
                });
            }
        }

        entering.forEach(e => {
            const k: string = toStr(e);
            if (!visited.has(k)) {
                visited.add(k);
                const n: BurrowMove[] = [];
                getNext(e, emptyMap, n, visited);
                moves.push(...n);
            }
        });
    }
    if (!mustMoveDone) {
        for (let i = 0; i < bm.burrow.length; i++) {
            const amphipod: Amphipod = bm.burrow[i];
            const [x, y] = amphipod.coord;

            if (amphipod.state === AmphipodState.None) {
                const [exit4X, exit4Y] = exit.get(amphipod.id)![3];
                if (x === exit4X && y === exit4Y) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Complete }),
                        energy: 0
                    });
                } else if (canMoveTo(bm.burrow, x, y - 1, emptyMap)) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Exiting }),
                        energy: 0
                    });
                }
            } else if (amphipod.state === AmphipodState.Exiting) {
                //
            } else if (amphipod.state === AmphipodState.Entering) {
                //
            } else if (amphipod.state === AmphipodState.Waiting) {
                const [exit1X, exit1Y] = exit.get(amphipod.id)![0];
                const [exit2X, exit2Y] = exit.get(amphipod.id)![1];
                const [exit3X, exit3Y] = exit.get(amphipod.id)![2];
                const [exit4X, exit4Y] = exit.get(amphipod.id)![3];

                const inExit1: Amphipod | undefined = getAmphipodAt(bm.burrow, exit1X, exit1Y);
                const inExit2: Amphipod | undefined = getAmphipodAt(bm.burrow, exit2X, exit2Y);
                const inExit3: Amphipod | undefined = getAmphipodAt(bm.burrow, exit3X, exit3Y);
                const inExit4: Amphipod | undefined = getAmphipodAt(bm.burrow, exit4X, exit4Y);
                if (inExit1 === undefined && inExit2 === undefined && inExit3 === undefined && inExit4 === undefined && isPathFree(bm.burrow, emptyMap, x, exit1X)) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Entering }),
                        energy: 0
                    });
                } else if (inExit1 === undefined && inExit2 === undefined && inExit3 === undefined && inExit4 !== undefined && inExit4.id === amphipod.id && isPathFree(bm.burrow, emptyMap, x, exit1X)) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Entering }),
                        energy: 0
                    });
                } else if (inExit1 === undefined && inExit2 === undefined && inExit3 !== undefined && inExit4 !== undefined && inExit3.id === amphipod.id && inExit4.id === amphipod.id && isPathFree(bm.burrow, emptyMap, x, exit1X)) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Entering }),
                        energy: 0
                    });
                } else if (inExit1 === undefined && inExit2 !== undefined && inExit3 !== undefined && inExit4 !== undefined && inExit2.id === amphipod.id && inExit3.id === amphipod.id && inExit4.id === amphipod.id && isPathFree(bm.burrow, emptyMap, x, exit1X)) {
                    moves.push({
                        burrow: cloneBurrowWithAmphipod(bm.burrow, { id: amphipod.id, seq: amphipod.seq, coord: [x, y], state: AmphipodState.Entering }),
                        energy: 0
                    });
                }
            }
        }
    }

    result.push(...moves);
}

function swap(heap: DijNode[], oldX: number, newX: number): number {
    const temp: DijNode = heap[newX];
    heap[newX] = heap[oldX];
    heap[oldX] = temp;

    return newX;
}

function percolateDown(heap: DijNode[]): void {
    let x: number | undefined = 1;

    while (x !== undefined) {
        const root: DijNode | undefined = heap[x];
        const childLeft: DijNode = heap[2 * x];
        const childRight: DijNode = heap[(2 * x) + 1];

        if (childRight && childRight.score < root.score && childRight.score < childLeft.score) {
            x = swap(heap, x, (2 * x) + 1);
        } else if (childLeft && childLeft.score < root.score) {
            x = swap(heap, x, 2 * x);
        } else {
            x = undefined;
        }
    }
}

function percolateUp(heap: DijNode[]): void {
    let x: number | undefined = heap.length - 1;

    while (x !== undefined) {
        const leaf: DijNode | undefined = heap[x];
        const parent: DijNode = heap[Math.floor(x / 2)];
        if (parent && parent.score > leaf.score) {
            x = swap(heap, x, Math.floor(x / 2));
        } else {
            x = undefined;
        }
    }
}

function dequeueFrom(heap: DijNode[]): DijNode {
    const result: DijNode = heap.length <= 2 ? heap.pop()! : heap[1];
    if (heap.length > 2) {
        heap[1] = heap.pop()!;
        percolateDown(heap);
    }

    return result;
}

function enqueueTo(heap: DijNode[], node: DijNode): void {
    heap.push(node);
    percolateUp(heap);
}

function visit(scoredNodes: DijScore, visitedNodes: DijScore, heap: DijNode[], bestNode: DijNode, bm: BurrowMove): void {
    const score: number = bm.energy;
    const key: string = toStr(bm);
    let currentNode: DijNode | undefined = scoredNodes.get(key);
    const visitedNode: DijNode | undefined = visitedNodes.get(key);

    if (currentNode === undefined && visitedNode === undefined) {
        currentNode = { burrowMove: bm, score: Number.MAX_VALUE, destination: isDest(bm.burrow) };
        scoredNodes.set(key, currentNode);
        enqueueTo(heap, currentNode);
    }
    if (currentNode) {
        const newScore: number = bestNode.score + score;
        if (newScore < currentNode.score) {
            currentNode.score = newScore;
            percolateUp(heap);
        }
    }
};

function dijkstra(fromArg: Burrow, emptyMap: string[][]): DijNode | undefined {
    const scoredNodes: DijScore = new Map<string, DijNode>();
    const visitedNodes: DijScore = new Map<string, DijNode>();

    const heap: DijNode[] = [undefined!];

    const fromBurrow: Burrow = fromArg;
    const from: BurrowMove = { burrow: fromBurrow, energy: 0 };

    const node0: DijNode = { burrowMove: from, score: 0 };
    scoredNodes.set(toStr(from), node0);
    heap.push(node0);

    let completed = false;

    while (!completed) {
        const bestNode: DijNode = dequeueFrom(heap);

        if (bestNode) {
            const node: BurrowMove = bestNode.burrowMove;
            const nb: BurrowMove[] = [];
            const sb: Set<string> = new Set<string>();
            getNext(node, emptyMap, nb, sb);
            nb.forEach(n => {
                visit(scoredNodes, visitedNodes, heap, bestNode, n);
            });

            bestNode.visited = true;
            const nodeKey: string = toStr(node);
            scoredNodes.delete(nodeKey);
            visitedNodes.set(nodeKey, bestNode);

            completed = bestNode.visited === true && bestNode.destination === true;
        } else {
            completed = true;
        }
    }

    return [...visitedNodes.values()].find(f => f.destination === true);
}

const energy: Map<string, number> = new Map<string, number>([
    ['A', 1],
    ['B', 10],
    ['C', 100],
    ['D', 1000]
]);

const exit: Map<string, Coords[]> = new Map<string, Coords[]>([
    ['A', [[3, 2], [3, 3], [3, 4], [3, 5]]],
    ['B', [[5, 2], [5, 3], [5, 4], [5, 5]]],
    ['C', [[7, 2], [7, 3], [7, 4], [7, 5]]],
    ['D', [[9, 2], [9, 3], [9, 4], [9, 5]]]
]);

const doors: Coords[] = [[3, 1], [5, 1], [7, 1], [9, 1]];

function cloneBurrowWithAmphipod(b: Burrow, a: Amphipod): Burrow {
    return b.map(v => {
        if (v.id === a.id && v.seq === a.seq) {
            return a;
        } else {
            return { id: v.id, seq: v.seq, coord: [v.coord[0], v.coord[1]], state: v.state }
        }
    });
}

function getCellAt(x: number, y: number, emptyMap: string[][]): string | undefined {
    return emptyMap[y] !== undefined ? emptyMap[y][x] : undefined
}

function getAmphipodAt(b: Burrow, x: number, y: number): Amphipod | undefined {
    return b.find(a => a.coord[0] === x && a.coord[1] === y);
}

function canMoveTo(b: Burrow, x: number, y: number, emptyMap: string[][]): boolean {
    let result = false;
    const pos: string | undefined = getCellAt(x, y, emptyMap);
    if (pos === '.') {
        result = getAmphipodAt(b, x, y) === undefined;
    }
    return result;
}

function doPart(input: string): string | number {
    const map: string[][] = input.split('\n').map(s => [...s]);
    const emptyMap: string[][] = EMPTY_MAP.split('\n').map(s => [...s]);

    const ids: Set<string> = new Set();
    const burrow: Burrow = [];

    map.forEach((vy, y) => {
        vy.forEach((vx, x) => {
            if (vx !== '.' && vx !== '#' && vx !== ' ') {
                let id = 0;
                while (ids.has(vx + id)) {
                    id++
                }
                ids.add(vx + id);
                burrow.push({
                    id: vx,
                    seq: id,
                    coord: [x, y],
                    state: AmphipodState.None
                });
            }
        })
    });

    const dn: DijNode = dijkstra(burrow, emptyMap)!;

    return dn.score;
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 44169);
    go(INPUT_2);
})();
