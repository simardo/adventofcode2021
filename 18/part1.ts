import { INPUT } from './input.ts';

const TEST1 = '[[[[[9,8],1],2],3],4]';
const TEST2 = '[7,[6,[5,[4,[3,2]]]]]';
const TEST3 = '[[6,[5,[4,[3,2]]]],1]';
const TEST4 = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
const TEST5 = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`;
const TEST6 = `[1,1]
[2,2]
[3,3]
[4,4]`;
const TEST7 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`;
const TEST8 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`;
const TEST9 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;
const TEST10 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

function doPart(input: string): string {
    const result: string = input.split('\n').reduce((previous, current) => {
        if (previous !== '') {
            previous = `[${previous},${current}]`;
        } else {
            previous = current;
        }

        const pairs = [...previous];
        let completed = false;

        while (!completed) {
            completed = true;

            let index = 0;
            let cnl = 0;
            let lastOpenIndex = -1;

            while (index < pairs.length) {
                const cur: string = pairs[index];
                if (cur === '[') {
                    cnl++;
                    lastOpenIndex = index;
                } else if (cur === ']') {
                    cnl--;
                    if (cnl >= 4 && lastOpenIndex === index - 4) {
                        const left = Number.parseInt(pairs[index - 3]);
                        const right = Number.parseInt(pairs[index - 1]);

                        let leftIndex = index - 4;
                        while (leftIndex >= 0) {
                            const n: number = Number.parseInt(pairs[leftIndex]);
                            if (!Number.isNaN(n)) {
                                pairs[leftIndex] = (n + left).toString();
                                break;
                            }
                            leftIndex--;
                        }

                        let rightIndex = index;
                        while (rightIndex < pairs.length) {
                            const n: number = Number.parseInt(pairs[rightIndex]);
                            if (!Number.isNaN(n)) {
                                pairs[rightIndex] = (n + right).toString();
                                break;
                            }
                            rightIndex++;
                        }

                        pairs.splice(index - 4, 5, '0');
                        index = -1;
                        cnl = 0;
                        lastOpenIndex = -1;
                        completed = false;
                    }
                } else if (cur === ',') {
                    // separator
                } else {
                    const n: number = Number.parseInt(cur);
                    if (Number.isNaN(n)) {
                        throw `arg error, ${n}, ${cur}`;
                    }
                }
                index++;
            }

            index = 0;
            while (index < pairs.length) {
                const cur: string = pairs[index];
                const n: number = Number.parseInt(cur);
                if (!Number.isNaN(n) && n >= 10) {
                    completed = false;
                    if (n % 2 === 0) {
                        const nn: number = n / 2;
                        pairs.splice(index, 1, '[', `${nn}`, ',', `${nn}`, ']');
                    } else {
                        const nn: number = Math.floor(n / 2);
                        pairs.splice(index, 1, '[', `${nn}`, ',', `${nn + 1}`, ']');
                    }
                    index = pairs.length;
                } else {
                    index++;
                }
            }
        }
        return pairs.join('');
    }, '');

    return result;
}

function calcMagnitude(input: string): number {
    const RE = /\[(\d+),(\d+)\]/;

    let s: string = input;

    let match: RegExpMatchArray | null;
    while ((match = RE.exec(s)) !== null) {
        s = s.replace(match[0], (Number.parseInt(match[1]) * 3 + Number.parseInt(match[2]) * 2).toString());
    }

    return Number.parseInt(s);
}

function go(input: string, magnitude: boolean, expected?: number | string): void {
    const result: number | string = magnitude ? calcMagnitude(input) : doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST1, false, '[[[[0,9],2],3],4]');
    go(TEST2, false, '[7,[6,[5,[7,0]]]]');
    go(TEST3, false, '[[6,[5,[7,0]]],3]');
    go(TEST4, false, '[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
    go(TEST5, false, '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
    go(TEST6, false, '[[[[1,1],[2,2]],[3,3]],[4,4]]');
    go(TEST7, false, '[[[[3,0],[5,3]],[4,4]],[5,5]]');
    go(TEST8, false, '[[[[5,0],[7,4]],[5,5]],[6,6]]');
    go(TEST9, false, '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
    go(TEST10, false, '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]');
    go('[[9,1],[1,9]]', true, 129);
    go('[[1,2],[[3,4],5]]', true, 143);
    go('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', true, 1384);
    go('[[[[1,1],[2,2]],[3,3]],[4,4]]', true, 445);
    go('[[[[3,0],[5,3]],[4,4]],[5,5]]', true, 791);
    go('[[[[5,0],[7,4]],[5,5]],[6,6]]', true, 1137);
    go('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', true, 3488);
    go('[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]', true, 4140);

    const snailfish: string | number = doPart(INPUT);
    console.log(calcMagnitude(snailfish as string));
})();
