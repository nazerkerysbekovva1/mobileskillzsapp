import React from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity, Modal, Picker, BackHandler, Linking
} from 'react-native';
import { getProduct, returnData, userData } from '../../Functions';
import Video from 'react-native-video';
import { Config } from '../../Config';
import MyWeb from '../../component/MyWeb';
import { Avatar, Button, ButtonGroup, Card, Header, Icon, Input } from 'react-native-elements';
// import StarRating from 'react-native-star-rating/StarRating';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Product from '../../component/Product';
import FastImage from 'react-native-fast-image';
import { Lng } from '../../Language';
import UrlWebView from '../../component/UrlWebView';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ProductView extends React.PureComponent {

	state = {
		modalPart: false,
		modalSupport: false,
		modalComment: false,
		modalBuy: false,
		product: undefined,
		token: null,
		tabIndex: 0,
		spinnerComment: false,
		spinnerSupport: false,
		spinnerBuy: false,
		video: null,
		payGateway: 'credit',
		gateway: [],
		discount: 0,
		tax: 0,
		total: 0,
		pause: true,
		modalQuiz: false,
		quizId: null,
	}
	async componentDidMount(): void {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
		let id = this.props.route.params.id;
		let data = await getProduct(id);
		let gateway = await returnData();
		this.setState({ product: data });
		this.setState({ total: data.price });
		this.setState({ gateway: gateway.gateway });

		let user = await userData();
		if (user['token'] != undefined) {
			this.setState({ token: user['token'] });
		}
	}
	componentWillUnmount(): void {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}
	async _refreshdata() {
		this.setState({ product: null });
		let id = this.props.route.params.id;
		let data = await getProduct(id);
		let gateway = await returnData();
		this.setState({ product: data });
		this.setState({ total: data.price });
		this.setState({ gateway: gateway.gateway });
	}
	onBackPress = () => {
		this.props.navigation.goBack();
		return true;
	}
	_openCommentModal = () => {
		if (this.state.token == null) {
			showMessage({
				message: 'Login First',
				type: 'danger'
			})
			return;
		} else {
			this.setState({ modalComment: true });
		}
	}
	_openBuyModal = () => {
		if (this.state.token == null) {
			showMessage({
				message: 'Login First',
				type: 'danger'
			})
			return;
		} else {
			this.setState({ modalBuy: true });
		}
	}
	_openSupportModal = () => {
		if (this.state.token == null) {
			showMessage({
				message: 'Login First',
				type: 'danger'
			});
			return;
		} else {
			if (this.state.product.buy == '1') {
				this.setState({ modalSupport: true });
			} else {
				showMessage({
					message: 'Purchase this item first',
					type: 'danger'
				})
				return;
			}
		}
	}
	_openPart(item) {
		if (item['free'] == 0 && (this.state.token == null || this.state.product.buy == '0')) {
			showMessage({
				message: 'Please Login Or Purchase Course',
				type: 'danger'
			})
			return;
		} else {
			this.setState({ video: Config.url + '/api/v' + Config.version + '/product/stream?id=' + item.id + '&token=' + this.state.token });
			this.setState({ modalPart: true });
		}
	}
	async _sendComment() {
		if (this.state.commentTxt == undefined || this.state.commentTxt == '') {
			this.refs.message.showMessage('Write review first...');
			return;
		}

		this.setState({ spinnerComment: true });
		let result = await fetch(Config.url + '/api/v' + Config.version + '/product/comment', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: this.state.token,
				secret: Config.secret,
				id: this.state.product.id,
				comment: this.state.commentTxt
			})
		});

		result = await result.json();
		this.setState({ spinnerComment: false });
		if (result != undefined && result.status == '1') {
			this.setState({ modalComment: false });
			showMessage({
				message: 'send successfully',
				type: 'success'
			});
		} else {
			this.refs.message.showMessage(result.error);
		}

	}
	async _sendSupport() {
		if (this.state.supportTxt == null || this.state.supportTxt == '') {
			this.refs.messageSupport.showMessage('Write Message first...');
			return;
		}

		this.setState({ spinnerSupport: true });
		let result = await fetch(Config.url + '/api/v' + Config.version + '/product/support', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: this.state.token,
				secret: Config.secret,
				content_id: this.state.product.id,
				comment: this.state.supportTxt
			})
		});

		result = await result.json();
		this.setState({ spinnerSupport: false });
		if (result != undefined && result.status == '1') {
			this.setState({ modalSupport: false });
			showMessage({
				message: 'send successfully',
				type: 'success'
			});
			await this._refreshdata();
		} else {
			this.refs.support_message.showMessage(result.error);
		}
	}
	_pay = () => {
		let gateway = this.state.payGateway;
		Linking.openURL(Config.url + '/api/v1/product/pay?id=' + this.state.product.id + '&gateway=' + gateway + '&token=' + this.state.token + '&mode=download');
	}
	_openUrl(url) {
		if (url == undefined || url == null)
			return;

		Linking.openURL(url);
	}
	_openUrlLive(url) {
		if (url == undefined || url == null)
			return;

		if (this.state.product.buy == 1) {
			Linking.openURL(url);
		} else {
			return showMessage({
				message: 'Purchase First',
				type: 'danger'
			})
		}

	}
	_openQuiz(id) {
		this.setState({ quizId: id });
		this.setState({ modalQuiz: true });
	}

	_renderTabs = () => {
		if (this.state.tabIndex == 1) {
			return (
				<MyWeb style={{ backgroundColor: Config.background }} html={this.state.product['content']} />
			)
		}
		if (this.state.tabIndex == 0) {
			if (this.state.product['type'] == "webinar") {
				return (<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.product['meetings']}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity onPress={() => { this._openUrlLive(item.join) }}>
									<View style={style.meetingContainer}>
										<View style={{ width: '80%', flex: 1, flexDirection: 'row' }}>
											<Icon style={style.meetingContainerIcon} name={'ios-play'} type={'ionicon'} />
											<Text style={style.partContainerText}>0{index + 1}. {item['title']}</Text>
											<Text style={style.meetingDate}>{item.date}</Text>
										</View>
										<View style={{ width: '20%', alignItems: 'flex-end' }}>
											<Text style={{ fontFamily: 'robotolight', color: '#adadad' }}>{item.duration}</Text>
										</View>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<View style={{ height: 100 }} />
				</View>)
			}
			return (
				<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.product['parts']}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity onPress={() => { this._openPart(item) }}>
									<View style={style.partContainer}>
										<View style={{ width: '80%', flex: 1, flexDirection: 'row' }}>
											{(item['free'] == 1 || this.state.product.buy == 1) ? <Icon style={style.partContainerIcon} name={'ios-play'} type={'ionicon'} /> : <Icon style={style.partContainerIcon} name={'ios-lock'} type={'ionicon'} />}
											<Text style={style.partContainerText}>0{index + 1}. {item['title']}</Text>
										</View>
										<View style={{ width: '20%', alignItems: 'flex-end' }}>
											<Text style={{ fontFamily: 'robotolight', color: '#adadad' }}>{item.duration}</Text>
										</View>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<View style={{ height: 100 }} />
				</View>
			)
		}
		if (this.state.tabIndex == 2) {
			return (
				<View>
					<FlatList data={this.state.product.comments} renderItem={({ item }) => {
						return (
							<Card containerStyle={{ borderRadius: 10, marginTop: 0, marginBottom: 8 }}>
								<Text style={{ fontFamily: 'robotobold' }}>{item.user}</Text>
								<View style={{ height: 5 }} />
								<Text style={{ fontFamily: 'robotolight', color: '#adadad' }}>{item.comment}</Text>
							</Card>
						)
					}} />
					<View style={{ height: 100 }} />
				</View>
			)
		}
		if (this.state.tabIndex == 3) {
			return (
				<View>
					<FlatList data={this.state.product.supports} renderItem={({ item }) => {
						let color = '#fff';
						if (item.type == 'supporter') {
							color = '#FFFBE5'
						}
						return (
							<Card containerStyle={{ borderRadius: 10, marginTop: 0, marginBottom: 8, backgroundColor: color }}>
								<Text style={{ fontFamily: 'robotobold', color: '#000', paddingBottom: 10 }}>{item.name}</Text>
								<Text style={{ fontFamily: 'robotolight', color: '#adadad' }}>{item.comment}</Text>
								<Text style={{ fontFamily: 'robotolight', color: 'gray', fontSize: 9, textAlign: 'right' }}>{item.date}</Text>
							</Card>
						)
					}} />
					<View style={{ height: 70 }} />
				</View>
			)
		}
		if (this.state.tabIndex == 4) {
			return (<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.product['quizzes']}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity activeOpacity={0.9} onPress={() => { this._openQuiz(item.id) }}>
								<Card containerStyle={style.quizContainer}>
									{(item.result != undefined && item.result != null && item.result.status != undefined) ?
										<View style={style.quizBadge}><Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.result.status}</Text></View>
										: null}
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Text>{item.title}</Text>
									</View>
									<View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
										<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
											<Icon color={'#CDCDCD'} name={'ios-help-circle'} type={'ionicon'} />
											<Text style={{ color: '#CDCDCD' }}> {item.questions} </Text>
										</View>
										<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
											<Icon color={'#CDCDCD'} name={'ios-clock'} type={'ionicon'} />
											<Text style={{ color: '#CDCDCD' }}> {item.time} {Lng.Minutes}</Text>
										</View>
										{(item.result != null && item.result.user_grade != undefined) ?
											<View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }}>
												<Icon color={'#CDCDCD'} name={'ios-school'} type={'ionicon'} />
												<Text style={{ color: '#CDCDCD', top: 0 }}> {item.result.user_grade != undefined ? item.result.user_grade : 0} </Text>
											</View>
											: null}
									</View>
								</Card>
							</TouchableOpacity>
						)
					}}
				/>
				<View style={{ height: 100 }} />
			</View>)
		}
		if (this.state.tabIndex == 5) {
			return (<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.product['certificates']}
					renderItem={({ item, index }) => {
						return (
							<Card containerStyle={style.quizContainer}>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Text>{item.title}</Text>
								</View>
								<View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
									<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
										<Icon color={'#CDCDCD'} name={'ios-school'} type={'ionicon'} />
										<Text style={{ color: '#CDCDCD' }}> {item.grade} </Text>
									</View>
								</View>
								<Button onPress={() => { this._openUrl(item.certificate) }} containerStyle={{ width: 120, position: 'absolute', right: 0, top: 10 }} title={Lng.download} buttonStyle={{ backgroundColor: '#13CE9C', borderRadius: 25 }} />
							</Card>
						)
					}}
				/>
				<View style={{ height: 100 }} />
			</View>)
		}
	}
	_renderButton = () => {
		if ((this.state.tabIndex == 0 || this.state.tabIndex == 1) && this.state.product.buy == '0') {
			return (
				<View style={{ position: 'absolute', height: 60, width: '100%', bottom: 0, backgroundColor: '#fff', elevation: 10 }}>
					<Button title={Lng.enroll_on_the_course} containerStyle={{ width: '80%', alignSelf: 'center', paddingTop: 10 }} buttonStyle={{ backgroundColor: '#13CE9C', borderRadius: 25 }} onPress={() => { this._openBuyModal() }} />
				</View>
			)
		}
		if (this.state.tabIndex == 2) {
			return (
				<View style={{ position: 'absolute', height: 60, width: '100%', bottom: 0, backgroundColor: '#fff', elevation: 10 }}>
					<Button title={Lng.write_a_review} onPress={() => { this._openCommentModal() }} containerStyle={{ width: '80%', alignSelf: 'center', paddingTop: 10 }} buttonStyle={{ backgroundColor: '#13CE9C', borderRadius: 25 }} />
				</View>
			)
		}
		if (this.state.tabIndex == 3) {
			return (
				<View style={{ position: 'absolute', height: 60, width: '100%', bottom: 0, backgroundColor: '#fff', elevation: 10 }}>
					{this.state.product.support == '1' ?
						<Button onPress={() => { this._openSupportModal() }} title={'Send Support message'} containerStyle={{ width: '80%', alignSelf: 'center', paddingTop: 10 }} buttonStyle={{ backgroundColor: '#13CE9C', borderRadius: 25 }} />
						:
						<Button title={Lng.support_is_disabled} containerStyle={{ width: '80%', alignSelf: 'center', paddingTop: 10 }} buttonStyle={{ backgroundColor: 'gray', borderRadius: 25 }} />
					}
				</View>
			)
		}
	}
	_tabsArray = () => {

		if (this.state.product['quizzes_enable'] == true && this.state.product['certificates_enable']) {
			return [
				this.state.product['type'] == "webinar" ? Lng.live : Lng.Courses,
				Lng.Information,
				Lng.Comments,
				Lng.support,
				Lng.Quizzes,
				Lng.Certificates
			];
		}

		if (this.state.product['quizzes_enable'] == true) {
			return [
				this.state.product['type'] == "webinar" ? Lng.live : Lng.Courses,
				Lng.Information,
				Lng.Comments,
				Lng.support,
				Lng.Quizzes
			];
		}

		if (this.state.product['certificates_enable'] == true) {
			return [
				this.state.product['type'] == "webinar" ? Lng.live : Lng.Courses,
				Lng.Information,
				Lng.Comments,
				Lng.support,
				Lng.Certificates
			];
		}

		return [
			this.state.product['type'] == "webinar" ? Lng.live : Lng.Courses,
			Lng.Information,
			Lng.Comments,
			Lng.support
		];
	}

	_render = () => {
		if (this.state.product == undefined) {
			return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
		} else {
			return (
				<View style={{ flex: 1, backgroundColor: Config.background }}>
					<Header
						containerStyle={{ height: 60 }}
						backgroundColor={'#343871'}
						leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.props.navigation.goBack(); }} />}
						leftContainerStyle={{ bottom: 14, left: 14 }}
						centerComponent={{ text: this.state.product.title, numberOfLines: 1, style: { color: '#fff', fontFamily: 'robotobold' } }}
						centerContainerStyle={{ bottom: 13 }}
					/>
					<ScrollView>
						<Video
							playInBackground={false}
							playWhenInactive={false}
							paused={this.state.pause}
							fullscreenAutorotate={true}
							controls={true}
							source={{ uri: Config.url + '/' + this.state.product['sample'] }}
							poster={this.state.product['cover']}
							posterResizeMode={'cover'}
							style={{ flex: 1, height: 240, backgroundColor: '#000' }}
						/>
						<View style={{ padding: 13 }}>
							<Text style={{ fontFamily: 'robotobold', fontSize: 18 }}>{this.state.product.title}</Text>
							<View style={style.detailsContainer}>
								<Icon name={'ios-clock'} type={'ionicon'} color={'gray'} style={style.detailsIcon} />
								<Text style={style.detailsText}>{this.state.product['duration']} | {this.state.product.category.title}</Text>
							</View>
							<View style={{ height: 10 }} />
							<View style={{ borderBottomWidth: 1, borderBottomColor: '#E1E1E4', paddingBottom: 5, flex: 1, flexDirection: 'row' }}>
								<View style={{ width: '75%', height: 'auto' }}>
									<Text style={{ fontFamily: 'robotobold', color: 'green', fontSize: 17 }}>{this.state.product.currency}{this.state.product.price}</Text>
								</View>
								<View style={{ width: '25%', height: 'auto' }}>
									{/* <StarRating disabled={true} starSize={15} containerStyle={{top:6}} starStyle={{color:'gold'}} rating={this.state.product.rates} maxStars={5}/> */}
								</View>
							</View>
							<View style={{ height: 15 }} />
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={{ width: '70%' }}>
									<Avatar size={'medium'} title={'PA'} rounded={true} source={{ uri: this.state.product.user.avatar }} />
									<Text style={{ fontFamily: 'robotoregular', position: 'absolute', left: 70, top: 15 }}>{this.state.product.user.name}</Text>
								</View>
								<View style={{ width: '30%' }}>
									<Button onPress={() => { this.props.navigation.navigate('Profile', { id: this.state.product.user.id }) }} title={'Profile'} titleStyle={{ fontSize: 12, color: '#13CE9C' }} buttonStyle={{ backgroundColor: 'transparent', borderColor: '#13CE9C', borderWidth: 1, borderRadius: 20, padding: 0, paddingTop: 5, paddingBottom: 5 }} containerStyle={{ top: 8 }} />
								</View>
							</View>
						</View>
						<ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false} horizontal={true}>
							<SegmentedControlTab
								values={this._tabsArray()}
								onTabPress={(index) => { this.setState({ tabIndex: index }) }}
								selectedIndex={this.state.tabIndex}
								firstTabStyle={{ borderRadius: 0, borderBottomLeftRadius: 0 }}
								tabsContainerStyle={{ padding: 15 }}
								tabStyle={{ borderWidth: 0, backgroundColor: 'transparent', borderRadius: 0, padding: 24, borderBottomWidth: 2, borderBottomColor: 'transparent', paddingLeft: 10, paddingRight: 10 }}
								tabTextStyle={{ paddingBottom: 5, fontFamily: 'robotobold', fontSize: 14, color: 'gray' }}
								activeTabStyle={{ borderBottomWidth: 2, backgroundColor: 'transparent', borderBottomColor: '#343871' }}
								activeTabTextStyle={{ color: '#343871' }}
								lastTabStyle={{ borderBottomRightRadius: 0 }}
							/>
						</ScrollView>
						<View>
							{this._renderTabs()}
						</View>
					</ScrollView>
					{this._renderButton()}
					<Modal onRequestClose={() => { this.setState({ modalComment: false }) }} visible={this.state.modalComment}>
						<View style={{ flex: 1, backgroundColor: Config.background }}>
							<Header
								containerStyle={{ height: 60 }}
								backgroundColor={'#343871'}
								leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.setState({ modalComment: false }) }} />}
								leftContainerStyle={{ bottom: 10 }}
								centerComponent={{ text: 'Write a review', numberOfLines: 1, style: { color: '#fff', fontFamily: 'robotobold' } }}
								centerContainerStyle={{ bottom: 9 }}
							/>
							<Input onChangeText={(txt) => { this.setState({ commentTxt: txt }) }} multiline={true} scrollEnabled={true} containerStyle={{ height: '100%', width: '100%', borderWidth: 0, flex: 1 }} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder={'write...'} />
							<View style={{ elevation: 4, flex: 1, flexDirection: 'row', position: 'absolute', width: '100%', height: 60, bottom: 0, left: 0, backgroundColor: '#fff' }}>
								<View style={{ width: '100%', paddingTop: 10 }}>
									<Button onPress={() => { this._sendComment() }} title={'Send'} buttonStyle={{ width: '80%', alignSelf: 'center', backgroundColor: '#13CE9C', borderRadius: 20 }} />
								</View>
							</View>
						</View>
						<FlashMessage ref={'message'} />
						<Spinner visible={this.state.spinnerComment} />
					</Modal>
					<Modal onRequestClose={() => { this.setState({ modalSupport: false }) }} visible={this.state.modalSupport}>
						<View style={{ flex: 1, backgroundColor: Config.background }}>
							<Header
								containerStyle={{ height: 60 }}
								backgroundColor={'#343871'}
								leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.setState({ modalSupport: false }) }} />}
								leftContainerStyle={{ bottom: 10 }}
								centerComponent={{ text: 'Support', numberOfLines: 1, style: { color: '#fff', fontFamily: 'robotobold' } }}
								centerContainerStyle={{ bottom: 9 }}
							/>
							<Input onChangeText={(txt) => { this.setState({ supportTxt: txt }) }} multiline={true} scrollEnabled={true} containerStyle={{ height: '100%', width: '100%', borderWidth: 0, flex: 1 }} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder={'write...'} />
							<View style={{ elevation: 4, flex: 1, flexDirection: 'row', position: 'absolute', width: '100%', height: 60, bottom: 0, left: 0, backgroundColor: '#fff' }}>
								<View style={{ width: '100%', paddingTop: 10 }}>
									<Button onPress={() => { this._sendSupport() }} title={'Send'} buttonStyle={{ width: '80%', alignSelf: 'center', backgroundColor: '#13CE9C', borderRadius: 20 }} />
								</View>
							</View>
						</View>
						<FlashMessage ref={'support_message'} />
						<Spinner visible={this.state.spinnerSupport} />
					</Modal>
					<Modal onRequestClose={() => { this.setState({ modalBuy: false }) }} visible={this.state.modalBuy}>
						<View style={{ flex: 1, backgroundColor: Config.background }}>
							<Header
								containerStyle={{ height: 60 }}
								backgroundColor={'#343871'}
								leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.setState({ modalBuy: false }) }} />}
								leftContainerStyle={{ bottom: 14, left: 10 }}
								centerComponent={{ text: 'Enroll on the course', numberOfLines: 1, style: { color: '#fff', fontFamily: 'robotobold' } }}
								centerContainerStyle={{ bottom: 14 }}
							/>
							<View style={{ padding: 20 }}>
								<ScrollView>
									<Text style={{ fontFamily: 'robotobold' }}>Item</Text>
									<Card containerStyle={style.container}>
										<FastImage style={style.image} source={{ uri: this.state.product.thumbnail }} />
										<View style={style.text}>
											<Text style={{ fontFamily: 'robotobold', color: Config.headerBgColor }} numberOfLines={1}>{this.state.product.title}</Text>
											<Text style={{ color: 'green', marginTop: 10 }}>{this.state.product.currency}{this.state.product.price}</Text>
											<Text style={{ color: 'gray', marginTop: 10 }}>{this.state.product.duration}</Text>
										</View>
									</Card>
									<Text style={{ fontFamily: 'robotobold', color: Config.headerBgColor }}>Information</Text>
									<View style={{ height: 20 }} />
									<View style={{ padding: 28, paddingTop: 0, paddingBottom: 0 }}>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={{ width: '50%', fontFamily: 'robotolight' }}>Item Price:</Text>
											<Text style={{ width: '50%', fontFamily: 'robotolight', textAlign: 'right' }}>{this.state.product.currency}{this.state.product.price}</Text>
										</View>
									</View>
									<View style={{ height: 15 }} />
									<View style={{ padding: 28, paddingTop: 0, paddingBottom: 0 }}>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={{ width: '50%', fontFamily: 'robotolight' }}>Discount:</Text>
											<Text style={{ width: '50%', fontFamily: 'robotolight', textAlign: 'right' }}>{this.state.product.currency}{this.state.discount}</Text>
										</View>
									</View>
									<View style={{ height: 15 }} />
									<View style={{ padding: 28, paddingTop: 0, paddingBottom: 0 }}>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={{ width: '50%', fontFamily: 'robotolight' }}>Tax:</Text>
											<Text style={{ width: '50%', fontFamily: 'robotolight', textAlign: 'right' }}>{this.state.product.currency}{this.state.tax}</Text>
										</View>
									</View>
									<View style={{ height: 15 }} />
									<View style={{ padding: 28, paddingTop: 0, paddingBottom: 0 }}>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={{ width: '50%', fontFamily: 'robotolight' }}>Total:</Text>
											<Text style={{ width: '50%', fontFamily: 'robotolight', textAlign: 'right' }}>{this.state.product.currency}{this.state.total}</Text>
										</View>
									</View>
									<View style={{ height: 15 }} />

									<Text style={{ fontFamily: 'robotobold', color: Config.headerBgColor }}>Payment Gateway</Text>
									<Picker
										selectedValue={this.state.payGateway}
										onValueChange={(val) => { this.setState({ payGateway: val }) }}
										style={{ borderWidth: 1, borderColor: 'gray' }}
									>
										<Picker.Item label={'credit'} value={'credit'} />
										{this.state.gateway.map((item, i) => {
											return (<Picker.Item label={item} value={item} />)
										})}
									</Picker>
								</ScrollView>
							</View>
							<View style={{ elevation: 4, flex: 1, flexDirection: 'row', position: 'absolute', width: '100%', height: 60, bottom: 0, left: 0, backgroundColor: '#fff' }}>
								<View style={{ width: '60%', paddingTop: 10 }}>
									<Button onPress={() => { }} title={'Have a gift code?'} buttonStyle={{ width: '95%', alignSelf: 'center', backgroundColor: Config.headerBgColor, borderRadius: 20 }} />
								</View>
								<View style={{ width: '40%', paddingTop: 10 }}>
									<Button onPress={() => { this._pay() }} title={'Pay'} buttonStyle={{ width: '95%', alignSelf: 'center', backgroundColor: '#13CE9C', borderRadius: 20 }} />
								</View>
							</View>
						</View>
						<FlashMessage ref={'message'} />
						<Spinner visible={this.state.spinnerBuy} />
					</Modal>
					<Modal onRequestClose={() => { this.setState({ modalPart: false }) }} visible={this.state.modalPart}>
						<View style={{ flex: 1 }}>
							<Video
								paused={false}
								fullscreenAutorotate={true}
								controls={true}
								source={{ uri: this.state.video }}
								posterResizeMode={'cover'}
								style={{ flex: 1, height: 240, backgroundColor: '#000' }}
							/>
						</View>
					</Modal>
					<Modal visible={this.state.modalQuiz} onRequestClose={() => { this.setState({ modalQuiz: false }) }}>
						<View style={{ flex: 1, backgroundColor: Config.background }}>
							<Header
								containerStyle={{ height: 60 }}
								backgroundColor={'#343871'}
								leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.setState({ modalComment: false }) }} />}
								leftContainerStyle={{ bottom: 10 }}
								centerComponent={{ text: 'Quiz', numberOfLines: 1, style: { color: '#fff', fontFamily: 'robotobold' } }}
								centerContainerStyle={{ bottom: 9 }}
							/>
							<UrlWebView url={Config.url + '/api/v' + Config.version + '/quiz/' + this.state.quizId + '?token=' + this.state.token} />
						</View>
					</Modal>
				</View>
			)
		}
	}
	render() {
		return (
			this._render()
		)
	}
}

