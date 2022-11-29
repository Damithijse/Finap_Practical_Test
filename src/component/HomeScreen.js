import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Alert,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  getTopHedlines,
  changePageCount,
  changeComponent,
  setLoadingState,
  getEverything,
  setNewsItem,
} from '../actions/HomePageActions';

import Style from '../styles/HomeScreenStyles';

import search from '../assets/icons8-search-96.png';
import next from '../assets/icons8-right-96.png';
import profile from '../assets/profile_selected.png';

const HomeScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [selected, setSelected] = useState('');
  const [selectedCat, setSelectedCat] = useState('apple');

  useEffect(() => {
    props.getEverything(selectedCat, props.pageCount);
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // --------------------------------flatList load more --------------------------------
  const renderFooter = () => {
    return (
      <View style={Style.loadMoreContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            props.setLoadingState(true);
            props.getEverything(selectedCat, props.pageCount);
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
          }}
          style={Style.loadMoreBtn}>
          <Text style={Style.loadMoreBtnTxt}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // --------------------------------item separator --------------------------------
  const itemSeparatorView = () => {
    return <View style={Style.itemSeparateContainer} />;
  };

  // --------------------------------convert to Date --------------------------------
  const setDate = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };
  // --------------------------------flatList render items --------------------------------
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
      {/*-------------------------------------- Searching Bar------------------------------*/}
      <View style={Style.subContainer}>
        <TouchableOpacity
          onPress={() => {
            props.changePageCount();
            navigation.navigate('Search');
          }}
          style={Style.searchContainer}>
          <View style={Style.searchSubContainer}>
            <Text style={Style.searchTxt}>Search...</Text>
          </View>

          <Image source={search} style={Style.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeComponent('PROFILE');
          }}
          style={Style.profileContainer}>
          <Image source={profile} style={Style.profileIcon} />
        </TouchableOpacity>
      </View>
      {/*-------------------------------------- Headlines------------------------------*/}
      <View style={Style.headlineContainer}>
        <View style={Style.headlineSubContainer}>
          <View style={Style.headlineView}>
            <Text style={Style.headlineTxt}>Headlines</Text>
            <TouchableOpacity
              onPress={() => {
                props.changePageCount();
                navigation.navigate('SeeAll');
              }}
              style={Style.seeAllView}>
              <Text style={Style.seeAllTxt}>See All</Text>
              <Image source={next} style={Style.nextIcon} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={Style.scrollViewContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {props.headlinesData !== undefined
              ? props.headlinesData.slice(0, 5).map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.setNewsItem(item);
                        navigation.navigate('Details');
                      }}
                      style={Style.catContainer}>
                      <ImageBackground
                        source={{
                          uri: item.urlToImage,
                        }}
                        resizeMode="stretch"
                        imageStyle={{borderRadius: 20}}
                        style={Style.headlineDataImg}>
                        <View style={Style.nameView}>
                          <Text style={Style.nameTxt}>
                            by {item.source.name}
                          </Text>
                          <Text style={Style.titleTxt}>{item.title}</Text>
                          <Text numberOfLines={2} style={Style.desTxt}>
                            "{item.description}"
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })
              : undefined}
          </ScrollView>

          {/*-------------------------------------- Filter by Categories------------------------------*/}

          <ScrollView
            style={Style.catViewContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {props.categories.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.changePageCount();
                    setSelected(item.title);
                    props.getEverything(props.pageCount, item.key);
                  }}
                  style={[
                    Style.catBtn,
                    {
                      backgroundColor:
                        selected === item.title ? '#FF3A44' : 'white',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: selected === item.title ? 'white' : 'black',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
      {/*-------------------------------------- Top News Section------------------------------*/}
      <FlatList
        ref={flatListRef}
        style={Style.flatListStyle}
        contentContainerStyle={Style.flatListContainer}
        data={props.news}
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
  setLoadingState,
  changeComponent,
  setNewsItem,
  changePageCount,
  getEverything,
})(HomeScreen);
