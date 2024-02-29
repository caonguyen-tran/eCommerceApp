import {View} from 'react-native'
import { Entypo } from '@expo/vector-icons'

const Rating = ({number}) => {
    let arr = []
    for(i=0; i<5; i++){
        if(i+1 <= number){
            arr.push({"id": i, "type":"star"})
        }
        else{
            arr.push({"id": i, "type":"star-outlined"})
        }
    }
    return (
        <View style={{flexDirection: "row"}}>
            {
                arr.map((item) => (
                    <Entypo key={item.id} name={item.type} size={22} color="orange" />
                ))
            }
        </View>
    )
}

export default Rating