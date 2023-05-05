import { StyleSheet, View, Pressable } from 'react-native';
import Color from '../styles/colorStyle';


export default function CheckedBox({checked, onPress}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, checked ? styles.CheckedBox : {} ]}>
        {checked ? <View style={styles.innerSquare} />: null}
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.blue,
    borderRadius: 3,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    //marginRight: 10
  },
  innerSquare:{
    width: 10,
    height: 10,
    backgroundColor: Color.blue
  },
  checkedBox: {
    borderWidth: 2
  }
})