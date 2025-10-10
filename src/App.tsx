import { useDeferredValue, useState } from "react";
import { specialties } from "./specialties";
import { SpecialtyDescription } from "./SpecialtyDescription";
import uFuzzy from "@leeoniya/ufuzzy";

const uf = new uFuzzy();

const gridNames = Object.freeze({
	["grid-cols"]: "grid-cols-[[row_specialty]_auto_[description]_1fr_[row-end]]",
	row: "col-[row]",
	specialty: "col-[specialty]",
	description: "col-[description]",
});

export function App() {
	const [userSpecialties, setUserSpecialties] = useState("");

	const deferredUserSpecialties = useDeferredValue(userSpecialties);

	const flatSpecialties = specialties.flatMap((x) =>
		x.specialties.map((y) => ({ ...y, skillCategory: x.skillCategory })),
	);
	const titles = flatSpecialties.map((x) => x.name);
	const specialtiesToShow = !deferredUserSpecialties
		? specialties
		: uf.filter(titles, deferredUserSpecialties)!.reduce(
				(acc, curr) => {
					const matchedSpecialty = flatSpecialties.at(curr)!;
					const currentSkillGroup = acc.at(-1);

					if (currentSkillGroup?.skillCategory !== matchedSpecialty.skillCategory) {
						return [
							...acc,
							{
								skillCategory: matchedSpecialty?.skillCategory,
								specialties: [matchedSpecialty],
							},
						];
					}

					return [
						...acc.slice(0, -1), // preceding skill groups
						{
							...currentSkillGroup,
							specialties: [...currentSkillGroup.specialties, matchedSpecialty],
						},
					];
				},
				[] as typeof specialties,
			);

	return (
		<div className="min-h-screen bg-gray-900 text-white/87">
			<div className="m-0 mx-auto flex max-w-5xl min-w-80 place-items-start p-8">
				<div className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-6">
					<div className="mb-6">
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
