import { Fragment } from "react";
import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";

export function App() {
	return (
		<div className="m-0 mx-auto flex min-h-screen max-w-5xl min-w-80 place-items-center bg-gray-900 p-8 text-white/87">
			<div className="grid [grid-template-columns:_[row_specialty]_auto_[description]_1fr_[row-end]] gap-8">
				{specialties.map((x) => (
					<div
						key={x.skillCategory}
						className="[grid-column:_row] grid [grid-template-columns:_subgrid] rounded-lg border border-gray-700 bg-gray-800/50 p-6"
					>
						<div className="[grid-column:_row] mb-4 text-2xl font-bold text-blue-400">
							{x.skillCategory}
						</div>
						<dl className="[grid-column:_row] grid [grid-template-columns:_subgrid] gap-x-4 gap-y-3">
							{x.specialties.map((y) => (
								<Fragment key={y.name}>
									<dt className="[grid-column:_specialty] text-right text-lg font-semibold text-gray-200">
										{y.name}
									</dt>
									<dd className="[grid-column:_description] text-lg text-gray-300">
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
