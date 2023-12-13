import { Arrays } from "common/arrays"
import { Strings } from "common/strings"
import { Solution } from "common/solution"

interface PartNumberLocation {
    value: number
    row: number
    startColumn: number
    endColumn: number
}

interface GearLocation {
    rowNumber: number
    columnNumber: number
}

export class DayThree implements Solution {
    partA(input: string): number {
        const grid = input.split("\n")

        const [minRow, maxRow] = [0, grid.length]
        const [minCol, maxCol] = [0, grid[0].length]

        const partNumbers = []
        for (const location of this.buildPartNumberLocations(grid)) {
            const symbolCandidateLocations = this.symbolCandidateLocations(location)
            for (const [row, column] of symbolCandidateLocations) {
                if (row < minRow || row >= maxRow || column < minCol || column >= maxCol) {
                    continue
                }

                const gridValue = grid[row].charAt(column)
                if (!Strings.isDigit(gridValue) && gridValue != ".") {
                    partNumbers.push(location.value)
                    break
                }
            }
        }

        return Arrays.sum(partNumbers)
    }

    partB(input: string): number {
        const grid = input.split("\n")

        const partNumberLocations = this.buildPartNumberLocations(grid)

        const gearRatios = []
        for (const gearLocation of this.buildGearLocations(grid)) {
            const adjacentParts = []
            for (const partNumberLocation of partNumberLocations) {
                if (this.isAdjacent(gearLocation, partNumberLocation)) {
                    adjacentParts.push(partNumberLocation)
                }
            }

            if (adjacentParts.length == 2) {
                gearRatios.push(adjacentParts[0].value * adjacentParts[1].value)
            }
        }

        return Arrays.sum(gearRatios)
    }

    buildPartNumberLocations(grid: string[]): PartNumberLocation[] {
        const partNumberLocations = []

        for (const [rowNumber, row] of grid.entries()) {
            let currentNumber: string[] = []
            let endColumn = 0

            for (let columnNumber = 0; columnNumber < row.length; columnNumber++) {
                const char = row.charAt(columnNumber)
                if (Strings.isDigit(char)) {
                    currentNumber.push(char)
                    endColumn = columnNumber
                }

                if (!Strings.isDigit(char) || columnNumber === row.length - 1) {
                    if (currentNumber.length > 0) {
                        const number = parseInt(currentNumber.join(""), 10)
                        const startColumn = endColumn - currentNumber.length + 1
                        partNumberLocations.push({
                            value: number,
                            row: rowNumber,
                            startColumn,
                            endColumn,
                        })
                        currentNumber = []
                        endColumn = 0
                    }
                }
            }
        }

        return partNumberLocations
    }

    buildGearLocations(grid: string[]): GearLocation[] {
        const gearLocations = []

        for (const [rowNumber, row] of grid.entries()) {
            for (let columnNumber = 0; columnNumber < row.length; columnNumber++) {
                if (row.charAt(columnNumber) === "*") {
                    gearLocations.push({ rowNumber, columnNumber })
                }
            }
        }

        return gearLocations
    }

    isAdjacent(gearLocation: GearLocation, partNumberLocation: PartNumberLocation): boolean {
        const candidateLocations = this.symbolCandidateLocations(partNumberLocation)
        const gearCoordinates = [gearLocation.rowNumber, gearLocation.columnNumber]

        return candidateLocations.some((location) => Arrays.equalValues(location, gearCoordinates))
    }

    symbolCandidateLocations(location: PartNumberLocation): [number, number][] {
        const rowCandiates = [location["row"] - 1, location["row"], location["row"] + 1]

        const columnCandidates = []
        for (let i = location["startColumn"] - 1; i <= location["endColumn"] + 1; i++) {
            columnCandidates.push(i)
        }

        const candidateLocations: [number, number][] = []
        for (const row of rowCandiates) {
            for (const col of columnCandidates) {
                candidateLocations.push([row, col])
            }
        }

        return candidateLocations
    }
}
