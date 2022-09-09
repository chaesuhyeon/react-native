import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={{flex:1 , flexDirection:"row"}}>
      {/* flex는 비율 -> 기준이 되는 부모비율을 꼭 적어줘야함 */}
      {/* flexDirection은 기본적으로 column이기 때문에 방향을 바꾸고 싶으면 row라고 적어주면 됨 */}
      
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      {/* flex :1 -> 부모 View의 1의 비율 */}
      <View style={{flex:3, backgroundColor :"teal"}}></View>
      {/* flex :3 -> 부모 View의 3의 비율 */}
      <View style={{flex:1, backgroundColor:"orange"}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    fontSize : 28,
    color:"black"
  }
});
