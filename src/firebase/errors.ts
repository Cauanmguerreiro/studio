import { getAuth } from 'firebase/auth';
import { firebaseApp } from './config';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public readonly name = 'FirestorePermissionError';
  public readonly context: SecurityRuleContext;
  public readonly serverError: any;

  constructor(context: SecurityRuleContext, serverError?: any) {
    const currentUser = getAuth(firebaseApp).currentUser;
    const authContext = currentUser
      ? {
          uid: currentUser.uid,
          token: {
            name: currentUser.displayName,
            picture: currentUser.photoURL,
            email: currentUser.email,
            email_verified: currentUser.emailVerified,
            phone_number: currentUser.phoneNumber,
            firebase: (currentUser.providerData[0] as any)?.firebase,
          },
        }
      : null;

    const deniedMessage = {
      rules: {
        auth: authContext,
        method: context.operation,
        path: `/databases/(default)/documents/${context.path}`,
        resource: {
          data: context.requestResourceData,
        },
      },
    };

    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(
      deniedMessage,
      null,
      2
    )}`;

    super(message);
    this.context = context;
    this.serverError = serverError;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FirestorePermissionError);
    }
  }
}
