import React, { useState, useEffect, useContext } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";
import SnackBar from "./SnackBar";

const RandomMeme = ({ route }) => {
	const theme = useTheme();
	const [randomMeme, setRandomMeme] = useState(null);
	const { setFetchingState, isFetching } = useContext(FetchContext);
	useEffect(() => {
		const getRandomMeme = () => {
			setFetchingState(true, "meme");
			api()
				.get("memes/random")
				.then((res) => setRandomMeme(res.data.url))
				.catch((err) => console.log(err))
				.finally(() => {
					setFetchingState(false, "meme");
				});

			console.log(Dimensions.get("screen").width, Dimensions.get("screen").height);
		};
		getRandomMeme();
		console.log(randomMeme);
	}, [route.params]);

	return (
		<View
			style={{
				display: "flex",
				padding: 20,
				flexGrow: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{!isFetching.meme && (
				<Image
					source={{ uri: randomMeme }}
					style={{
						width: Dimensions.get("screen").width - 40,
						height: Dimensions.get("screen").width - 100,
					}}
					resizeMode="stretch"
				/>
			)}
			{isFetching.meme && (
				<ActivityIndicator
					animating={true}
					color={theme.colors.primaryContainer}
					size={150}
					style={{ position: "absolute" }}
				/>
			)}
			<SnackBar message={"Long press on the navigation icon to refresh!"} show={true} />
		</View>
	);
};

export default RandomMeme;
