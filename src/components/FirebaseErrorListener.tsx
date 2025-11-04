'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This component is responsible for catching Firestore permission errors
// and throwing them as uncaught exceptions to be displayed by Next.js's
// development error overlay. This is only active in development.
function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: any) => {
      // Throw the error so Next.js can handle it
      throw error;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null; // This component does not render anything
}

// Only include this component in development
const isDevelopment = process.env.NODE_ENV === 'development';
export default isDevelopment ? FirebaseErrorListener : () => null;
