import { View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./style";

import logoImg from "../../assets/logo-nlw-esports.png"; 
import { Heading } from "../../components/Heading";
import React, { useEffect, useState } from "react";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Loading } from '../../components/Loading';
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

import { API_URL } from "@env";



export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate("game", {id, title, bannerUrl});
    }

    useEffect(() => {
        setLoading(true);
      fetch(`${API_URL}/games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .finally(() => setLoading(false));
    }, []);

    if(loading) {
        return <Loading />
    }
    
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo}/>
                <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>
                <FlatList data={games} keyExtractor={item => item.id} renderItem={({item}) => (
                    <GameCard data={item} onPress={() => handleOpenGame(item)}/>
                )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    )
}