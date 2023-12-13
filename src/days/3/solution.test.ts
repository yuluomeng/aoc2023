import { DayThree } from "days/3/solution"

const solution = new DayThree()

const puzzle = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

test("Sample puzzle output for part A to be 4361", () => {
    expect(solution.partA(puzzle)).toBe(4361)
})

test("Sample puzzle output for part B to be 467835", () => {
    expect(solution.partB(puzzle)).toBe(467835)
})
