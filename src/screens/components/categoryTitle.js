import React from 'react';
import {View, Text} from 'react-native';

const CATEGORY_COLORS = {
  Actor: {
    color: '#A2DCFE',
    backgroundColor: '#D6F0FF',
    borderColor: '#E1F0F9',
  },
  Beauty: {
    color: '#FFC1C1',
    backgroundColor: '#FFE0DF',
    borderColor: '#FDDEDD',
  },
  Cosplay: {
    color: '#FFDC7C',
    backgroundColor: '#FFF3D1',
    borderColor: '#FBF0D1',
  },
  Food: {
    color: '#FFCA99',
    backgroundColor: '#FFECD9',
    borderColor: '#FCF2EA',
  },
  Musician: {
    color: '#52D38D',
    backgroundColor: '#D0F3E1',
    borderColor: '#CDEFDD',
  },
  Streamer: {
    color: '#A192FC',
    backgroundColor: '#E6E1FE',
    borderColor: '#DFDBF6',
  },
};

const CategoryTitle = function({category}) {
  let {color, backgroundColor, borderColor} = CATEGORY_COLORS[category];
  return (
    <View
      style={{
        backgroundColor,
        borderColor,
        marginLeft: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
      }}>
      <Text style={{color, fontWeight: 700}}>{category}</Text>
    </View>
  );
};

export default CategoryTitle;
