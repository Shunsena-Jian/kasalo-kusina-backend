import { type Request, type Response } from 'express';

import TagService from '../services/tagService.js';

export async function listTags(req: Request, res: Response) {
    return res.success(await TagService.listTags());
}