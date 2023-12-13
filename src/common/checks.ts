export class InvalidArgument extends Error {
    constructor(message: string) {
        super(`Invalid Argument: ${message}`)
    }
}

export function checkArgument(expression: boolean, message: string): void {
    if (expression) {
        return
    }

    throw new InvalidArgument(message)
}
