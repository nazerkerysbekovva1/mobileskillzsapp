'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import Util from './Utils'

import Video from 'react-native-video';

import { Icon } from './Icon';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onPressFullscreen = this.onPressFullscreen.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true, // Add paused state to control video playback
    orientationWidth: 0,
    orientationHeight: 0,
  };

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

//   componentWillMount() {
//     this.resizeVideoPlayer();
//   }

  componentDidMount() {
    Dimensions.addEventListener('change', this.resizeVideoPlayer);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resizeVideoPlayer);
  }

  resizeVideoPlayer = () => {
    // Always in 16:9 aspect ratio
    const { width, height } = Dimensions.get('window');

    if (Util.isPortrait()) {
      this.setState({
        orientationWidth: width * 0.8,
        orientationHeight: width * 0.8 * 0.56,
      });
    } else {
      this.setState({
        orientationHeight: height * 0.8,
        orientationWidth: height * 0.8 * 1.77,
      });
    }
  };

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    
    return <View 
      onLayout={this.onLayout}
      style={styles.container} className='f-full h-40 items-center border border-white my-4'>
      <Video
        ref={p => { this.videoPlayer = p; }}
        source={require('../../assets/video/1.mp4')}
        // style={{width: this.state.orientationWidth, height: this.state.orientationHeight }}
        controls={true}  //
        rate={this.state.rate}
        paused={this.state.paused}
        volume={this.state.volume}
        muted={this.state.muted}
        resizeMode={this.state.resizeMode}
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        onEnd={() => { console.log('Done!') }}
        repeat={true} 
        className='w-full h-full'
      />
        {/* <TouchableOpacity onPress={() => setIsPlaying(p => !p)} className='w-9 h-9 absolute rounded-lg bg-custom-Green items-center justify-center top-16'>
            <Icon src={require('../../assets/icon/play.png')} size={14}/>
        </TouchableOpacity> */}

      {/* <Button title="full screen" onPress={ this.onPressFullscreen }></Button> */}




      <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>

    </View>
  }

  onPressFullscreen() {
    if (this.videoPlayer != null) {
      this.videoPlayer.presentFullscreenPlayer();
    }
  }

  onLayout(e) {
    console.log('on layout called');
    this.resizeVideoPlayer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "black",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});


// AppRegistry.registerComponent('VideoPlayer', () => VideoPlayer);