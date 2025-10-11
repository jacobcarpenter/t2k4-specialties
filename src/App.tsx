import { useDeferredValue, useState, ViewTransition } from "react";
import { SpecialtyDescription } from "./SpecialtyDescription";
import { getFilteredSpecialties } from "./specialties";

const gridNames = Object.freeze({
	["grid-cols"]: "grid-cols-[[row_specialty]_auto_[description]_1fr_[row-end]]",
	row: "col-[row]",
	specialty: "col-[specialty]",
	description: "col-[description]",
});

export function App() {
	const [userSpecialties, setUserSpecialties] = useState("");

	const deferredUserSpecialties = useDeferredValue(userSpecialties);
	const specialtiesToShow = getFilteredSpecialties(deferredUserSpecialties);

	return (
		<div className="min-h-screen bg-gray-900 text-white/87 print:bg-white print:text-black">
			<div className="m-0 mx-auto flex max-w-5xl min-w-80 place-items-start p-8">
				<div className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-6 print:border-0 print:bg-transparent print:p-0">
					<div className="mb-6 print:hidden">
						<input
							id="userSpecialties"
							type="text"
							value={userSpecialties}
							onChange={(e) => setUserSpecialties(e.target.value)}
							className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
							placeholder="Locksmith, Electrician, Brawler, etc.…"
						/>
					</div>
					<div className={`grid ${gridNames["grid-cols"]} gap-8`}>
						{specialtiesToShow.map((x) => (
							<div
								key={x.skillCategory}
								className={`${gridNames.row} grid grid-cols-subgrid`}
							>
								<div
									className={`${gridNames.row} mb-4 text-2xl font-bold text-blue-400 print:text-black`}
								>
									{x.skillCategory}
								</div>
								<div
									className={`${gridNames.row} grid grid-cols-subgrid gap-x-4 gap-y-3`}
								>
									{x.specialties.map((y) => (
										<SpecialtyEntry
											key={y.name}
											name={y.name}
											description={y.description}
											skillCategory={x.skillCategory}
										/>
									))}
								</div>
							</div>
						))}
					</div>
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
		<ViewTransition>
			<div className={`${gridNames.row} grid grid-cols-subgrid`}>
				<div
					className={`${gridNames.specialty} text-right text-lg font-semibold text-gray-200 print:text-black`}
				>
					{name}
				</div>
				<div className={`${gridNames.description} text-lg text-gray-300 print:text-black`}>
					<SpecialtyDescription description={description} skillName={skillCategory} />
				</div>
			</div>
		</ViewTransition>
	);
}
