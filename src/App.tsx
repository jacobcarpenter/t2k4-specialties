import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";

const gridNames = Object.freeze({
	["grid-cols"]: "grid-cols-[[row_specialty]_auto_[description]_1fr_[row-end]]",
	row: "col-[row]",
	specialty: "col-[specialty]",
	description: "col-[description]",
});

export function App() {
	return (
		<div className="m-0 mx-auto flex min-h-screen max-w-5xl min-w-80 place-items-center bg-gray-900 p-8 text-white/87">
			<div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
				<div className={`grid ${gridNames["grid-cols"]} gap-8`}>
					{specialties.map((x) => (
						<div
							key={x.skillCategory}
							className={`grid grid-cols-subgrid ${gridNames.row}`}
						>
							<div
								className={`${gridNames.row} mb-4 text-2xl font-bold text-blue-400`}
							>
								{x.skillCategory}
							</div>
							<dl
								className={`grid grid-cols-subgrid ${gridNames.row} gap-x-4 gap-y-3`}
							>
								{x.specialties.map((y) => (
									<SpecialtyEntry
										key={y.name}
										name={y.name}
										description={y.description}
										skillCategory={x.skillCategory}
									/>
								))}
							</dl>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function SpecialtyEntry({
	name,
	description,
	skillCategory,
}: {
	name: string;
	description: string;
	skillCategory: string;
}) {
	return (
		<>
			<dt className={`${gridNames.specialty} text-right text-lg font-semibold text-gray-200`}>
				{name}
			</dt>
			<dd className={`${gridNames.description} text-lg text-gray-300`}>
				<SpecialtyDescription description={description} skillName={skillCategory} />
			</dd>
		</>
	);
}
