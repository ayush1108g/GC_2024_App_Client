import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CarouselCard from '../Components/CarouselCard';

var { width, height } = Dimensions.get('window');

export default function homePage() {

    const navigation = useNavigation();

    const [activeIndex, setActiveIndex] = useState(0);


    data = {
        banners: [
            require('../assets/CarouselBanners/Banner1.jpg'),
            require('../assets/CarouselBanners/Banner1.jpg'),

        ],
        teams: [require('../assets/Team Banners/CSE.jpg'),
        require('../assets/Team Banners/ECE.jpg'),
        require('../assets/Team Banners/EE.jpg'),
        require('../assets/Team Banners/CE.jpg'),
        require('../assets/Team Banners/ME.jpg')],
        news: [require('../assets/news/news1.jpg'),
        require('../assets/news/news1.jpg')
        ]
    }

    const renderPagination = () => {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <ScrollView style={styles.content}>




                <View style={styles.newsSection} >

                    <Carousel
                        data={data.banners}
                        renderItem={({ item }) => <CarouselCard item={item} height={'100%'} width={width * 0.9} />}
                        firstItem={1}
                        sliderWidth={width}
                        itemWidth={width * 0.62}
                        inactiveSlideOpacity={0}
                        vertical={false}
                        slideStyle={{ display: 'flex', alignItems: 'center' }}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        autoplay={true}
                    // enableSnap={true}
                    />
                    {renderPagination()}
                </View>

                <View style={styles.newsSection} >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={styles.newsTitle}>NEWS</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsPage')}>
                            <Text style={{ color: '#BA1D55', marginRight: '5%', fontStyle: '' }}>View all {'>'} </Text>
                        </TouchableOpacity>
                    </View>

                    <Carousel
                        layout="default"
                        data={data.news}
                        renderItem={({ item }) => <CarouselCard item={item} height={'100%'} width={width * 0.9} />}
                        firstItem={1}
                        sliderWidth={width}
                        itemWidth={width * 0.62}
                        inactiveSlideOpacity={0}
                        vertical={false}
                        slideStyle={{ display: 'flex', alignItems: 'center' }}

                        autoplay={true}
                    // enableSnap={true}
                    />
                </View>

                <View style={styles.teamsSection} >
                    <Text style={styles.teamsTitle}>ALL TEAMS</Text>

                    <Carousel
                        layout="default"
                        data={data.teams}
                        renderItem={({ item }) => <CarouselCard item={item} height={'100%'} width={width * 0.9} />}
                        firstItem={1}
                        sliderWidth={width}
                        itemWidth={width * 0.62}
                        inactiveSlideOpacity={0}
                        vertical={false}
                        slideStyle={{ display: 'flex', alignItems: 'center' }}

                        autoplay={true}
                    // enableSnap={true}
                    />
                </View>

            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        width: '90%',
        height: 50,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingleft: 2,
        paddingTop: 10,
        margin: 20
    },
    content: {
        flex: 1,
        paddingTop: 20,
    },
    bannerContainer: {
        height: 200,
        backgroundColor: '#e0e0e0', // Placeholder color
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    newsSection: {
        width: 358,
        height: 160,
        marginTop: 30,
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    newsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    teamsSection: {
        width: 358,
        height: 112,
        marginTop: 30,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    teamsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: 'white'
    },
    socialMediaSection: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    // Additional styles for news items, team icons, etc.
    newsImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },

});