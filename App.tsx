import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {

    //translation, add to cart animation and pop up for are you sure and exchange rate and animation for the shoe after you swipe home screen
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <RootSiblingParent>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          </RootSiblingParent>
        </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
