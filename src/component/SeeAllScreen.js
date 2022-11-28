import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {getTopHedlines, changePageCount} from '../actions/HomePageActions';
import Style from '../styles/HomeScreenStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import search from '../assets/icons8-search-96.png';
import filter from '../assets/icons8-filter-96.png';
import close from '../assets/icons8-macos-close-96.png';
import {getEverything} from '../actions/HomePageActions';

const SearchScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [loading, setLoading] = useState(true);

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
  const itemSeparatorView = () => {
    return <View style={Style.itemSeparateContainer} />;
  };

  const renderItem = ({item}) => (
    <View style={Style.itemContainer}>
      <ImageBackground
        source={{
          uri:
            item.urlToImage !== null
              ? item.urlToImage
              : 'https://st4.depositphotos.com/2409585/38816/v/600/depositphotos_388160030-stock-video-world-news-background-loop-digital.jpg',
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
              {item.publishedAt !== null ? item.publishedAt : undefined}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
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
  getEverything,
})(SearchScreen);
