"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDataError = exports.StringToNumberError = void 0;
class StringToNumberError extends Error {
    constructor(place_error) {
        super(`Cant turn string into number in ${place_error}`);
    }
}
exports.StringToNumberError = StringToNumberError;
class CreateDataError extends Error {
    constructor(place_error) {
        super(`Cant create the data structure in ${place_error}`);
    }
    ;
}
exports.CreateDataError = CreateDataError;
//# sourceMappingURL=validationErros.js.map