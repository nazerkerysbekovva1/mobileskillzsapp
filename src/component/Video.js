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
  ActivityIndicator,
  TouchableOpacity,
  PanResponder,
  ToastAndroid,
} from 'react-native';

import Util from './Utils'
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';

import { Icon } from './Icon';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    // this.onLayout = this.onLayout.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  // resizeVideoPlayer() {
  //   // Always in 16 /9 aspect ratio
  //   let {width, height} = Dimensions.get('window');

  //   if (Util.isPortrait()) {
  //     this.setState({
  //       orientationWidth: width * 0.8,
  //       orientationHeight: width * 0.8 * 0.56,
  //     });
  //   } else {
  //     this.setState({
  //       orientationHeight: height * 0.8,
  //       orientationWidth: height * 0.8 * 1.77
  //     });
  //   }
  // }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true, 

    videoWidth: 0,
    videoHeight: 0,
    fullscreen: false,
    isLoading: false,
    seekerFillWidth: 0,
    seekerPosition: 0,
    seekerOffset: 0,
    seeking: false,
    loop: false,

    showControls: false,
  };


  onLoad(data) {
    this.setState({ duration: data.duration }, () => {
      this.setState({ paused: false });
    });
  }

  onProgress(data) {
    if (!this.state.seeking) {
      const position = this.calculateSeekerPosition()
      this.setSeekerPosition(position)
    }
    this.setState({ currentTime: data.currentTime })
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl() {
    const { rate } = this.state;
    
    return (
      <TouchableOpacity onPress={() => this.toggleRate()}>
        <Text style={styles.controlOption}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }
  
  toggleRate() {
    const { rate } = this.state;
    let newRate = 1.0;
  
    if (rate === 0.25) {
      newRate = 0.5;
    } else if (rate === 0.5) {
      newRate = 1.0;
    } else if (rate === 1.0) {
      newRate = 1.5;
    } else if (rate === 1.5) {
      newRate = 2.0;
    } else if (rate === 2.0) {
      newRate = 0.25;
    }
  
    this.setState({ rate: newRate });
  }
  

  renderVolumeControl() {
    const { volume } = this.state;
  
    return (
      <TouchableOpacity onPress={() => this.toggleVolume()}>
        <Text style={styles.controlOption}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }
  
  toggleVolume() {
    const { volume } = this.state;
    let newVolume = 0.5;
  
    if (volume === 0.5) {
      newVolume = 1.0;
    } else if (volume === 1.0) {
      newVolume = 1.5;
    } else if (volume === 1.5) {
      newVolume = 0.5;
    }
  
    this.setState({ volume: newVolume });
  }
  
  renderResizeModeControl() {
    const { resizeMode } = this.state;
  
    return (
      <TouchableOpacity onPress={() => this.toggleResizeMode()}>
        <Text style={styles.controlOption}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }
  
  toggleResizeMode() {
    const { resizeMode } = this.state;
    let newResizeMode = 'cover';
  
    if (resizeMode === 'cover') {
      newResizeMode = 'contain';
    } else if (resizeMode === 'contain') {
      newResizeMode = 'stretch';
    } else if (resizeMode === 'stretch') {
      newResizeMode = 'cover';
    }
  
    this.setState({ resizeMode: newResizeMode });
  }
  

  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0
    } else if (val >= this.seekerWidth) {
      return this.seekerWidth
    }
    return val
  }

  setSeekerPosition(position = 0) {
    const state = this.state
    position = this.constrainToSeekerMinMax(position)

    state.seekerFillWidth = position
    state.seekerPosition = position

    if (!state.seeking) {
      state.seekerOffset = position
    }

    this.setState(state)
  }

  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration
    return this.seekerWidth * percent
  }

  calculateTimeFromSeekerPosition() {
    const percent = this.state.seekerPosition / this.seekerWidth
    return this.state.duration * percent
  }

initSeekPanResponder() {
  this.seekPanResponder = PanResponder.create({
    // Ask to be the responder.
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,

    /**
     * When we start the pan tell the machine that we're
     * seeking. This stops it from updating the seekbar
     * position in the onProgress listener.
     */
    onPanResponderGrant: (evt, gestureState) => {
      const state = this.state
      // this.clearControlTimeout()
      const position = evt.nativeEvent.locationX
      this.setSeekerPosition(position)
      state.seeking = true
      this.setState(state)
    },

    /**
     * When panning, update the seekbar position, duh.
     */
    onPanResponderMove: (evt, gestureState) => {
      const position = this.state.seekerOffset + gestureState.dx
      this.setSeekerPosition(position)
    },

    /**
     * On release we update the time and seek to it in the video.
     * If you seek to the end of the video we fire the
     * onEnd callback
     */
    onPanResponderRelease: (evt, gestureState) => {
      const time = this.calculateTimeFromSeekerPosition()
      const state = this.state
      if (time >= state.duration && !state.isLoading) {
        state.paused = true
        this.onEnd()
      } else {
        this.video?.seek(time)
        state.seeking = false
      }
      this.setState(state)
    },
  })
}

  componentDidMount() {
    this.initSeekPanResponder();
    // this.resizeVideoPlayer();
    Orientation.lockToPortrait();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      if (this.state.fullscreen) {
        Orientation.lockToLandscape(); // Блокируем ориентацию в горизонтальном режиме
      } else {
        Orientation.lockToPortrait(); // Возвращаем ориентацию в портретный режим
      }
    });
  }

  toast = (visible, message) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
      return null
    }
    return null
  }

  onError = (err) => {
    console.log(JSON.stringify(err?.error.errorCode))
    this.toast(true, 'error: ' + err?.error.errorCode)
  }

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged(event) {
    this.setState({ paused: !event.hasAudioFocus });
  }  

  onVideoLoadStart = () => {
    console.log('onVideoLoadStart')
    this.setState({ isLoading: true })
  }

  onAspectRatio = (data) => {
    console.log('onAspectRadio called ' + JSON.stringify(data))
    this.setState({
      videoWidth: data.width,
      videoHeight: data.height,
    })
  }

  onReadyForDisplay = () => {
    console.log('onReadyForDisplay')

    this.setState({ isLoading: false })
  }

  onVideoBuffer = (param) => {
    console.log('onVideoBuffer')

    this.setState({ isLoading: param.isBuffering })
  }

  // toggleFullscreen() {
  //   this.setState({ fullscreen: !this.state.fullscreen })
  // }
  
  IndicatorLoadingView() {
    if (this.state.isLoading) {
      return <ActivityIndicator color="#3235fd" size="large" style={styles.IndicatorStyle} />;
    } else {
      return <View />;
    }
  }

  renderFullScreenControl() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.toggleFullscreen()
        }}
      >
        <Icon src={require('../../assets/icon/fullscreen-exit.png')} size={20} color='white'/>
      </TouchableOpacity>
    )
  }

  renderSeekBar() {
    if (!this.seekPanResponder) {
      return null
    }
    return (
      <View
        style={styles.seekbarContainer}
        {...this.seekPanResponder.panHandlers}
        {...styles.generalControls}
      >
        <View
          style={styles.seekbarTrack}
          onLayout={(event) => (this.seekerWidth = event.nativeEvent.layout.width)}
          pointerEvents={'none'}
        >
          <View
            style={{
                    width:
                      this.state.seekerFillWidth > 0 ? this.state.seekerFillWidth : 0,
                    backgroundColor: '#d8f76e',
                    height: 5,
                  }}
            pointerEvents={'none'}
          />
        </View>
        <View
          style={[
            styles.seekbarHandle,
            { left: this.state.seekerPosition > 0 ? this.state.seekerPosition : 0 },
          ]}
          pointerEvents={'none'}
        >
          <View
            style={styles.seekbarCircle}
            pointerEvents={'none'}
          />
        </View>
      </View>
    )
  }

  toggleControls() {
    this.setState({ showControls: !this.state.showControls });
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return <View 
        // onLayout={this.onLayout}
        onTouchEnd={() => this.toggleControls()}
        style={this.state.fullscreen ? styles.fullScreen : styles.halfScreen}
        >
      <Video
        // ref={p => { this.videoPlayer = p; }}
        source={ this.props.source }
        controls={false}
        rate={this.state.rate}
        paused={this.state.paused}
        volume={this.state.volume}
        muted={this.state.muted}
        resizeMode={this.state.resizeMode}  
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        onEnd={() => console.log('end')}

        fullscreen={this.state.fullscreen}
        progressUpdateInterval={1000}
        onError={this.onError}
        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
        onAudioFocusChanged={this.onAudioFocusChanged}
        onLoadStart={this.onVideoLoadStart}
        onVideoAspectRatio={this.onAspectRatio}
        onReadyForDisplay={this.onReadyForDisplay}
        onBuffer={this.onVideoBuffer}
        repeat={this.state.loop}
        playInBackground={false}
        
        className='w-full h-full'
      />

    {this.state.showControls && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })} className='w-9 h-9 rounded-lg bg-custom-Green items-center justify-center'>
              <Icon src={this.state.paused ? require('../../assets/icon/play.png') : require('../../assets/icon/pause.png')} size={14}/>
          </TouchableOpacity>
        </View>
    )}
    
              <View className='absolute top-4 right-4 flex-row space-x-2'>
                  {this.renderRateControl()}
                  {this.renderVolumeControl()}
              </View>

            <View className= {this.state.fullscreen ? 'absolute bottom-0' : 'absolute -bottom-4'}>
              <View className='ml-auto pr-4 flex-row space-x-2 items-center'>
                  {this.renderResizeModeControl()}
                  {this.renderFullScreenControl()}
                </View>

              {this.renderSeekBar()}
            </View>

          <View style={styles.trackingControls}>    
            <View>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
    </View>
  }

  // onLayout(e) {
  //   console.log('on layout called');
  //   this.resizeVideoPlayer();
  // }

}

const styles = StyleSheet.create({
  trackingControls: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  halfScreen: {
    width: '100%',
    height: 192,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  fullScreen: {
    width: '100%',
    height: 324,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 10,
    // transform: [{ rotate: '90deg' }],
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  IndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  seekbarContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderRadius: 4,
    height: 30,
  },
  seekbarTrack: {
    backgroundColor: '#333',
    height: 1,
    position: 'relative',
    top: 14,
    width: '100%',
  },
  seekbarHandle: {
    position: 'absolute',
    marginLeft: -7,
    height: 28,
    width: 28,
  },
  seekbarCircle: {
    borderRadius: 12,
    position: 'relative',
    top: 8,
    left: 8,
    height: 12,
    width: 12,
    backgroundColor: '#d8f76e',
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -4.5 }, { translateY: -4.5 }], // Adjust for button size
    backgroundColor: 'transparent',
    width: 9,
    height: 9,
    borderRadius: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
