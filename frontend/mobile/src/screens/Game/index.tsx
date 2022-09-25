import { TouchableOpacity, Text, View, Image, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "@env";


import { GameParams } from "../../@types/navigation";

import { THEME } from "../../theme";
import { styles } from "./style";

import { useEffect, useState } from "react";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const [loading, setLoading] = useState<boolean>(false);
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [showDuoMatchModal, setshowDuoMatchModal] = useState<string>("");

  const navigation = useNavigation();
  const route = useRoute();

  const game = route.params as GameParams;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/games/${game.id}/ads`)
    .then((res) => res.json())
    .then((data) => setDuos(data))
    .finally(() => setLoading(false));
}, []);
  
  const handleGoBack = () => {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    setLoading(true);
    fetch(`${API_URL}/ads/${adsId}/discord`)
    .then((res) => res.json())
    .then((data) => setshowDuoMatchModal(data.discord))
    .finally(() => setLoading(false));
  };
  
  return (
      <Background>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleGoBack}>
                <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
                />
              </TouchableOpacity>
              <Image source={logoImg} style={styles.logo}/>
              <View style={styles.right}/>
            </View>
            
            <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover" />

            <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
            />
            <FlatList
            style={styles.containerList}
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>
            )}
            horizontal
            contentContainerStyle={[duos.length > 1 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
            />
            <DuoMatch
            visible={showDuoMatchModal.length > 0}
            discord={showDuoMatchModal}
            onClose={() => setshowDuoMatchModal("")}
            />
          </SafeAreaView>
        </Background>
  )
}
