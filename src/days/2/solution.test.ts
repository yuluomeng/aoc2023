import { DayTwo } from "days/2/solution"

const firstGame = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"

const sampleGames = `${firstGame}
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const solution = new DayTwo()

test("Sample game result to be 8", () => {
    expect(solution.partA(sampleGames)).toBe(8)
})

test("Two digit sample game result to be 11", () => {
    expect(solution.partA("Game 11: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toBe(11)
})

test("First game power is 48", () => {
    expect(solution.partB(firstGame)).toBe(48)
})

test("Total game power sum is 2286", () => {
    expect(solution.partB(sampleGames)).toBe(2286)
})
