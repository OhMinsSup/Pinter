import * as hello from 'hellojs';

hello.init(
  {
    facebook: '907895206056337',
    google:
      '971840625730-mduvognobp4deu6qqa577jf1kpspk47o.apps.googleusercontent.com',
  },
  {
    redirect_uri: 'redirect.html',
  }
);

export default (function() {
  return {
    facebook: () => {
      return new Promise((resolve, reject) => {
        // hellojs 는 일반 Promise 가 아닌 Promise A+ 를 사용하므로, Promise 로 감싸줌
        hello
          .login('facebook', { scope: 'email' })
          .then(
            (auth: any) => resolve(auth.authResponse.access_token),
            e => reject(e)
          );
      });
    },
    google: () => {
      return new Promise((resolve, reject) => {
        hello
          .login('google', { scope: 'email' })
          .then(
            (auth: any) => resolve(auth.authResponse.access_token),
            e => reject(e)
          );
      });
    },
  };
})();
