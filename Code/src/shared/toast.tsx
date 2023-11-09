import React from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native'

export default function Toast(props: any) {
  const colorScheme = useColorScheme()
  let theme = colorScheme === 'dark'
  return (
    <View style={styles.modalContainer}>
      <Modal visible={true} transparent>
        <View style={styles.centered_view}>
          <View
            style={[
              styles.warning_modal,
              theme ? styles.darkThemeBackground : styles.lightThemeBackground,
            ]}
          >
            <View
              style={[
                styles.modal_body,
                colorScheme == 'dark'
                  ? [styles.darkThemeBackground, styles.darkBorder]
                  : [styles.lightThemeBackground, styles.lightBorder],
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.text,
                    colorScheme == 'dark'
                      ? styles.darkThemeText
                      : styles.lightThemeText,
                  ]}
                >
                  {props.message}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
  },
  text: {
    fontFamily: 'Montserrat',
  },
  centered_view: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  warning_modal: {
    alignSelf: 'center',
    marginBottom: 120,
    alignItems: 'center',
  },
  darkThemeBackground: {
    backgroundColor: '#1B1F23',
  },
  lightThemeBackground: {
    backgroundColor: '#FAFAFB',
  },
  modal_body: {
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: '#FAFAFB',
    justifyContent: 'space-between',
    borderWidth: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 0.4 * 10 },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * 10,
  },
  darkBorder: {
    borderColor: '#FFFFFF',
  },
  lightBorder: {
    borderColor: '#FFFFFF',
  },
  darkThemeText: {
    color: '#D1D0D0',
  },
  lightThemeText: {
    color: '#353535',
  },
})
