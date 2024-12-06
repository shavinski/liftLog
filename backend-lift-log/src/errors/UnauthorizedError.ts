import { CustomError } from "./CustomError";
import { CustomErrorContent } from "./CustomError";

export class UnauthorizedError extends CustomError {
    private static readonly _statusCode = 401;
    private readonly _code: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };
    private readonly _messages: string[];

    constructor(params?: { code?: number, messages?: string[], logging?: boolean, context?: { [key: string]: any } }) {
        const { code, messages, logging } = params || {};

        super("Unauthorized");
        this._code = code || UnauthorizedError._statusCode;
        this._logging = logging || false;
        this._context = params?.context || {};
        this._messages = messages || [];

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
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
