// import { CustomError } from "./CustomError";

// export class NotFoundError extends CustomError {
//     private static readonly _statusCode = 404;
//     private readonly _code: number;
//     private readonly _logging: boolean;
//     private readonly _context: { [key: string]: any };

//     constructor(params?: { code?: number, message?: string, logging?: boolean, context?: { [key: string]: any } }) {
//         const { code, message, logging } = params || {};

//         super(message || "Resource not found.");
//         this._code = code || NotFoundError._statusCode;
//         this._logging = logging || false;
//         this._context = params?.context || {};

//         // Only because we are extending a built in class
//         Object.setPrototypeOf(this, NotFoundError.prototype);
//     }

//     get errors() {
//         return [{ message: this.message, context: this._context }];
//     }

//     get statusCode() {
//         return this._code;
//     }

//     get logging() {
//         return this._logging;
//     }
// }

import { CustomError } from "./CustomError";
import { CustomErrorContent } from "./CustomError";

export class NotFoundError extends CustomError {
    private static readonly _statusCode = 404;
    private readonly _code: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };
    private readonly _messages: string[];

    constructor(params?: { code?: number, messages?: string[], logging?: boolean, context?: { [key: string]: any } }) {
        const { code, messages, logging } = params || {};

        super("Not Found");
        this._code = code || NotFoundError._statusCode;
        this._logging = logging || false;
        this._context = params?.context || {};
        this._messages = messages || [];

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors(): CustomErrorContent {
        return {
            error: this.message,
            messages: this._messages,
            context: this._context
        };
    }

    get messages() {
        return this._messages;
    }

    get statusCode() {
        return this._code;
    }

    get logging() {
        return this._logging;
    }
}