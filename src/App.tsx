import { useDeferredValue, useState, ViewTransition } from "react";
import { getFilteredSpecialties } from "./specialties";
import { SpecialtiesList } from "./SpecialtiesList";

export function App() {
	const [userSpecialties, setUserSpecialties] = useState("");

	const deferredUserSpecialties = useDeferredValue(userSpecialties);
	const specialtiesToShow = getFilteredSpecialties(deferredUserSpecialties);

	return (
		<div className="flex min-h-screen flex-col bg-white text-black">
			{!!deferredUserSpecialties && (
				<ViewTransition enter="corner-slide-in-out" exit="corner-slide-in-out">
					<div className="fixed top-0 right-0 z-50 print:hidden">
						<svg width="60" height="60" className="overflow-visible">
							<polygon points="0,0 60,0 60,60" fill="#57534e" />
							<text
								x="38"
								y="24"
								fill="white"
								fontSize="10"
								fontWeight="bold"
								fontFamily="sans-serif"
								transform="rotate(45 38 24)"
								textAnchor="middle"
							>
								Print me!
							</text>
						</svg>
					</div>
				</ViewTransition>
			)}
			<div className="flex-grow">
				<div className="m-0 mx-auto flex max-w-5xl min-w-80 place-items-start p-8">
					<div className="w-full">
						<header className="mb-6 print:hidden">
							<h1 className="text-2xl font-bold text-black">
								Twilight: 2000 4th Edition
							</h1>
							<h2 className="text-lg text-black">
								Specialty Quick-Reference Sheet Builder
							</h2>
						</header>
						<div className="mb-6 print:hidden">
							<input
								id="userSpecialties"
								type="text"
								value={userSpecialties}
								onChange={(e) => setUserSpecialties(e.target.value)}
								className="w-full rounded border border-gray-400 bg-white px-3 py-2 text-black placeholder-gray-500 focus:border-gray-600 focus:outline-none"
								placeholder="Locksmith, Electrician, Brawler, etc…"
							/>
						</div>

						<SpecialtiesList specialties={specialtiesToShow} />
					</div>
				</div>
			</div>
			<footer className="mx-auto w-full max-w-5xl px-8 pb-8 text-xs text-gray-600 print:hidden">
				<div className="border-t border-gray-300 pt-4">
					<p className="mb-2">
						This tool was created under license and contains material that is copyright
						Fria Ligan AB, Mongoose Publishing Ltd, and/or other authors. Such material
						is used with permission under the Community Content Agreement for Free
						League Workshop.
					</p>
					<p className="mb-2">
						All other original material in this work is copyright{" "}
						{new Date().getFullYear()} by Jacob Carpenter and published under the
						Community Content Agreement for Free League Workshop.
					</p>
					<p>
						<a
							href="https://github.com/jacobcarpenter/t2k4-specialties"
							target="_blank"
							rel="noopener noreferrer"
							className="transition-all hover:text-stone-700 hover:text-shadow-[0_0_8px_rgb(0_0_0_/_0.3)]"
						>
							Source on GitHub
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}
