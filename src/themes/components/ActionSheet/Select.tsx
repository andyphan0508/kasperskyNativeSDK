import React from 'react'
import {useTranslation} from 'react-i18next'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useSheetRouteParams,
} from 'react-native-actions-sheet'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Text from '~/themes/components/Text'
import Button from '../Button'

type Item = {
  title: string
  desc?: string
  key: string
  selected: boolean
  leftIcon?: any
}

type Payload = {
  showAll?: boolean
  data: Item[]
  onDone: (selections) => void
}

function MultiSelect(props: SheetProps) {
  const {t} = useTranslation()
  const {height} = useWindowDimensions()
  const {data, onDone, showAll} =
    props.payload || ({data: [], onDone: () => {}} as Payload)

  const actionSheetRef = React.useRef<ActionSheetRef>(null)
  const [selections, setSelections] = React.useState<Item[]>(
    data?.filter(i => i.selected),
  )
  const [isSelectAll, setIsSelectAll] = React.useState(false)

  const onSelect = i => () => {
    setSelections(s => [...s, i])
  }

  const onSelectAll = () => {
    setSelections(data)
    setIsSelectAll(true)
  }

  const onDeselectAll = () => {
    setSelections([])
    setIsSelectAll(false)
  }
  const onRemove = idx => () => {
    setSelections(s => s.filter((_, i) => i != idx))
  }

  const done = React.useCallback(async () => {
    await actionSheetRef.current?.hide()
    onDone?.(selections)
  }, [selections])

  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      useBottomSafeAreaPadding={true}>
      <View style={styles.header} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: 50 * data?.length,
          maxHeight: height * 0.8,
        }}>
        {showAll && (
          <TouchableOpacity
            onPress={isSelectAll ? onDeselectAll : onSelectAll}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 8,
              marginVertical: 8,
            }}>
            <MaterialIcons
              name={isSelectAll ? 'check-box' : 'check-box-outline-blank'}
              size={25}
              color="#222"
            />
            <Text useI18n style={{marginHorizontal: 8}}>
              {isSelectAll ? 'cancel_choose_all' : 'select_all'}
            </Text>
          </TouchableOpacity>
        )}
        {data?.map((i, idx) => {
          const selected = selections.findIndex(
            s => (i.key && s.key === i.key) || (i.title && s.title === i.title),
          )
          return (
            <TouchableOpacity
              key={`${i.title}-${idx}`}
              onPress={selected > -1 ? onRemove(selected) : onSelect(i)}
              style={styles.item}>
              {i.leftIcon}
              <View style={{flex: 1}}>
                <Text variant="title" style={{marginLeft: i.leftIcon ? 8 : 0}}>
                  {t(i.title)}
                </Text>
                {i.desc?.length && <Text variant="caption">{i.desc}</Text>}
              </View>
              <MaterialIcons
                name={selected > -1 ? 'check-box' : 'check-box-outline-blank'}
                size={20}
                color="#222"
              />
            </TouchableOpacity>
          )
        })}
      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <Button useI18n title="done" onPress={done} />
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  header: {
    width: 80,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 8,
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 16,
  },
  bottom: {
    height: 66,
    paddingTop: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
})

export default MultiSelect
