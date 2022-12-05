import { INPUT } from './input.ts';

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

function doPart(input: string): number {
    let result = 0;

    const snailfishNumbers: string[] = input.split('\n');
    for (let i = 0; i < snailfishNumbers.length; i++) {
        for (let j = 0; j < snailfishNumbers.length; j++) {
            if (j !== i) {
                const pairs: string[] = [...`[${snailfishNumbers[i]},${snailfishNumbers[j]}]`];
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
                const snailfish: string = pairs.join('');
                const mag: number = calcMagnitude(snailfish);
                result = Math.max(result, mag);
            }
        }
    }

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

function go(input: string, expected?: number | string): void {
    const result: number = doPart(input);
    console.log(`--> ${result} <--`);
    console.assert(!expected || result === expected, 'got: %s, expected: %s', result, expected);
}

void (() => {
    go(TEST10, 3993);
    go(INPUT);
})();
