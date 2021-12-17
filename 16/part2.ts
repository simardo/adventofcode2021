import { INPUT } from './input.ts';

const TEST1: string = `C200B40A82`;
const TEST2: string = `04005AC33890`;
const TEST3: string = `880086C3E88112`;
const TEST4: string = `CE00C43D881120`;
const TEST5: string = `D8005AC2A8F0`;
const TEST6: string = `F600BC2D8F`;
const TEST7: string = `9C005AC2F8F0`;
const TEST8: string = `9C0141080250320F1802104A08`;

const HEX_TABLE: string = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`

function doPart(input: string): string | number {
    const hexTable: Map<string, string> = new Map<string, string>(HEX_TABLE.split('\n').map(h => {
        const [hex, bin] = h.split(' = ');
        return [hex, bin];
    }));

    const read: (source: string[], length: number) => string[] = (src, l) => {
        let result: string[] = [];
        for (let i: number = 1; i <= l; i++) {
            result.push(src.shift()!);
        }
        return result;
    }

    const toNumber: (bits: string[]) => number = bits => Number.parseInt(bits.join(''), 2);

    const readLiteral: (source: string[]) => number = src => {
        let eop: boolean = false;
        const value: string[] = [];
        while (!eop) {
            const entry: string[] = read(src, 5);
            eop = entry.shift() === '0';
            entry.forEach(e => value.push(e));
        }
        return toNumber(value);
    }

    const readPacket: (source: string[]) => number = src => {
        read(src, 3); // version

        const type: number = toNumber(read(src, 3));

        let result: number = 0;

        if (type === 4) {
            result = readLiteral(src); 
        } else {
            const literals: number[] = [];
            const lengthType: number = toNumber(read(src, 1));
            if (lengthType === 0) {
                const numBits: number = toNumber(read(src, 15));
                const subData: string[] = read(src, numBits);
                while (subData.length > 0) {
                    literals.push(readPacket(subData));
                }
            } else {
                const numPackets: number = toNumber(read(src, 11));
                for (let i: number = 1; i <= numPackets; i++) {
                    literals.push(readPacket(src));
                }
            }
            if (type === 0) {
                result = literals.reduce((p, v) => p + v, 0);
            } else if (type === 1) {
                result = literals.reduce((p, v) => p * v, 1);
            } else if (type === 2) {
                result = literals.reduce((p, v) => Math.min(p, v), Number.MAX_VALUE);
            } else if (type === 3) {
                result = literals.reduce((p, v) => Math.max(p, v), Number.MIN_VALUE);
            } else if (type === 5) {
                result = literals[0] > literals[1] ? 1 : 0;
            } else if (type === 6) {
                result = literals[0] < literals[1] ? 1 : 0;
            } else if (type === 7) {
                result = literals[0] === literals[1] ? 1 : 0;
            } 
        }

        return result;
    };

    const data: string[] = [...([...input].map(h => hexTable.get(h)!).join(''))];

    return readPacket(data);
}

function go(input: string, expected?: number | string): void {
    const result: number | string = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, 3);
    go(TEST2, 54);
    go(TEST3, 7);
    go(TEST4, 9);
    go(TEST5, 1);
    go(TEST6, 0);
    go(TEST7, 0);
    go(TEST8, 1);

    go(INPUT);
})();
