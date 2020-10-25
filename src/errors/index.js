class HttpError extends Error {
  constructor(status,message) {
    super(message);
    this.status = status;
  }
}

const badRequest = new HttpError(400,'Invalid parameters supplied');
const unauthorized = new HttpError(401,'unauthorized');
const forbidden = new HttpError(403,'Forbidden');
const notFound = new HttpError(404,'Not found');
const internalServer = new HttpError(500,'internal Server Error');

module.exports = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internalServer
}
