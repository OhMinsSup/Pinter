import { Router } from 'express';
import * as authCtrl from './auth.ctrl';

const auth = Router();

auth.post('/send-auth-email', authCtrl.sendAuthEmail);
auth.post('/email-register', authCtrl.localRegister);
auth.post('/email-login', authCtrl.localLogin);
auth.get('/code/:code', authCtrl.code);

auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);

auth.post('/register/:provider(facebook|google)', authCtrl.socialRegister);
auth.post('/login/:provider(facebook|google)', authCtrl.socialLogin);
auth.post('/verify-social/:provider(facebook|google)', authCtrl.verifySocial);

export default auth;