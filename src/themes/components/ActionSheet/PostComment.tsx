import React from 'react'
import {useWindowDimensions} from 'react-native'
import ActionSheet, {SheetProps} from 'react-native-actions-sheet'
import KeyboardSpacer from '~/components/Keyboard/KeyboardSpacer'
import Comments from '~/screens/Posts/Comments/components/Comments'

function PostComment(props: SheetProps) {
  const {height} = useWindowDimensions()
  // const insets = useSafeAreaInsets()
  // const actionSheetRef = React.useRef<ActionSheetRef>(null)
  // const scrollHandlers = useScrollHandlers<ScrollView>(
  //   'PostComment',
  //   actionSheetRef,
  // )
  // const snapPoints = React.useMemo(() => [80], [100])
  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={false}
      keyboardHandlerEnabled={false}
      useBottomSafeAreaPadding={false}
      headerAlwaysVisible={true}
      safeAreaInsets={{bottom: 0, top: 0, right: 0, left: 0}}
      containerStyle={{
        minHeight: height * 0.8,
      }}>
      <Comments postId={props.payload.postId} />
      <KeyboardSpacer useAndroid={true} />
    </ActionSheet>
  )
}

export default PostComment
