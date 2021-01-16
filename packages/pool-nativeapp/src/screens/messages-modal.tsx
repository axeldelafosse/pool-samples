import React, { useRef, useEffect } from 'react';
import { View, Keyboard, BackHandler, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

import BottomSheet from 'reanimated-bottom-sheet';
import { useFocusEffect } from '@react-navigation/core';

import Messages from '@pool/app/src/components/messages/messages';
import { send, Event } from '@pool/app/src/modules/gg';

import { BottomSheetHeader, Panel } from '../components/bottom-sheet';

import { Abs } from '@pool/app/src/components/styles';

function MessagesModal({ route, navigation }) {
  const ref = useRef();
  const insets = useSafeAreaInsets();
  const height = useWindowDimensions().height;
  const { type, pollId, linkId } = route.params;

  useEffect(() => {
    send(Event.Haptics);
  }, []);

  // Handle back button on Android
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation) {
          navigation.goBack(null);
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const renderHeader = () => (
    <View>
      <BottomSheetHeader transparent={true} showHandle={type === 'comment'} />
    </View>
  );

  const renderMessagesList = () => (
    <Panel>
      <Messages
        poll={{}}
        pollId={pollId}
        linkId={linkId}
        type={type}
        onRequestClose={() => {
          navigation.goBack();
        }}
        userAgent={`PoolApp`}
      />
    </Panel>
  );

  return (
    <>
      <View
        style={{
          flex: 1
        }}
      >
        <Abs
          left="6px"
          top={insets.top + 5}
          height={40}
          width={40}
          style={{ flex: 1 }}
          onTouchEnd={() => {
            send(Event.TripleHaptics);
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        ></Abs>
        <Abs
          right={2}
          top={insets.top + 5}
          height={40}
          width={40}
          style={{ flex: 1 }}
          onTouchEnd={() => {
            send(Event.TripleHaptics);
            navigation.goBack();
          }}
        ></Abs>
      </View>
      <GestureHandlerRootView
        style={{
          flex: 1
        }}
      >
        <BottomSheet
          ref={ref}
          snapPoints={[height - 46 - insets.top, 0]}
          renderHeader={renderHeader}
          renderContent={renderMessagesList}
          onCloseStart={() => {
            Keyboard.dismiss();
          }}
          onCloseEnd={() => {
            send(Event.TripleHaptics);
            navigation.goBack();
          }}
          enabledHeaderGestureInteraction={true}
          enabledContentGestureInteraction={false}
          enabledBottomInitialAnimation={true}
        />
      </GestureHandlerRootView>
    </>
  );
}

export default MessagesModal;
