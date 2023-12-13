import * as fs from "fs"
import { parseArgs } from "node:util"

import * as t from "io-ts"
import { failure } from "io-ts/PathReporter"
import { isLeft } from "fp-ts/Either"

import { Solution } from "common/solution"
import { DayOne } from "days/1/solution"
import { DayTwo } from "days/2/solution"
import { DayThree } from "days/3/solution"
import { DayFour } from "days/4/solution"

const Day = t.keyof({ "1": null, "2": null, "3": null, "4": null })
type Day = t.TypeOf<typeof Day>

function main(): void {
    const selectedDay = parseSelectedDay()
    const input = readProblemInput(selectedDay)
    const solution = buildSolution(selectedDay)

    console.log(`The solution to day ${selectedDay} part A is ${solution.partA(input)}`)
    console.log(`The solution to day ${selectedDay} part B is ${solution.partB(input)}`)
}

function parseSelectedDay(): Day {
    const args = parseArgs({
        options: {
            day: { type: "string", short: "d" },
        },
    })
    const selectedDay = Day.decode(args["values"]["day"])

    if (isLeft(selectedDay)) {
        throw new Error(`Error parsing selected day: ${failure(selectedDay.left)}`)
    }

    return selectedDay.right
}

function readProblemInput(selectedDay: Day): string {
    return fs.readFileSync(`./src/days/${selectedDay}/input.txt`, "utf8")
}

function buildSolution(selectedDay: Day): Solution {
    switch (selectedDay) {
        case "1":
            return new DayOne()
        case "2":
            return new DayTwo()
        case "3":
            return new DayThree()
        case "4":
            return new DayFour()
        default:
            assertUnreachable(selectedDay, `Day not yet implemented: `)
    }
}

function assertUnreachable(value: never, errorMessage: string): never {
    throw new Error(errorMessage + value)
}

main()
