import { Router } from 'express';
import { check } from 'express-validator/check';

import { TagController } from './controllers/tag';
import { UserController } from './controllers/user';

/**
 * Contains all API routes for the application.
 */
const router = Router();
const userController = new UserController();
const tagController = new TagController();

router.route('/').get((req, res) => {
  res.json({
    status: 'OK',
  });
});

router.route('/users/login').post(
  [
    check('email')
      .isEmail()
      .withMessage('The email address is not a valid email.'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('The password must be at least 5 chars long.'),
  ],
  userController.login
);
router.route('/users/me').post(userController.me);
router.route('/users').get(userController.loadAll);
router.route('/users/count').get(userController.count);
router.route('/users/:userId').get(userController.loadById);
router.route('/users/:userId').patch(userController.update);
router.route('/users/register').post(userController.register);
router.route('/users/:userId').delete(userController.destroy);

router.route('/tags').get(tagController.loadAll);
router.route('/tags').post(tagController.create);
router.route('/tags/count').get(tagController.count);
router.route('/tags/:tagId').get(tagController.loadById);
router.route('/tags/:tagId').patch(tagController.update);
router.route('/tags/:tagId').delete(tagController.destroy);

export default router;
