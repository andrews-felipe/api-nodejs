import * as restify from 'restify'
import { ForbiddenError } from 'restify-errors';

export const authorize: restify.RequestHandler = (req, resp, next) => {
  if (req.authenticated !== undefined) {
    next()
  } else {
    next(new ForbiddenError('Permission Negada'))
  }
}