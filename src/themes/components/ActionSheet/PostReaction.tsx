import React from 'react';
import {useWindowDimensions} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Reactions from '~/screens/Posts/Reactions';

function PostReactions(props: SheetProps) {
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={false}
      keyboardHandlerEnabled={false}
      useBottomSafeAreaPadding={false}
      headerAlwaysVisible={true}
      containerStyle={{
        paddingBottom: insets.bottom,
        minHeight: height * 0.8,
      }}>
      <Reactions postId={props.payload.postId} />
    </ActionSheet>
  );
}

export default PostReactions;
