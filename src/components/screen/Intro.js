// @flow
import React, { Component } from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  InteractionManager
} from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { inject } from 'mobx-react/native'
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation'

import RNEliceEditor from 'react-native-elice-editor'
import { ratio, colors } from '../../utils/Styles'
import { IC_MASK } from '../../utils/Icons'
import User from '../../models/User'
import { getString } from '../../../STRINGS'
import Button from '../shared/Button'
import { TextInput } from 'react-native-gesture-handler'

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleTxt: {
    marginTop: 100,
    color: colors.dusk,
    fontSize: 24
  },
  txtLogin: {
    fontSize: 14,
    color: 'white'
  },
  imgBtn: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16
  },
  viewUser: {
    marginTop: 60,
    alignItems: 'center'
  },
  txtUser: {
    fontSize: 16,
    color: colors.dusk,
    lineHeight: 48
  },
  btnBottomWrapper: {
    marginTop: 100
  },
  btnLogin: {
    backgroundColor: colors.dodgerBlue,
    alignSelf: 'center',
    borderRadius: 4,
    width: 320,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnNavigate: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 4,
    width: 320,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center'
  },
  eliceEditor: {
    width: 100,
    height: 100
  }
})

type Props = {
  store: any,
  navigation: NavigationScreenProp<NavigationStateRoute>,
}
type State = {
  isLoggingIn: boolean,
}

@inject('store')
@observer
class Page extends Component<Props, State> {
  timer: any

  state = {
    isLoggingIn: false
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titleTxt}>eliceEditorSample</Text>

          <View style={{ flexDirection: 'row' }}>
            <RNEliceEditor
              style={[styles.eliceEditor, { backgroundColor: 'blue' }]}
            />
            <TextInput
              style={[styles.eliceEditor, { backgroundColor: 'green' }]}
            />
          </View>
          <View style={styles.btnBottomWrapper}>
            <Button
              isLoading={this.state.isLoggingIn}
              onPress={this.onLogin}
              style={styles.btnLogin}
              textStyle={styles.txtLogin}
              imgLeftSrc={IC_MASK}
              imgLeftStyle={styles.imgBtn}
            >
              {getString('LOGIN')}
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }

  onLogin = () => {
    this.props.store.user = new User()
    this.setState({ isLoggingIn: true }, () => {
      this.timer = setTimeout(() => {
        this.props.store.user.displayName = 'dooboolab'
        this.props.store.user.age = 30
        this.props.store.user.job = 'developer'
        this.setState({ isLoggingIn: false })
      }, 1000)
    })
  }
}

export default Page
