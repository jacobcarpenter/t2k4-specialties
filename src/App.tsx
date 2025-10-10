import { Fragment } from "react";
import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";

export function App() {
	return (
		<div className="max-w-5xl mx-auto p-8">
			<div className="space-y-8">
				{specialties.map((x) => (
					<div
						key={x.skillCategory}
						className="border border-gray-700 rounded-lg p-6 bg-gray-800/50"
					>
						<div className="text-2xl font-bold mb-4 text-blue-400">
							{x.skillCategory}
						</div>
						<dl className="space-y-3">
							{x.specialties.map((y) => (
								<Fragment key={y.name}>
									<dt className="font-semibold text-lg text-gray-200">
										{y.name}
									</dt>
									<dd className="ml-4 text-gray-300 mb-3">
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
		</div>
	);
}
