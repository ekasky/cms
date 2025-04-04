import { Request, Response } from 'express';


export const testController = (req: Request, res: Response) => {

    res.send('Test');

};