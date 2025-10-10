export const specialties = [
	createForSkill("Close Combat", [
		["Brawler", "+1 to %skill in unarmed close combat."],
		["Melee", "+1 to %skill for all hand-to-hand combat weapons (knives, bayonets, clubs, etc.)."],
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
];

function createForSkill(skillCategory: string, specialties: [name: string, description: string][]) {
	return {
		skillCategory,
		specialties: specialties.map(([name, description]) => ({ name, description })),
	};
}
