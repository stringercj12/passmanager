import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';
import { Alert } from 'react-native';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);
  const dataKey = '@passmanager:logins';
  async function loadData() {
    // Get asyncStorage data, use setSearchListData and setData

    const response = await AsyncStorage.getItem(dataKey);
    const newData = response ? JSON.parse(response) : [];

    console.log(newData);

    setData(newData);
    setSearchListData(newData);

  }
  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(useCallback(() => {
    loadData();
    
  }, []));

  function handleFilterLoginData(search: string) {
    // Filter results inside data, save with setSearchListData

    if (search) {
      Alert.alert('Poxa 😢 algo deu errado', 'Informe titulo que deseja buscar');
      return;
    }

    const dataFiltered = data.filter(login => login.title === search);
    setSearchListData(dataFiltered);

  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => String(item.id)}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}