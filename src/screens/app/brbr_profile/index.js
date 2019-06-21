import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import Loading from '../../../components/loading';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Switch from '../../../components/switch';
import Comment from '../../../components/comment';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import vipIcon from '../../../assets/icons/vip.png';
import portraitBack from '../../../assets/images/portrait.png';
import starIcon from '../../../assets/icons/star.png';

class BrbrProfile extends Component {

  state = {
    lng: {},
    loading: true,
    name: 'Andre Gomez',
    city: 'San Salvador',
    stars: 4.5,
    cuts: 120,
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
    switchActive: true,
    comments: [
      {
        avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        title: 'MUY BUEN TRABAJO AMIGO',
        city: 'Ecuador',
        name: 'Fidel Castro',
        date: '12/02/1902',
        body: 'Este si que sabe'
      },
      {
        avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        title: 'MUY BUEN TRABAJO AMIGO',
        city: 'Ecuador',
        name: 'Fidel Castro',
        date: '12/02/1902',
        body: 'Este si que sabe'
      },
      {
        avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        title: 'MUY BUEN TRABAJO AMIGO',
        city: 'Ecuador',
        name: 'Fidel Castro',
        date: '12/02/1902',
        body: 'Este si que sabe'
      },
      {
        avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        title: 'MUY BUEN TRABAJO AMIGO',
        city: 'Ecuador',
        name: 'Fidel Castro',
        date: '12/02/1902',
        body: 'Este si que sabe'
      }
    ]
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  renderComments = () => (
    <FlatList
      data={this.state.comments}
      renderItem={(item) =>
        <Comment
          avatar={item.item.avatar}
          title={item.item.title}
          city={item.item.city}
          name={item.item.name}
          date={item.item.date}
          body={item.item.body}
        />
      }
      keyExtractor={(a, i) => `${i}`}
    />
  )

  render() {

    const {
      lng,
      loading,
      name,
      city,
      stars,
      cuts,
      avatar,
      switchActive
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.brbr_profile_title}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.popToTop()}
            />
          }
          right={
            <Image
              style={styles.vipIcon}
              source={vipIcon}
            />
          }
        />
        <Image
          style={styles.portraitBack}
          source={portraitBack}
        />
        <View
          style={styles.portraitBackFront}
        >
          <Text
            style={styles.name}
          >
            {name}
          </Text>
          <Text
            style={styles.city}
          >
            {city}
          </Text>
        </View>
        <View
          style={styles.interSection}
        >
          <View
            style={styles.section}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text
                style={styles.stars}
              >
                {stars}
              </Text>
              <Image
                source={starIcon}
              />
            </View>
            <Text
              style={styles.lbl}
            >
              {lng.rese}
            </Text>
          </View>
          <View
            style={styles.section}
          >
            <Image
              style={styles.avatar}
              source={{ uri: avatar }}
            />
          </View>
          <View
            style={styles.section}
          >
            <Text
              style={styles.stars}
            >
              {cuts}
            </Text>
            <Text
              style={styles.lbl}
            >
              {lng.cuts}
            </Text>
          </View>
        </View>
        {
          loading ?
            <Loading />
            :
            <Content
              contentContainerStyle={styles.content}
            >
              <Switch
                st={lng.galery}
                ft={lng.rese}
                onPress={() => this.setState({ switchActive: !this.state.switchActive })}
                active={switchActive}
              />
              {
                switchActive ?
                  this.renderComments()
                  :
                  null
              }
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(BrbrProfile);