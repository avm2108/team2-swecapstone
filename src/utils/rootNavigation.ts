import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  try {
    console.log('check here in rootnavigation', name, params);
    return navigationRef.current?.navigate(name, params);
  } catch (error) {
    console.log('navigation error', error);
  }
}
