

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