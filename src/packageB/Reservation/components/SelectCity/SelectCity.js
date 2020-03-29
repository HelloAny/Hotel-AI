import { Block, ScrollView, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './selectCity.scss'
import PropTypes from 'prop-types';


var cities = require('../../common/city.js')
var letterLineHeight = 0


class SelectCity extends Taro.Component {
  static defaultProps={
    allCities: {
      type: Array,
      value: cities
      // observer: citiesObserver
    }
  }
  static externalClasses=['letter-class', 'item-class'];

  constructor(){
    super(...arguments);
    this.state={
        allCities: [],
        currentIndex: 'id0',
        letterText: '',
        isLetterHidden: true,
        letterTop: 0,
        letterLeft: 0
    };
  }

  citySelectEvent(e){
    var city = e.target.dataset.city
    var letter = e.target.dataset.letter
    var detail = {
      city: city,
      letter: letter
    }
    this.triggerEvent('citySelect', detail)
  }

  citiesObserver(newVal, oldVal) {
    var detail = {
      newVal: newVal,
      oldVal: oldVal
    }
    this.triggerEvent('citiesObserver', detail)
  }

  slideStart(e) {
    //手指触摸的y坐标值
    var touchY = e.touches[0].clientY
    //布局距离屏幕顶端距离
    var offsetTop = e.currentTarget.offsetTop
    var index = parseInt((touchY - offsetTop) / letterLineHeight)
    this.setState({
      currentIndex: 'id' + index,
      isLetterHidden: false,
      letterText: this.state.allCities[index].letter
    })
  }

  slideMove(e){
    //手指触摸的y坐标值
    var touchY = e.touches[0].clientY
    //布局距离屏幕顶端距离
    var offsetTop = e.currentTarget.offsetTop
    var index = parseInt((touchY - offsetTop) / letterLineHeight)
    this.setState({
      currentIndex: 'id' + index,
      isLetterHidden: false,
     // letterText: this.state.allCities[index].letter
    })
  }

  slideEnd(e){
    var that = this
    setTimeout(function() {
      that.setState({
        isLetterHidden: true
      })
    }, 200)
  }

  config = {
    component: true
  }

  render() {
    const {
      currentIndex,
      scrollTop,
      allCities,
      isLetterHidden,
      letterTop,
      letterLeft,
      letterText
    } = this.state;

    const{
      allCities
    } = this.props;

    return (
      <Block>
        <ScrollView
          className="cityList"
          scrollY
          scrollIntoView={currentIndex}
          scrollTop={scrollTop}
        >
          {allCities.map((item, index) => {
            return (
              <View>
                <View className="letter-class" id={'id' + index}>
                  {item.letter}
                </View>
                {item.cityList.map((cityItem, index) => {
                  return (
                    <View
                      className="item-class"
                      onClick={this.citySelectEvent}
                      state-city={cityItem.name}
                      state-letter={cityItem.key}
                    >
                      {cityItem.name}
                    </View>
                  )
                })}
              </View>
            )
          })}
        </ScrollView>
        <View
          className="citySlide"
          onTouchStart={this.slideStart}
          onTouchStart={this.slideMove}
          onTouchEnd={this.slideEnd}
        >
          {allCities.map((item, index) => {
            return (
              <View className="citySlideItem" state-index={index}>
                {item.letter}
              </View>
            )
          })}
        </View>
        <Text
          className="letterText"
          hidden={isLetterHidden}
          style={'top:' + letterTop + 'px;left:' + letterLeft + 'px'}
        >
          {letterText}
        </Text>
      </Block>
    )
  }
}
SelectCity.propTypes = {
  allCities:PropTypes.object

}

export default SelectCity;
