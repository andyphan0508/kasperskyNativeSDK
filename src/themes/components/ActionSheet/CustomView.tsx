import React from 'react';
import { useWindowDimensions } from 'react-native';
import ActionSheet, {
  SheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
// import {useSafeAreaInsets} from 'react-native-safe-area-context'

function CustomView(props: SheetProps) {
  const { height } = useWindowDimensions();
  const actionSheetRef = React.useRef<ActionSheetRef>(null);

  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      gestureEnabled={false}
      keyboardHandlerEnabled={false}
      useBottomSafeAreaPadding={false}
      headerAlwaysVisible={true}
      defaultOverlayOpacity={0.1}
      containerStyle={{
        paddingBottom: 0,
        maxHeight: height * 0.8,
      }}>
      {props.payload}
    </ActionSheet>
  );
}

export default CustomView;
