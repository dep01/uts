import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {view} from 'react-easy-state';
import {sys_colors} from '../../utils/constants';
import {GlobalHeader, BackButton} from '../../components';
import * as store from './store';

const {width} = Dimensions.get('window');
export default view(({navigation}) => {
  useEffect(() => {
    store.initialized();
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={item.index}
        onPress={() => navigation.navigate('/detail', {title: item.item.name})}
        style={[
          styles.containerConten,
          {
            backgroundColor: sys_colors.secondary,
          },
        ]}>
        <Image
          style={{height: '80%'}}
          resizeMode="contain"
          source={item.item.icon}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            marginTop: 5,
          }}>
          {item.item.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <GlobalHeader
        title="Binatang"
        type="secondary"
        // right={
        //   <BackButton
        //     iconName="east"
        //     style={{alignItems: 'center'}}
        //     onPress={() => store.NavigateBlank({navigation})}
        //   />
        // }
      />
      <View style={styles.page}>
        <FlatList
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          style={{width: '100%'}}
          data={store.state.array}
          keyExtractor={(item, index) => index.toString()}
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
    width: width * 0.45,
    borderRadius: 5,
    margin: 5,
    height: width * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
