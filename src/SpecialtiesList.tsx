import { ViewTransition } from "react";
import { SpecialtyDescription } from "./SpecialtyDescription";
import { type SpecialtyData } from "./specialties";

const gridNames = Object.freeze({
	["grid-cols"]: "grid-cols-[[row_specialty]_auto_[description]_1fr_[row-end]]",
	row: "col-[row]",
	specialty: "col-[specialty]",
	description: "col-[description]",
});

export function SpecialtiesList({ specialties }: { specialties: SpecialtyData }) {
	return (
		<ViewTransition>
			<div className={`grid ${gridNames["grid-cols"]} gap-8`}>
				{specialties.map((x) => (
					<div
						key={x.skillCategory}
						className={`${gridNames.row} grid grid-cols-subgrid`}
					>
						<div
							className={`${gridNames.row} mb-4 text-lg font-bold text-black uppercase`}
						>
							{x.skillCategory}
						</div>
						<div className={`${gridNames.row} grid grid-cols-subgrid gap-x-4 gap-y-3`}>
							{x.specialties.map((y) => (
								<SpecialtyEntry
									key={y.name}
									name={y.name}
									description={y.description}
									source={y.source}
									skillCategory={x.skillCategory}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</ViewTransition>
	);
}

function SpecialtyEntry({
	name,
	description,
	source,
	skillCategory,
}: {
	name: string;
	description: string;
	source?: string;
	skillCategory: string;
}) {
	return (
		<ViewTransition name={`specialty-${name}`}>
			<div className={`${gridNames.row} grid grid-cols-subgrid`}>
				<div className={`${gridNames.specialty} text-right font-semibold text-black`}>
					{name}
				</div>
				<div className={`${gridNames.description} text-black`}>
					<SpecialtyDescription description={description} skillName={skillCategory} />
					{source && <span className="text-sm text-stone-500">{` [${source}]`}</span>}
				</div>
			</div>
		</ViewTransition>
	);
}
