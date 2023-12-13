import { checkArgument } from "common/checks"

export class Strings {
    static isDigit(char: string): boolean {
        checkArgument(
            char.length === 1,
            `isDigit requires a one-character strings but received ${char} of length ${char.length}.`
        )

        return !isNaN(parseInt(char, 10))
    }
}
