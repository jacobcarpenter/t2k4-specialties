import { useDeferredValue, useState } from "react";
import { getFilteredSpecialties } from "./specialties";
import { SpecialtiesList } from "./SpecialtiesList";

export function App() {
	const [userSpecialties, setUserSpecialties] = useState("");

	const deferredUserSpecialties = useDeferredValue(userSpecialties);
	const specialtiesToShow = getFilteredSpecialties(deferredUserSpecialties);

	return (
		<div className="min-h-screen bg-white text-black">
			<div className="m-0 mx-auto flex max-w-5xl min-w-80 place-items-start p-8">
				<div className="w-full">
					<div className="mb-6 print:hidden">
						<input
							id="userSpecialties"
							type="text"
							value={userSpecialties}
							onChange={(e) => setUserSpecialties(e.target.value)}
							className="w-full rounded border border-gray-400 bg-white px-3 py-2 text-black placeholder-gray-500 focus:border-gray-600 focus:outline-none"
							placeholder="Locksmith, Electrician, Brawler, etc.…"
						/>
					</div>
					<SpecialtiesList specialties={specialtiesToShow} />
				</div>
			</div>
		</div>
	);
}
