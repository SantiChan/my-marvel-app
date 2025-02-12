import React from "react";
import Image from "next/image";
import styles from "./PlanetInfo.module.scss";

type PlanetInfoProps = {
	planet: {
		name: string;
		image: string;
		description: string;
	};
};

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet }) => {
	return (
		<div className={styles.planetContainer}>
			<div className={styles.planetImage}>
				<h3>{planet.name}</h3>
				<Image
					src={planet.image}
					alt={planet.name}
					width={350}
					height={350}
				/>
			</div>
			<div className={styles.planetInfo}>
				<p>{planet.description}</p>
			</div>
		</div>
	);
};

export default PlanetInfo;
