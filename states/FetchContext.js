import { useState, createContext, useEffect } from "react";

export const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
	const [isRandomJokeFetching, setIsRandomJokeFetching] = useState(false);
	const [isRandomMemeFetching, setIsRandomMemeFetching] = useState(false);

	const setFetchingState = (toggle, what) => {
		switch (what) {
			case "meme":
				setIsRandomMemeFetching(toggle);
				break;
			case "joke":
				setIsRandomJokeFetching(toggle);
				break;
			default:
				break;
		}
	};

	return (
		<FetchContext.Provider
			value={{
				setFetchingState,
				isFetching: { meme: isRandomMemeFetching, joke: isRandomJokeFetching },
			}}
		>
			{children}
		</FetchContext.Provider>
	);
};
