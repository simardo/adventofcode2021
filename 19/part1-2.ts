import { INPUT } from './input.ts';

const TEST0 = `--- scanner 0 ---
-1,-1,1
-2,-2,2
-3,-3,3
-2,-3,1
5,6,-4
8,0,7`;

const TEST1 = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`;

type Axe = 'x' | 'y' | 'z';

const axes: Map<Axe, number> = new Map([
    ['x', 0],
    ['y', 1],
    ['z', 2],
]);

type PosCoord = [Axe, number];
type ScannerPos = PosCoord[];

const positions: ScannerPos[] = [
    // front
    [['x', 1], ['y', 1], ['z', 1]],
    [['y', 1], ['x', -1], ['z', 1]],
    [['x', -1], ['y', -1], ['z', 1]],
    [['y', -1], ['x', 1], ['z', 1]],

    // back
    [['x', -1], ['y', 1], ['z', -1]],
    [['y', 1], ['x', 1], ['z', -1]],
    [['x', 1], ['y', -1], ['z', -1]],
    [['y', -1], ['x', -1], ['z', -1]],

    // right
    [['z', 1], ['y', 1], ['x', -1]],
    [['y', 1], ['z', -1], ['x', -1]],
    [['z', -1], ['y', -1], ['x', -1]],
    [['y', -1], ['z', 1], ['x', -1]],

    // left
    [['z', -1], ['y', 1], ['x', 1]],
    [['y', 1], ['z', 1], ['x', 1]],
    [['z', 1], ['y', -1], ['x', 1]],
    [['y', -1], ['z', -1], ['x', 1]],

    // top
    [['x', 1], ['z', 1], ['y', -1]],
    [['z', 1], ['x', -1], ['y', -1]],
    [['x', -1], ['z', -1], ['y', -1]],
    [['z', -1], ['x', 1], ['y', -1]],

    // bottom
    [['x', -1], ['z', 1], ['y', 1]],
    [['z', 1], ['x', 1], ['y', 1]],
    [['x', 1], ['z', -1], ['y', 1]],
    [['z', -1], ['x', -1], ['y', 1]]
];

type Beacon = number[];

type ScannerView = Beacon[];

type ScannerLink = {
    scanner: Scanner;
    view: number;
    delta: number[];
}

type Scanner = {
    id: number;
    views: ScannerView[];
    links: ScannerLink[];
}

function toView(view: number, coords: number[]): number[] {
    const [p1, p2, p3] = positions[view];
    const [axe1, mult1] = p1;
    const [axe2, mult2] = p2;
    const [axe3, mult3] = p3;

    const x = coords[axes.get(axe1)!] * mult1;
    const y = coords[axes.get(axe2)!] * mult2;
    const z = coords[axes.get(axe3)!] * mult3;

    return [x, y, z];
}

function toFront(view: number, coords: number[]): number[] {
    const [p1, p2, p3] = positions[view];

    const [axe1, mult1] = p1;
    const [axe2, mult2] = p2;
    const [axe3, mult3] = p3;

    const [x, y, z] = coords;
    const result: number[] = [x, y, z];

    result[axes.get(axe1)!] = x * mult1;
    result[axes.get(axe2)!] = y * mult2;
    result[axes.get(axe3)!] = z * mult3;

    return result;
}

function findAll(from: Beacon[], target: Beacon[], x: number, y: number, z: number): Beacon[] | undefined {
    let result = 0;

    const coords: Beacon[] = [];

    from.forEach(f => {
        const [fX, fY, fZ] = f;
        target.forEach(t => {
            const [tX, tY, tZ] = t;
            if (fX - tX === x && fY - tY === y && fZ - tZ === z) {
                result++;

                coords.push([tX, tY, tZ]);
            }
        });
    });

    if (result >= 12) {
        return coords;
    } else {
        return undefined;
    }
}

function findMatch(from: Scanner, target: Scanner): void {
    const matchLink: ScannerLink = { delta: [], scanner: from, view: -1 };
    let result: Beacon[] = [];

    from.views[0].forEach(fvb => {
        const [fromViewX, fromViewY, fromViewZ] = fvb;
        target.views.forEach((tv, tvi) => {
            tv.forEach(tvb => {
                const [targetViewX, targetViewY, targetViewZ] = tvb;

                const diffX: number = fromViewX - targetViewX;
                const diffY: number = fromViewY - targetViewY;
                const diffZ: number = fromViewZ - targetViewZ;

                const matches: Beacon[] | undefined = findAll(from.views[0], tv, diffX, diffY, diffZ);
                if (matches && matches.length > result.length) {
                    result = matches;
                    matchLink.delta = [diffX, diffY, diffZ];
                    matchLink.view = tvi;
                }
            });
        });
    });

    if (matchLink.view !== -1) {
        target.links.push(matchLink);
    }
}

function translateToLinks(coords: Beacon[], pos: Beacon, scanner: Scanner, visited: Set<number>): [Beacon[], Beacon] {
    let result: [Beacon[], Beacon] | undefined = undefined;

    for (let s = 0; s < scanner.links.length; s++) {
        const scanLink: ScannerLink = scanner.links[s];
        if (!visited.has(scanLink.scanner.id)) {
            visited.add(scanLink.scanner.id);
            const translated: [Beacon[], Beacon] = translateToLink(coords, pos, scanLink);
            if (scanLink.scanner.id === 0) {
                result = translated;
            } else if (translated !== undefined) {
                const toScan: Scanner = scanLink.scanner;
                result = translateToLinks(translated[0], translated[1], toScan, new Set<number>(visited));
            }
            if (result !== undefined) {
                break;
            }
        }
    }
    return result!;
}

function translateToLink(fromCoords: Beacon[], fromPos: Beacon, link: ScannerLink): [ScannerView, Beacon] {
    const viewCoords: Beacon[] = fromCoords.map(b => toView(link.view, b));

    const [vx, vy, vz] = toView(link.view, fromPos);

    const [dx, dy, dz] = link.delta;

    return [viewCoords.map(b => {
        const [x, y, z] = b;
        return [x + dx, y + dy, z + dz];
    }), [vx + dx, vy + dy, vz + dz]];
}

function doPart(input: string): [number, number] {
    const scannerBeacons: number[][][] = input.split('\n\n').map(s => s.split('\n').slice(1).map(xyz => xyz.split(',').map(c => Number.parseInt(c))));

    const scanners: Scanner[] = [];

    scannerBeacons.forEach((sb, sbidx) => {
        const scanner: Scanner = { id: sbidx, views: new Array(24), links: [] };
        scanners.push(scanner);

        sb.forEach(b => {
            positions.forEach((_, pidx) => {
                const [x, y, z] = toView(pidx, b);

                let view: ScannerView | undefined = scanner.views[pidx];
                if (view === undefined) {
                    view = [];
                    scanner.views[pidx] = view;
                }
                view.push([x, y, z]);
            });
        });
    });

    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners.length; j++) {
            if (i !== j) {
                findMatch(scanners[i], scanners[j]);
            }
        }
    }

    const sky: Set<string> = new Set<string>();
    const scannerPos: Beacon[] = [];
    const computed: Set<number> = new Set<number>();

    scanners.forEach(cur => {
        if (!computed.has(cur.id)) {
            computed.add(cur.id);

            const origins = cur.views[0];
            let dest: [Beacon[], Beacon] | undefined = undefined;
            dest = translateToLinks(origins, [0, 0, 0], cur, new Set<number>())

            dest[0].forEach(c => sky.add(`${c[0]},${c[1]},${c[2]}`))

            scannerPos.push(dest[1]);
        }
    });

    let maxDist = 0;
    for (let i = 0; i < scannerPos.length; i++) {
        for (let j = i + 1; j < scannerPos.length; j++) {
            const [ax, ay, az] = scannerPos[i];
            const [bx, by, bz] = scannerPos[j];
            const dist = Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz);
            maxDist = Math.max(maxDist, dist);
        }
    }

    return [sky.size, maxDist];
}

function go(input: string, expected?: number | string | [number, number]): void {
    const result: number | string | [number, number] = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, [79, 3621]);
    go(INPUT);
})();
