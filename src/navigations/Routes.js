import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
const Stack = createStackNavigator()

import SplashView from '../Screens/Splash/splashView'
import Home from '../Screens/Home/Home'
import AddMovie from '../Screens/AddMovie/AddMovie'

export default Routes = () => {
    return (
        <Stack.Navigator initialRouteName="SplashView">
            <Stack.Screen
                name="SplashView"
                component={SplashView}
                options={{
                    header: () => {},
                    headerStyle: {
                        height: 0,
                    },
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => {},
                    headerStyle: {
                        height: 0,
                    },
                }}
            />

            <Stack.Screen
                name="AddMovie"
                component={AddMovie}
                options={{
                    header: () => {},
                    headerStyle: {
                        height: 0,
                    },
                }}
            />
    
        </Stack.Navigator>
    )
}
