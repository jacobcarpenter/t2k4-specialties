import { Fragment } from "react";
import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";

import "./App.css";

export function App() {
	return (
		<>
			<div>
				{specialties.map((x) => (
					<div key={x.skillCategory}>
						<div>{x.skillCategory}</div>
						<dl>
							{x.specialties.map((y) => (
								<Fragment key={y.name}>
									<dt>{y.name}</dt>
									<dd>
										<SpecialtyDescription
											description={y.description}
											skillName={x.skillCategory}
										/>
									</dd>
								</Fragment>
							))}
						</dl>
					</div>
				))}
			</div>
		</>
	);
}
