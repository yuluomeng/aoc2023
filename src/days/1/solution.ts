import { Arrays } from "common/arrays"
import { Solution } from "common/solution"

export class DayOne implements Solution {
    partA(input: string): number {
        const inputs: number[] = input.split("\n").map((s: string) => {
            let firstNumber = null
            let lastNumber = null
            for (const char of s) {
                const maybeNumber = parseInt(char, 10)

                if (isNaN(maybeNumber)) {
                    continue
                }

                if (firstNumber === null) {
                    firstNumber = maybeNumber
                }

                lastNumber = maybeNumber
            }
            return parseInt(`${firstNumber}${lastNumber}`, 10)
        })

        return Arrays.sum(inputs)
    }

    partB(input: string): number {
        const inputs: number[] = input.split("\n").map((s: string) => {
            let firstNumber = null
            let lastNumber = null
            for (let i = 0; i < s.length; i++) {
                const maybeNumber = this.parseNumber(s, i)

                if (maybeNumber === null) {
                    continue
                }

                if (firstNumber === null) {
                    firstNumber = maybeNumber
                }

                lastNumber = maybeNumber
            }
            return parseInt(`${firstNumber}${lastNumber}`, 10)
        })

        return Arrays.sum(inputs)
    }

    private parseNumber(s: string, index: number): number | null {
        const writtenOutNumbers: Record<string, string[]> = {
            e: ["eight"],
            f: ["four", "five"],
            n: ["nine"],
            o: ["one"],
            s: ["six", "seven"],
            t: ["two", "three"],
        }

        const textToInt: Record<string, number> = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
        }

        const char = s[index]
        const maybeInt = parseInt(char, 10)
        if (!isNaN(maybeInt)) {
            return maybeInt
        }

        const maybeWrittenCandidates = writtenOutNumbers[char]
        if (maybeWrittenCandidates === undefined) {
            return null
        }

        for (const candidate of maybeWrittenCandidates) {
            if (s.substring(index, index + candidate.length) === candidate) {
                return textToInt[candidate]
            }
        }

        return null
    }
}
