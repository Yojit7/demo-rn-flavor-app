 
import React from 'react';
import { Text, View,} from 'react-native';
import Config from "react-native-config";
 




function App(): React.JSX.Element {
 

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
      <Text>HEllO Worl</Text>
      <Text>{Config.Node_env}</Text>

    </View>
    
  );
};

 

export default App;
