export interface ValidationFieldError {  //error Obj with 3 properties
    field: string;
    rejectedValue: unknown;
    message: string;
}

export interface ApiErrorDetails {
    validationError?: ValidationFieldError[];
    field?: string;
    parameter?: string;
    rejectedValue: unknown;
}