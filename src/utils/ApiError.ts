export class ApiError extends Error {

    statusCode: number;
    details?: any;

    constructor(statusCode: number, message: string, details?: any) {
        
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        // maintain prototype chain properly
        Object.setPrototypeOf(this, new.target.prototype);

        // capture stack trace
        Error.captureStackTrace(this);
    }

}

export class FieldConflictError extends ApiError {

    fields: string[];

    constructor(fields: string[]) {
        
        super(409, 'Some fields are already taken.');
        this.fields = fields;

        // Maintain proper prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }

}