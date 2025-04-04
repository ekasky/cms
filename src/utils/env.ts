

export const getEnv = (key: string, required = true): string => {

    const value: string | undefined = process.env[key];

    if(required && (value === undefined || value === '')) {
        throw new Error(`Environment variable "${key}" is required.`);
    } else if(value === undefined) {
        throw new Error(`Environment variable "${key}" is undefined.`);
    } else {
        return value;
    }

};

export const getEnvAsNumber = (key: string, required = true): number => {

    // Read the variable in as a string
    const raw: string = getEnv(key, required);

    // Convert the string to a number
    const value: number = Number(raw);

    // Ensure that the converted string is actually a real number
    if(isNaN(value)) {
        throw new Error(`Environment variable "${key}" must be a number. Got "${raw}"`);
    }

    return value;

};