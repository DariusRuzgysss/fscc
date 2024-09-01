import React from 'react';
import '@utils/locale';
import {StatusBar} from 'react-native';
import Navigation from '@utils/Navigation';
import {AuthProvider} from '@utils/contexts/auth';

// Libraries
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
