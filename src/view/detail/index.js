import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {view} from 'react-easy-state';
import {WebView} from 'react-native-webview';
import {sys_colors} from '../../utils/constants';
import {GlobalHeader, BackButton, Loadings} from '../../components';
import * as store from './store';

const {width, height} = Dimensions.get('window');
export default view(({navigation, route}) => {
  useEffect(() => {
    store.initialized({item: route.params});
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);

  return (
    <View style={{flex: 1}}>
      <GlobalHeader
        title={store.state.title}
        type="primary"
        left={<BackButton />}
      />
      <View style={styles.page}>
        <Loadings />
        <WebView
          style={{
            width: width,
            height: height,
            backgroundColor: 'transparent',
          }}
          androidHardwareAccelerationDisabled={true}
          source={{uri: store.state.url}}
        />
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: sys_colors.primary,
  },
  containerConten: {
    width: width * 0.2,
    borderRadius: 5,
    margin: 5,
    height: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
