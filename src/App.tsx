import { Fragment } from "react";
import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";

export function App() {
	return (
		<div className="m-0 mx-auto flex min-h-screen max-w-5xl min-w-80 place-items-center bg-gray-900 p-8 text-white/87">
			<div className="space-y-8">
				{specialties.map((x) => (
					<div
						key={x.skillCategory}
						className="rounded-lg border border-gray-700 bg-gray-800/50 p-6"
					>
						<div className="mb-4 text-2xl font-bold text-blue-400">
							{x.skillCategory}
						</div>
						<dl className="space-y-3">
							{x.specialties.map((y) => (
								<Fragment key={y.name}>
									<dt className="text-lg font-semibold text-gray-200">
										{y.name}
									</dt>
									<dd className="mb-3 ml-4 text-gray-300">
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
