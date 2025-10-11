import uFuzzy from "@leeoniya/ufuzzy";
const uf = new uFuzzy({ interLft: 2 });

export function getFilteredSpecialties(filterText: string) {
	if (!filterText) {
		return specialties;
	}

	const filterTexts = filterText.split(/,\s*/).filter((x) => !!x);

	const flatSpecialties = specialties.flatMap((x) =>
		x.specialties.map((y) => ({ ...y, skillCategory: x.skillCategory })),
	);
	const titles = flatSpecialties.map((x) => x.name);

	return [...new Set(filterTexts.flatMap((filterText) => uf.filter(titles, filterText)!))]
		.toSorted((a, z) => a - z)
		.reduce(
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
}

export const specialties = [
	createForSkill("Close Combat", [
		["Brawler", "+1 %skill in unarmed close combat."],
		["Melee", "+1 %skill for all hand-to-hand combat weapons (knives, bayonets, clubs, etc.)."],
		[
			"Killer",
			"Can kill an incapacitated person outright without suffering negative effects (p. 73).",
		],
		["Martial Artist", "Unarmed %skill attacks have a crit threshold of 3 instead of 4."],
	]),
	createForSkill("Heavy Weapons", [
		["Machinegunner", "+1 to %skill rolls for firing all types of machine guns."],
		["Launcher Crew", "+1 to %skill rolls for firing grenade or missile launchers."],
		["Redleg", "+1 to %skill rolls when firing mortars or howitzers."],
		["Vehicle Gunner", "+1 to %skill rolls when firing vehicle-mounted cannons."], // cannons? just guns?
	]),
	createForSkill("Stamina", [
		["Builder", "+1 to %skill rolls made for base building."],
		[
			"Load Carrier",
			"Can carry four more encumberance units in both combat gear and backpack.",
		],
		[
			"NBC",
			"+1 to %skill for all infection rolls, including those triggered by radiation or chemical agents. You can identify nuclear, biological, and chemical weapon effects to personnel and equipment.",
		],
		["Ranger", "+1 to %skill rolls for marching, resisting hypothermia, and other hardships."],
		[
			"SERE Training",
			"+1 to %skill rolls for resisting interrogation, Psy Ops, bluffing, and torture effects.",
		],
	]),
	createForSkill("Driving", [
		["Biker", "+1 %skill all motorcycles and bicycles, on or off-road."],
		["Boatman", "+1 to %skill rolls for piloting boats, including sail and rowed boats."],
		["Pilot", "+1 to %skill rolls for flying fixed- and rotary-wing aircraft."],
		["Racer", "+1 %skill all wheeled vehicles except motorcycles."],
		["Tanker", "+1 %skill all tracked vehicles."],
	]),
	createForSkill("Mobility", [
		[
			"Diver",
			"+1 %skill when swimming, both across the surface and under it. Includes use of SCUBA gear.",
		],
		["Mountaineer", "+1 %skill for rappelling, ascender-climbing, and knot-tying."],
		["Paratrooper", "+1 %skill for skydiving, as well as for reducing damage from falling."],
		["Pitcher", "+1 to %skill rolls for thrown weapons, including knives and grenades."],
		["Rider", "+1 %skill for riding fast and performing maneuvers on horseback."],
		["Runner", "+1 %skill for running."],
	]),
	createForSkill("Ranged Combat", [
		["Archer", "+1 %skill for bows and crossbows."],
		["Reloader", "+1 to %skill rolls made to reload your firearm (p. 65)."],
		["Rifleman", "+1 %skill firing assault rifles, carbines, submachine guns, and shotguns."],
		["Sidearms", "+1 %skill firing revolvers and pistols."],
		["Sniper", "+1 %skill firing a sniper or hunting rifle."],
	]),
	createForSkill("Recon", [
		[
			"Combat Awareness",
			"When drawing initiative (p. 54), you may draw two and choose one to use.",
		],
		["Forward Observer", "Your %skill counts as one step higher when directing indirect fire."],
		[
			"Historian",
			"Roll %skill when you arrive at a new location. On success, the Referee can tell you something significant that happened here in the past (if anything has).",
		],
		["Infiltrator", "+1 to %skill rolls when trying to remain undetected."],
		[
			"Intelligence",
			"Roll %skill when you spot enemy troops, vehicles, and weapons. On success, the Referee tells you their stats.",
		],
		[
			"Investigator",
			"Roll %skill when you spend a stretch or more investigating the scene of a crime or a battle. On success, the Referee tells you some useful information about what has happened and when.",
		],
		["Scout", "+1 %skill for spotting others and avoiding ambushes."],
	]),
	createForSkill("Survival", [
		[
			"Cook",
			"Gain one additional ration of food when you or someone else in your group successfully forages, hunts, or fishes.",
		],
		["Farmer", "+1 to %skill rolls for farming."],
		["Fisher", "+1 to %skill rolls for fishing."],
		["Forager", "+1 to %skill rolls for foraging to find food."],
		["Navigator", "+1 to %skill rolls for navigation."],
		["Hunter", "+1 to %skill rolls for hunting to obtain food."],
		["Quartermaster", "+1 to %skill rolls for making camp or establishing a home base."],
		["Scrounger", "+1 to %skill rolls for scrounging."],
	]),
	createForSkill("Tech", [
		[
			"Blacksmith",
			"+1 to %skill rolls for metalworking, forging, casting, molding, and smelting.",
		],
		[
			"Chemist",
			"+1 to %skill rolls for distilling grain alcohol for fuel. Also lets you identify chemical substances correctly.",
		],
		[
			"Combat Engineer",
			"+1 to %skill rolls for placing and disarming mines and explosive devices, and to %skill(Recon) rolls to avoid mines.",
		],
		[
			"Communications",
			"+1 to %skill rolls for maintaining contact on radios, boosting a signal, using Morse code, setting up antennae, and using encryption equipment.",
		],
		[
			"Computers",
			"+1 to %skill rolls for using or tampering with computers and ancillary devices.",
		],
		[
			"Electrician",
			"+1 to %skill rolls for wiring, soldering, disabling and repairing electrical devices.",
		],
		["Gunsmith", "+1 to %skill rolls for repairing firearms."],
		["Improvised Munitions", "+1 to %skill rolls for making zip-guns and IEDs."],
		[
			"Locksmith",
			"+1 to %skill rolls for picking locks, cracking safes, and disarming alarms.",
		],
		["Mechanic", "+1 to %skill rolls for repairing engines, vehicles, generators, and pumps."],
		[
			"Scientist",
			"Roll %skill when you come across a phenomenon of any sort that requires knowledge of physics, biology, geology, or any other natural science. On success, the Referee must give you some useful information about it.",
		],
	]),
	createForSkill("Command", [
		[
			"Frontline Leader",
			"+1 to %skill rolls for helping someone who is incapacitated by stress (p. 77). Does not affect unit morale.",
		],
		[
			"Logistician",
			"When building a base (p. 132), you can roll %skill instead of any listed skill, but only if you have help by at least one person.",
		],
		[
			"Tactician",
			"Roll %skill when you spot an enemy force. On success, the Referee must tell you something useful about their current organization and objectives.",
		],
	]),
	createForSkill("Medical Aid", [
		[
			"Combat Medic",
			"+1 %skill for helping an incapacitated character get back up (p. 73). No effect on treating critical injuries.",
		],
		[
			"Counselor",
			"+1 to %skill rolls for counseling a person suffering from long-term mental trauma (p. 78).",
		],
		["Field Surgeon", "+1 %skill for treating critical injuries."],
		["General Practitioner", "+1 %skill for treating disease, poison, and NBC."],
		["Veterinarian", "+1 %skill for working on animals."],
	]),
	createForSkill("Persuasion", [
		[
			"Linguist",
			"You know another language of your choice, well enough to be taken for a native on a successful %skill roll.",
		],
		[
			"Musician",
			"+1 %skill in situations where singing or playing an instrument is helpful. The Referee has final say.",
		],
		["Interrogator", "+1 %skill for extracting information from a prisoner."],
		["Psy Ops", "+1 %skill for changing someone‘s mind about a particular issue."],
		["Teacher", "+1 to %skill rolls for teaching someone a specialty."],
		["Trader", "+1 %skill when negotiating an item‘s price."],
	]),
];

function createForSkill(skillCategory: string, specialties: [name: string, description: string][]) {
	return {
		skillCategory,
		specialties: specialties.map(([name, description]) => ({ name, description })),
	};
}
