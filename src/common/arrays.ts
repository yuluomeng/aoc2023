import { checkArgument } from "common/checks"

export class Arrays {
    static sum(array: number[]): number {
        checkArgument(array.length > 0, "Cannot sum a zero-length array")

        return array.reduce((a, b) => a + b)
    }

    static equalValues(array1: any[], array2: any[]): boolean {
        if (array1.length != array2.length) {
            return false
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false
            }
        }

        return true
    }
}