let style = StyleSheet.create({
	detailsContainer: {
		padding: 10,
		margin: 0,
		flex: 1,
		alignItems: 'flex-start',
		position: 'relative',
		backgroundColor: 'transparent',
		borderWidth: 0,
		elevation: 0,
	},
	detailsIcon: {
		position: 'absolute',
		left: 0,
	},
	detailsText: {
		position: 'absolute',
		left: 36,
		top: 12,
		color: 'gray'
	},
	partContainer: {
		flex: 1,
		flexDirection: 'row',
		height: 48,
		backgroundColor: 'transparent',
		marginTop: 2,
		padding: 10,
		alignItems: 'flex-start',
		paddingLeft: 15,
		paddingRight: 15,
	},
	partContainerIcon: {
		position: 'absolute',
		left: 0
	},
	partContainerText: {
		position: 'absolute',
		fontFamily: 'robotolight',
		left: 36,
		top: 3
	},
	container: {
		flex: 1,
		height: 105,
		borderRadius: 8,
		padding: 0,
		marginBottom: 13,
		marginTop: 10,
	},
	image: {
		position: 'absolute',
		left: -1,
		top: 0,
		width: 140,
		height: 104,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},
	text: {
		marginLeft: 150,
		top: 10,
		paddingRight: 10
	},
	meetingContainer: {
		flex: 1,
		flexDirection: 'row',
		height: 68,
		backgroundColor: 'transparent',
		marginTop: 2,
		padding: 10,
		alignItems: 'flex-start',
		paddingLeft: 15,
		paddingRight: 15,
	},
	meetingDate: {
		left: 30,
		top: 30,
		color: '#B2BDC4'
	},
	meetingContainerIcon: {
		position: 'absolute',
		left: 0,
		top: 25
	},
	quizContainer: {
		borderRadius: 14,
		height: 'auto',
		padding: 8,
		paddingRight: 15,
		paddingLeft: 15
	},
	quizBadge: {
		width: 90,
		height: 40,
		backgroundColor: '#1FBD50',
		position: 'absolute',
		top: -8,
		right: -15,
		borderTopRightRadius: 14,
		borderBottomLeftRadius: 14,
		elevation: 10,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
