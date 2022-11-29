import {StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    paddingTop: hp('6'),
  },
  loadMoreContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#FF3A44',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreBtnTxt: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  itemSeparateContainer: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  itemContainer: {
    width: wp(90),
    height: hp(20),
    borderRadius: 20,
    paddingBottom: 10,
  },
  itemImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  itemImgContainer: {
    borderRadius: 20,
  },
  titleContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'space-around',
  },
  itemTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  itemDesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  itemDesTxt: {
    color: 'white',
    width: '40%',
    fontSize: 11,
  },
  subContainer: {
    width: '100%',
    height: hp('10'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    width: '75%',
    borderWidth: 1,
    borderColor: '#CEC8C8',
    height: 45,
    justifyContent: 'space-around',
    borderRadius: 20,
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchSubContainer: {
    width: '50%',
  },
  searchTxt: {
    color: '#CEC8C8',
    fontSize: 15,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginLeft: '5%',
  },
  profileContainer: {
    width: '15%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 45,
    height: 45,
  },
  headlineContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headlineSubContainer: {
    width: '85%',
  },
  headlineView: {
    width: '100%',
    height: hp('5'),
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineTxt: {
    width: '70%',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },
  seeAllView: {
    width: '30%',
    height: hp('10'),
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllTxt: {
    color: '#252385',
  },
  nextIcon: {
    width: 30,
    height: 30,
  },
  scrollViewContainer: {
    marginBottom: '1%',
  },
  catContainer: {
    width: wp(75),
    height: hp(30),
    borderRadius: 20,
    marginRight: 20,
  },
  headlineDataImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameView: {
    width: '80%',
  },
  nameTxt: {
    color: 'white',
    fontSize: 11,
  },
  titleTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  desTxt: {
    color: 'white',
    marginTop: 10,
    fontSize: 11,
    paddingBottom: 11,
  },
  catViewContainer: {
    marginBottom: '1%',
    paddingTop: 20,
  },
  catBtn: {
    width: 100,
    height: 40,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  flatListStyle: {
    width: '100%',
    marginTop: '1%',
  },
  topicTxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatListContainer: {
    alignItems: 'center',
    paddingBottom: hp(25),
  },
  searchMainContainer: {
    width: '100%',
    height: hp('10'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarView: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#CEC8C8',
    height: 45,
    justifyContent: 'space-around',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTxtInput: {
    color: 'black',
    fontSize: 15,
  },
  modelCloseView: {
    width: '100%',
    justifyContent: 'center',
  },
  filterView: {
    width: wp(25),
    height: hp(6),
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '5%',
    backgroundColor: '#FF3A44',
  },
  filterTxt: {
    width: '50%',
    color: 'white',
  },
  modelView: {
    justifyContent: 'flex-end',
    margin: 0,
    alignItems: 'center',
  },
  modalMainContainer: {
    width: wp('100%'),
    height: hp(30),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  subTopicTxt: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  sortByView: {
    width: '80%',
    marginTop: 10,
  },
  sortTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  catSelectView: {
    flexDirection: 'row',
    marginTop: 10,
  },

});
