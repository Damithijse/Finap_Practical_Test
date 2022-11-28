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
import {
  getTopHedlines,
  changePageCount,
  getSearchData,
  getEverything,
} from '../actions/HomePageActions';
import Style from '../styles/HomeScreenStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import search from '../assets/icons8-search-96.png';
import filter from '../assets/icons8-filter-96.png';
import close from '../assets/icons8-macos-close-96.png';

const SearchScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [selected, setSelected] = useState('');
  const [selectedCat, setSelectedCat] = useState('apple');
  const [searchTxt, setSearchTxt] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterModal, setfilterModal] = useState(false);

  const renderFooter = () => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            props.getEverything(selectedCat, props.pageCount);
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
          }}
          style={{
            padding: 10,
            backgroundColor: '#FF3A44',
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
            Load More
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const itemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const renderItem = ({item}) => (
    <View
      style={{
        width: wp(90),
        height: hp(20),
        borderRadius: 20,
        paddingBottom: 10,
      }}>
      <ImageBackground
        source={{
          uri:
            item.urlToImage !== null
              ? item.urlToImage
              : 'https://st4.depositphotos.com/2409585/38816/v/600/depositphotos_388160030-stock-video-world-news-background-loop-digital.jpg',
        }}
        resizeMode="stretch"
        imageStyle={{borderRadius: 20}}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 3,
            }}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <Text
              numberOfLines={2}
              style={{
                color: 'white',
                width: '40%',
                fontSize: 11,
              }}>
              {item.description !== null ? item.author : undefined}
            </Text>
            <Text style={{color: 'white', fontSize: 11}}>
              {item.publishedAt !== null ? item.publishedAt : undefined}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
  return (
    <View style={Style.mainContainer}>
      <View
        style={{
          width: '100%',
          height: hp('10'),
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            borderWidth: 1,
            borderColor: '#CEC8C8',
            height: 45,
            justifyContent: 'space-around',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '50%'}}>
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
              style={{color: 'black', fontSize: 15}}
            />
          </View>

          <Image
            source={search}
            style={{width: 30, height: 30, marginLeft: '5%'}}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setfilterModal(true);
        }}
        style={{width: '100%', justifyContent: 'center'}}>
        <View
          style={{
            width: wp(25),
            height: hp(6),
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderRadius: 20,
            marginLeft: '5%',
            backgroundColor: '#FF3A44',
          }}>
          <Image
            source={filter}
            style={{width: 30, height: 30, marginLeft: '5%'}}
          />
          <Text style={{width: '50%', color: 'white'}}>Filter</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        style={{
          width: '100%',
          marginTop: '1%',
        }}
        contentContainerStyle={{alignItems: 'center', paddingBottom: hp(25)}}
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
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          alignItems: 'center',
        }}
        animationInTiming={1500}
        animationOutTiming={1200}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View
          style={{
            width: wp('100%'),
            height: hp(30),
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>Filter</Text>
            <TouchableOpacity
              onPress={() => {
                setfilterModal(false);
              }}>
              <Image source={close} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '80%',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Sort By</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
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
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor:
                        selected === item.title ? '#FF3A44' : 'white',
                      alignItems: 'center',
                      marginRight: 10,
                      borderRadius: 20,
                      justifyContent: 'center',
                    }}>
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor:
                        selected === item.title ? '#FF3A44' : 'white',
                      alignItems: 'center',
                      marginRight: 10,
                      borderRadius: 20,
                      justifyContent: 'center',
                    }}>
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
  getSearchData,
  getEverything,
})(SearchScreen);
