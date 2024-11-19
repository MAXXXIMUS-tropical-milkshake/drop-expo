import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Регистрация', // Заголовок экрана
          headerShown: true,    // Показывать заголовок
          headerStyle: {        // Стили для заголовка
            backgroundColor: '#f2f2f2',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Вход', 
          headerShown: true, 
          headerBackTitle: 'Назад',
        }} 
      />
    </Stack>
  );
}
