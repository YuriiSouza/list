export class StringToNumberError extends Error {
    constructor(place_error: string) {
        super(`Cant turn string into number in ${place_error}`)
    }
}

export class CreateDataError extends Error {
    constructor (place_error: string) {
        super(`Cant create the data structure in ${place_error}`)
    };
}