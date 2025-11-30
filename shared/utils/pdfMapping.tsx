import { Text, View, Font } from '@react-pdf/renderer';
import { pdfDefaultSchemaMappings } from '@blocknote/xl-pdf-exporter';

// Регистрация шрифта для отображения кода
// Используется для блоков 'procode'
Font.register({
  family: 'Code',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inconsolata/v21/QldKNThLqRwH-OJ1UHjlKGlW5qhExfHw.woff2',
    },
  ],
});

// Стили для кастомного блока 'alert'
const alertBlockStyles = {
  warning: { bg: '#fff6e6', color: '#e69819' }, // Желтый/Оранжевый
  error: { bg: '#ffe6e6', color: '#d80d0d' }, // Красный
  info: { bg: '#e6ebff', color: '#507aff' }, // Синий
  success: { bg: '#e6ffe6', color: '#0bc10b' }, // Зеленый
};

export const myPdfMappings = {
  blockMapping: {
    alert: (block, children) => {
      const type = block?.props?.type || 'info';
      const style = alertBlockStyles[type] ?? alertBlockStyles.info;

      return (
        <View
          style={{
            backgroundColor: style.bg,
            padding: 8,
            borderLeft: `3 solid ${style.color}`,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: style.color }}>
            {children}
          </Text>
        </View>
      );
    },

    procode: (block) => (
      <View style={{ padding: 8, backgroundColor: '#f6f6f6' }}>
        <Text style={{ fontFamily: 'Code' }}>
          {block?.text || ''}
        </Text>
      </View>
    ),

    youtube: (block) => (
      <View>
        <Text>Видео: {block?.props?.url}</Text>
      </View>
    ),
  },
};