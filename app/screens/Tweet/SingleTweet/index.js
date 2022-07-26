import React from 'react'
import { Linking, TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import Image from '@components/Image'
import Text from '@components/Text'
import { Images, useTheme } from '@config'
import styles from './styles'
import Loading from './Loading'

const SingleTweet = (props) => {
	const { tweet, style, loading } = props
	const { colors } = useTheme()

	if (loading || !tweet) {
		return <Loading style={style} />
	}

	const handleTwitterHandlePress = () => {
		const handle = tweet.handle
		const link = `https://twitter.com/${handle}/status/${tweet.tweetId}`
		Linking.openURL(link).catch((error) => {
			throw new Error('Error opening twitter' + error)
		})
	}

	return (
		<>
			<View style={[styles.container, style]}>
				<View style={styles.contain} activeOpacity={0.9}>
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor={colors.border}
						onPress={handleTwitterHandlePress}
					>
						<Image source={{ uri: tweet.profileImage }} style={styles.thumb} />
					</TouchableHighlight>
					<View style={{ paddingLeft: 10, flex: 1 }}>
						<View style={{ flexDirection: 'row' }}>
							<Text semibold style={styles.marginVertical3}>
								{tweet.name}
							</Text>
							<Text style={styles.marginVertical3}>{' ' + tweet.handle}</Text>
						</View>

						<Text numberOfLines={3} style={styles.marginVertical3}>
							{tweet.text}
						</Text>
						<Text footnote grayColor style={styles.marginVertical3}>
							{'१ घण्टा अघि'}
						</Text>

						<View style={styles.contentRate} />
					</View>
				</View>
			</View>
		</>
	)
}

SingleTweet.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	item: PropTypes.object,
	onPress: PropTypes.func,
	onAction: PropTypes.func,
	type: PropTypes.string,
}

SingleTweet.defaultProps = {
	style: {},
	onPress: () => {},
	onAction: () => {},
	image: Images.news,
	title: 'Hilton San Francisco',
	subtitle: 'Arts & Humanities',
}

export default SingleTweet
