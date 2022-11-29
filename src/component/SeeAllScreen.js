import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {
  getTopHedlines,
  changePageCount,
  setNewsItem,
  getEverything,
} from '../actions/HomePageActions';
import Style from '../styles/HomeScreenStyles';

const SearchScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderFooter = () => {
    return (
      <View style={Style.loadMoreContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            props.getTopHedlines(props.pageCount);
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
          }}
          style={Style.loadMoreBtn}>
          <Text style={Style.loadMoreBtnTxt}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // --------------------------------convert to Date --------------------------------
  const setDate = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };
  const itemSeparatorView = () => {
    return <View style={Style.itemSeparateContainer} />;
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        props.setNewsItem(item);
        navigation.navigate('Details');
      }}
      style={Style.itemContainer}>
      <ImageBackground
        source={{
          uri:
            item.urlToImage !== null
              ? item.urlToImage
              : 'http://blavatnikfoundation.org/wp-content/uploads/2020/06/covid-news-img.jpg',
        }}
        resizeMode="stretch"
        imageStyle={Style.itemImgContainer}
        style={Style.itemImg}>
        <View style={Style.titleContainer}>
          <Text style={Style.itemTxt}>{item.title}</Text>
          <View style={Style.itemDesContainer}>
            <Text numberOfLines={2} style={Style.itemDesTxt}>
              {item.description !== null ? item.author : undefined}
            </Text>
            <Text style={Style.itemDesTxt}>
              {item.publishedAt !== null
                ? setDate(item.publishedAt)
                : undefined}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  return (
    <View style={Style.mainContainer}>
      <View style={Style.subContainer}>
        <Text style={Style.topicTxt}>Headlines</Text>
      </View>
      <FlatList
        ref={flatListRef}
        style={Style.flatListStyle}
        contentContainerStyle={Style.flatListContainer}
        data={props.headlinesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={itemSeparatorView}
        enableEmptySections={true}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loadingIndicate: state.loading.loadingIndicate,
    headlinesData: state.loading.headlinesData,
    categories: state.loading.categories,
    news: state.loading.news,
    pageCount: state.loading.pageCount,
  };
};

export default connect(mapStateToProps, {
  getTopHedlines,
  changePageCount,
  setNewsItem,
  getEverything,
})(SearchScreen);
