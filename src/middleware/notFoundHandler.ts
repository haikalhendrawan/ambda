import { Request, Response, NextFunction } from 'express';
import ErrorDetail from '../model/error.model';
import logger from '../config/logger';


export default function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  logger.info('logger success')
  next(new ErrorDetail(404, 'Endpoint Not Found', 'Periksa kembali url yang anda input', null));
}