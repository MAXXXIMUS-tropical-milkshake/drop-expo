import React from 'react';
import { Share, View, TouchableOpacity, Text } from "react-native";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Привет! Это пример текста для шаринга из моего приложения.',
      url: 'https://example.com',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Поделились через: ', result.activityType);
      } else {
        console.log('Данные успешно отправлены');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Шаринг был отменён');
    }
  } catch (error: any) {
    console.error('Ошибка шаринга:', error.message);
  }
};

function ShareButton() {
  return (
  <View>
    <TouchableOpacity onPress={onShare} style={{borderWidth: 1}}>
      <Text>Share</Text>
    </TouchableOpacity>
  </View>
  )
}

export default ShareButton;
