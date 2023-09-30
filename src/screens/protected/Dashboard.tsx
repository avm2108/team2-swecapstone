/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {Image, View} from 'react-native';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import {BottomTabNavigation} from '../../stacks/bottomTabs';
import {Layout} from './Layout';
import {FamilyListCard} from '../../components/protected/Location/FamilyListCard';
import {EmergencyActions} from '../../components/protected/Location/EmergencyActions';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DashboardWithDrawerAndBottomTabs() {
  return (
    <BottomTabNavigation
      // @ts-ignore
      HomeScreen={DashboardWithDrawer}
    />
  );
}

function DashboardWithDrawer({navigation}: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      id="DashboardDrawer"
      drawerContent={(props: any) => {
        return (
          <SideBar id="DashboardDrawer" navigation={navigation} {...props} />
        );
      }}>
      <Drawer.Screen name="DashboardWithDrawer" component={Dashboard} />
    </Drawer.Navigator>
  );
}

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    // @ts-ignore
    <Layout navigation={navigation}>
      <ProtectedWrapper scrollView={true}>
        <View style={{position: 'relative'}}>
          <Image
            source={require('../../assets/dummyMap.png')}
            style={{width: '100%', height: '100%'}}
          />
          <View style={{position: 'absolute', bottom: 5, left: 16}}>
            <EmergencyActions />
          </View>
        </View>
      </ProtectedWrapper>
      <FamilyListCard />
    </Layout>
  );
};
