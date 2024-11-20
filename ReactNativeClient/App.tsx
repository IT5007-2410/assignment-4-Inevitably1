/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'IssueList',
    };
    this.setCurrentScreen = this.setCurrentScreen.bind(this);
  }

  setCurrentScreen(screen) {
    this.setState({ currentScreen: screen });
  }
  render() {
    const { currentScreen } = this.state;
    let content;

    if (currentScreen === 'IssueList') {
      content = <IssueList screen="IssueList" setCurrentScreen={this.setCurrentScreen} />;
    } else if (currentScreen === 'IssueAdd') {
      content = <IssueList screen="IssueAdd" setCurrentScreen={this.setCurrentScreen} />;
    } else if (currentScreen === 'BlackList') {
      content = <IssueList screen="BlackList" setCurrentScreen={this.setCurrentScreen} />;
    }

    return (
      <>
        <Text style={styles.headerText}>Issue Tracker</Text>
        <View style={styles.navBar}>
          <Button
            title="Issues"
            onPress={() => this.setCurrentScreen('IssueList')}
            color="#007BFF"
          />
          <Button
            title="Add Issue"
            onPress={() => this.setCurrentScreen('IssueAdd')}
            color="#28A745"
          />
          <Button
            title="Blacklist"
            onPress={() => this.setCurrentScreen('BlackList')}
            color="#DC3545"
          />
        </View>
        {content}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#343A40',
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    padding: 15,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    paddingVertical: 10,
  },
});