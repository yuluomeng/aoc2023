import { Solution } from "common/solution"

export class DayTwo implements Solution {
    partA(input: string): number {
        const seed: Record<string, number> = { red: 12, green: 13, blue: 14 }

        let totalSum = 0
        for (const game of input.split("\n")) {
            const [id, samples] = game.split(": ")

            let isValidGame = true
            for (const sample of samples.split("; ")) {
                const draws = sample.split(", ")
                for (const draw of draws) {
                    const [count, color] = draw.split(" ")
                    if (parseInt(count, 10) > seed[color]) {
                        isValidGame = false
                    }
                }
            }

            if (isValidGame) {
                totalSum += parseInt(id.split(" ")[1], 10)
            }
        }

        return totalSum
    }

    partB(input: string): number {
        let totalSum = 0
        for (const game of input.split("\n")) {
            const minimum: Record<string, number> = {
                red: 0,
                green: 0,
                blue: 0,
            }
            const [_, samples] = game.split(": ")

            for (const sample of samples.split("; ")) {
                const draws = sample.split(", ")
                for (const draw of draws) {
                    const [rawCount, color] = draw.split(" ")
                    const count = parseInt(rawCount, 10)
                    const currentMinimum = minimum[color]

                    if (count > currentMinimum) {
                        minimum[color] = count
                    }
                }
            }

            totalSum += minimum["red"] * minimum["green"] * minimum["blue"]
        }

        return totalSum
    }
}
