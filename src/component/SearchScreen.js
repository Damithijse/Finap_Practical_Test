import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {
  getTopHedlines,
  changePageCount,
  getSearchData,
  getEverything,
  setNewsItem,
} from '../actions/HomePageActions';
import Style from '../styles/HomeScreenStyles';
import search from '../assets/icons8-search-96.png';
import filter from '../assets/icons8-filter-96.png';
import close from '../assets/icons8-macos-close-96.png';

const SearchScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [selected, setSelected] = useState('');
  const [selectedCat, setSelectedCat] = useState('apple');
  const [searchTxt, setSearchTxt] = useState('');
  const [filterModal, setfilterModal] = useState(false);

  // --------------------- Back Handlaing-----------------------
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
            props.getEverything(selectedCat, props.pageCount);
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

  // --------------------------------convert to Date --------------------------------
  const setDate = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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
      <View style={Style.searchMainContainer}>
        <View style={Style.searchBarView}>
          <View style={Style.searchSubContainer}>
            <TextInput
              placeholder={'Search ...'}
              placeholderTextColor="#CEC8C8"
              fontSize={13}
              allowFontScaling={false}
              onChangeText={text => {
                setSearchTxt(text);
              }}
              onEndEditing={() => {
                props.getSearchData(searchTxt, props.pageCount);
              }}
              style={Style.searchTxtInput}
            />
          </View>

          <Image source={search} style={Style.searchIcon} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setfilterModal(true);
        }}
        style={Style.modelCloseView}>
        <View style={Style.filterView}>
          <Image source={filter} style={Style.searchIcon} />
          <Text style={Style.filterTxt}>Filter</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        style={Style.flatListStyle}
        contentContainerStyle={Style.flatListContainer}
        data={props.searchData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={itemSeparatorView}
        enableEmptySections={true}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0}
      />
      <Modal
        isVisible={filterModal}
        backdropColor="black"
        style={Style.modelView}
        animationInTiming={1500}
        animationOutTiming={1200}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View style={Style.modalMainContainer}>
          <View style={Style.modalSubView}>
            <Text style={Style.subTopicTxt}>Filter</Text>
            <TouchableOpacity
              onPress={() => {
                setfilterModal(false);
              }}>
              <Image source={close} style={Style.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={Style.sortByView}>
            <Text style={Style.sortTxt}>Sort By</Text>
            <View style={Style.catSelectView}>
              {props.categories.slice(0, 3).map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.changePageCount();
                      setSelected(item.title);
                      props.getSearchData(item.key, props.pageCount);
                      setTimeout(() => {
                        setfilterModal(false);
                      }, 1000);
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
            </View>
            <View style={Style.catSelectView}>
              {props.categories.slice(3, 5).map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.changePageCount();
                      setSelected(item.title);
                      props.getSearchData(item.key, props.pageCount);
                      setTimeout(() => {
                        setfilterModal(false);
                      }, 1000);
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
            </View>
          </View>
        </View>
      </Modal>
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
    searchData: state.loading.searchData,
  };
};

export default connect(mapStateToProps, {
  getTopHedlines,
  changePageCount,
  setNewsItem,
  getSearchData,
  getEverything,
})(SearchScreen);
