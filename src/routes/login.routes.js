import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import Welcome1 from "../app/welcome1";
import Welcome2 from "../app/welcome2";
import Welcome3 from "../app/welcome3";
import SignIn from "../app/signin";
import SignUp from "../app/signup";
import HomeScreen from "../app/loggedIn/home";
import BookedScreen from '../app/loggedIn/booked';
import SearchScreen from "../app/loggedIn/search";
import ProfileScreen from "../app/loggedIn/profile";
import Colours from '../../assets/colours';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyApp() {
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconSize = focused ? 30 : 20; // Aumenta o tamanho do ícone se estiver selecionado

                    // Define os ícones para cada rota
                    if (route.name === 'Início') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Agendamentos') {
                        iconName = focused ? 'calendar' : 'calendar-outline'; 
                    } else if (route.name === 'Buscar') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // bulb-outline - icone da lampada, pode ser util

                    // Retorna o ícone correspondente
                    return <Ionicons name={iconName} size={iconSize} color={color} />;
                },
                tabBarActiveTintColor: Colours.backgroundColor,
                tabBarInactiveTintColor: Colours.offWhite,
                tabBarStyle: {
                    backgroundColor: Colours.lightgreen, // Fundo da barra de navegação
                    height: 60,
                },
                headerShown: false, // Remove o cabeçalho de todas as telas no Tab.Navigator
            })}
        >
            <Tab.Screen name="Início" component={HomeScreen} />
            <Tab.Screen name="Agendamentos" component={BookedScreen} />
            <Tab.Screen name="Buscar" component={SearchScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function LoginRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Welcome1"
                component={Welcome1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Welcome2"
                component={Welcome2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Welcome3"
                component={Welcome3}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MyApp"
                component={MyApp}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
