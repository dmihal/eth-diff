declare module 'react-gh-like-diff' {
  import React from 'react';

  interface DiffProps {
    options: any;
    past: string;
    current: string;
  }

  export const ReactGhLikeDiff: React.ComponentType<DiffProps>;
}