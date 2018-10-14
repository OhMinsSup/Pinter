import * as FB from 'fb';
import * as Google from 'googleapis';

const plus = Google.google.plus('v1');

export interface IProfile {
  id: number | string;
  thumbnail: string;
  email: string;
  username: string;
}

function getFacebookProfile(accessToken: string): Promise<IProfile> {
  return FB.api('me', {
    fields: ['name', 'email', 'picture'],
    access_token: accessToken,
  }).then(auth => ({
    id: auth.id,
    username: auth.name,
    email: auth.email || null,
    thumbnail: auth.picture.data.url,
  }));
}

function getGoogleProfile(accessToken: string): Promise<IProfile> {
  return new Promise((resolve, reject) => {
    plus.people.get(
      {
        userId: 'me',
        access_token: accessToken,
      },
      (err, auth) => {
        if (err) reject(err);
        const {
          data: { id, image, emails, displayName },
        } = auth;

        const profile: any = {
          id,
          thumbnail: image.url,
          email: emails[0].value,
          username: displayName && displayName.split(' (')[0],
        };
        resolve(profile);
      }
    );
  });
}

export default function getSocialProfile(
  provider: string,
  accessToken: string
) {
  const getter = {
    facebook: getFacebookProfile,
    google: getGoogleProfile,
  };

  return getter[provider](accessToken);
}
