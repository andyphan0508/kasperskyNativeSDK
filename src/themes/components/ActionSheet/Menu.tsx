import React from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, useWindowDimensions} from 'react-native'
import {View, TouchableOpacity} from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet'
import Text from '~/themes/components/Text'

/** 
    SheetManager.show('menu', {
      payload: [{
        title: t(i.key),
        leftIcon: <Icon type={i.icon.type} name={i.icon.name} />,
        onPress: handlePrivacyChange(i.key),
      }],
    })
 */

function Menu(props: SheetProps) {
  const {t} = useTranslation()
  const {height} = useWindowDimensions()
  const actionSheetRef = React.useRef<ActionSheetRef>(null)

  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      useBottomSafeAreaPadding>
      <View
        style={{
          width: 80,
          height: 6,
          borderRadius: 3,
          backgroundColor: '#ddd',
          alignSelf: 'center',
          marginVertical: 8,
        }}
      />
      <ScrollView style={{maxHeight: height * 0.7}}>
        {props.payload?.map((i, idx) => (
          <TouchableOpacity
            key={i.title}
            onPress={async () => {
              i?.onPress(i)
              await actionSheetRef.current?.hide()
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: props.payload.length - idx === 1 ? 0 : 0.5,
              borderColor: 'rgba(0,0,0,0.1)',
              paddingHorizontal: 16,
            }}>
            {i.leftIcon}
            <Text variant="title" style={{marginLeft: i.leftIcon ? 8 : 0}}>
              {t(i.title)}
            </Text>
            {i.desc?.length && <Text variant="caption">{i.desc}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ActionSheet>
  )
}

export default Menu
