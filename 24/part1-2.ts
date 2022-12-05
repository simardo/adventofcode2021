import { INPUT } from './input.ts';

const TEST1 = `inp x
mul x -1`;

const TEST2 = `inp z
inp x
mul z 3
eql z x`;

const TEST3 = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;

function doPart1(input: string, instructions: string): void {
    const inputs: number[] = [...input].reverse().map(s => Number.parseInt(s));

    const registry: Record<string, number> = {
        w: 0,
        x: 0,
        y: 0,
        z: 0,
    };

    const program: string[][] = instructions.split('\n').map(s => s.split(' '));
    program.forEach(p => {
        const [op, a, bRaw] = p;
        const tmp: number = Number.parseInt(bRaw);
        const b: number = Number.isNaN(tmp) ? registry[bRaw] : tmp;

        let log = true;
        if (op === 'inp') {
            console.log(14 - inputs.length + 1, '----------------');
            log = false;
            registry[a] = inputs.pop()!;
        } else if (op === 'add') {
            registry[a] = registry[a] + b;
            // log = false;
        } else if (op === 'mul') {
            registry[a] = registry[a] * b;
            // log = false;
        } else if (op === 'div') {
            if (b === 0) {
                throw 'Div by 0';
            }
            registry[a] = Math.floor(registry[a] / b);
            // log = b === 26;
        } else if (op === 'mod') {
            if (registry[a] < 0 || b <= 0) {
                throw 'MOD args error';
            }
            registry[a] = registry[a] % b;
            // log = false;
        } else if (op === 'eql') {
            registry[a] = registry[a] === b ? 1 : 0;
        } else if (op.startsWith('_')) {
            // comment
            log = false;
        } else {
            throw 'Op not found';
        }
        if (log) {
            console.log(p, registry);
        }
    });

    // console.log(registry);
}

// doPart1('51', TEST1);
// doPart1('93', TEST2);
// doPart1('39', TEST2);
// doPart1('7', TEST3);
// doPart1('99995969919326', INPUT);
doPart1('48111514719111', INPUT);
