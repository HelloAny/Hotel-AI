
import { Block ,View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import SelectCity from '../../components/SelectCity/SelectCity'
import './select_city.scss'

var cities = require('../../common/city.js')

class SelectCities extends Taro.Component {
  constructor(){
        super(...arguments);
        this.state={
           allCities:[]
        };
      }
      /**a
       * 生命周期函数--监听页面加载
       */
      componentWillMount() {
        const allCities = cities
        this.setState ({
          allCities
        })
      }

      onCitySelect(e) {
        console.log('城市选择', e)
        var pages = Taro.getCurrentPages()
        if (pages.length >= 2) {
          var prePage = pages[pages.length - 2]
          prePage.setState({
            location: e.detail.city
          })
        }
        Taro.navigateBack()
      }


  config = {
    navigationBarTitleText: '城市选择'
  }

  render() {
    return (
     <View>
      <SelectCity
        onCitySelect={this.onCitySelect}
        letterClass="cityListLetter"
        itemClass="cityListItem"
      ></SelectCity>
    </View>

    )
  }
}

export default SelectCities;
