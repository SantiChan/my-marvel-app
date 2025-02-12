import React, { useCallback } from "react";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
	placeholder?: string;
	onSearchChange?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = "SEARCH A CHARACTER...",
	onSearchChange,
}) => {
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (onSearchChange) {
				onSearchChange(e.target.value);
			}
		},
		[onSearchChange],
	);

	return (
		<div className={styles.searchContainer}>
			<svg
				className={styles.icon}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				className={styles.searchInput}
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</div>
	);
};

export default React.memo(SearchBar);
