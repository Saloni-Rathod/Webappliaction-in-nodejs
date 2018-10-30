const express = require('expres');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();
function router() {
  authRouter.route('/signin')
    .post((res, req) => {
      debug(req.body);
    });
  return authRouter;
}


module.exports = router;

