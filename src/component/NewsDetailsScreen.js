import React, {useEffect} from 'react';
import {View, Image, Text, Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {getTopHedlines} from '../actions/HomePageActions';
import Style from '../styles/LoginScreenStyle';

const NewsDetailsScreen = props => {
  const navigation = useNavigation();
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
  return (
    <View style={Style.mainContainer}>
      <View style={Style.backGroundImg}>
        <Image
          source={{uri: props.newsItem.urlToImage}}
          style={Style.newsImg}
        />
        <View style={Style.subContainer}>
          <View style={Style.titleTxt}>
            <Text>{props.newsItem.title}</Text>
          </View>
          <View style={Style.titleTxt}>
            <Text>{props.newsItem.description}</Text>
          </View>
          <View style={Style.titleTxt}>
            <Text numberOfLines={10}>
              {props.newsItem.content.slice(0, 3000)}
            </Text>
          </View>
        </View>
        <View style={Style.mainView}>
          <Text style={Style.dateTxt}>
            {props.newsItem.publishedAt !== null
              ? props.newsItem.publishedAt
              : ''}
          </Text>
          <Text numberOfLines={3} style={Style.desTxt}>
            {props.newsItem.description}
          </Text>
          <Text style={Style.dateTxt}>
            {props.newsItem.author !== null
              ? 'Published by ' + props.newsItem.author
              : undefined}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loadingIndicate: state.loading.loadingIndicate,
    newsItem: state.loading.newsItem,
  };
};

export default connect(mapStateToProps, {
  getTopHedlines,
})(NewsDetailsScreen);
