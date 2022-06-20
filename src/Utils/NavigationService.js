import * as React from 'react';
import { NavigationContainerRef, DrawerActions } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer())
}

function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer())
}

export default {
  navigate,
  goBack,
  openDrawer,
  closeDrawer,
};
