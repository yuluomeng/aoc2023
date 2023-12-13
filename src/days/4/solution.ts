import { Arrays } from "common/arrays"
import { Solution } from "common/solution"

export class DayFour implements Solution {
    partA(input: string): number {
        return Arrays.sum(input.split("\n").map((card) => this.scoreCard(card)))
    }

    partB(input: string): number {
        const cards = input.split("\n").map((card) => ({ count: 1, value: card }))

        for (const [i, card] of cards.entries()) {
            const matchingNumbers = this.matchingNumbers(card.value)

            for (let j = i + 1; j <= i + matchingNumbers; j++) {
                cards[j].count += card.count
            }
        }

        return Arrays.sum(cards.map((card) => card.count))
    }

    private scoreCard(card: string): number {
        const matchingNumbers = this.matchingNumbers(card)

        return matchingNumbers === 0 ? 0 : 2 ** (matchingNumbers - 1)
    }

    private matchingNumbers(card: string): number {
        const cardNumbers = card.split(":")[1]
        const [winningNumbers, ourNumbers] = cardNumbers
            .split("|")
            .map((numbers) => this.parseRawNumbers(numbers))

        const winningNumbersSet = new Set(winningNumbers)
        return ourNumbers.filter((n) => winningNumbersSet.has(n)).length
    }

    private parseRawNumbers(numbers: string): number[] {
        return numbers
            .trim()
            .split(/\s+/)
            .map((n) => parseInt(n, 10))
    }
}
