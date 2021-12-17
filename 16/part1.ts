import { INPUT } from './input.ts';

const TEST1: string = `D2FE28`;
const TEST2: string = `38006F45291200`;
const TEST3: string = `EE00D40C823060`;
const TEST4: string = `8A004A801A8002F478`;
const TEST5: string = `620080001611562C8802118E34`;
const TEST6: string = `C0015000016115A2E0802F182340`;
const TEST7: string = `A0016C880162017C3686B18A3D4780`;

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
        let result: number = toNumber(read(src, 3));

        const type: number = toNumber(read(src, 3));
        if (type === 4) {
            readLiteral(src);
        } else {
            const lengthType: number = toNumber(read(src, 1));
            if (lengthType === 0) {
                const numBits: number = toNumber(read(src, 15));
                const subData: string[] = read(src, numBits);
                while (subData.length > 0) {
                    result += readPacket(subData);
                }
            } else {
                const numPackets: number = toNumber(read(src, 11));
                for (let i: number = 1; i <= numPackets; i++) {
                    result += readPacket(src);
                }
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
    // go(TEST1);
    // go(TEST2);
    // go(TEST3);
    go(TEST4, 16);
    go(TEST5, 12);
    go(TEST6, 23);
    go(TEST7, 31);

    go(INPUT);
})();
