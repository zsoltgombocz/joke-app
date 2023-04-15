import React, { useState, useEffect, useContext } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { ActivityIndicator, useTheme, TextInput, Text } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";

const SearchJokes = () => {
	const theme = useTheme();
	const [jokes, setJokes] = useState(null);
	const [text, setText] = useState("");
	const { setFetchingState, isFetching } = useContext(FetchContext);
	useEffect(() => {
		const getJokes = () => {
			setFetchingState(true, "joke");
			api()
				.get("jokes/random")
				.then((res) => setRandomJoke(res.data.joke))
				.catch((err) => console.log(err))
				.finally(() => {
					setFetchingState(false, "joke");
				});
		};
		getJokes();
	}, [text]);

	return (
		<View>
			<TextInput label="Search" value={text} onChangeText={(text) => setText(text)} />

			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{jokes &&
					jokes.map((joke) => (
						<Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>
							{joke}
						</Text>
					))}
			</ScrollView>
		</View>
	);
};

export default SearchJokes;
