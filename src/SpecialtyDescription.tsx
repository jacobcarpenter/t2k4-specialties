import { Fragment } from "react";

interface SpecialtyDescriptionProps {
	description: string;
	skillName: string;
}

export function SpecialtyDescription({ description, skillName }: SpecialtyDescriptionProps) {
	const parts = parseDescription(description, skillName);

	return (
		<>
			{parts.map((part, index) => {
				if (typeof part === "string") {
					return <Fragment key={index}>{part}</Fragment>;
				}
				return (
					<span
						key={index}
						className="font-bold bg-gradient-to-r from-blue-500/30 to-cyan-400/30 px-1.5 py-0.5 rounded text-xs font-variant-small-caps"
					>
						{part.value}
					</span>
				);
			})}
		</>
	);
}

type ParsedPart = string | { value: string };

function parseDescription(description: string, skillName: string): ParsedPart[] {
	const parts: ParsedPart[] = [];
	let currentIndex = 0;

	// Regular expression to match %skill(Some value) or %skill
	const regex = /%skill(\([^)]+\))?/g;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(description)) !== null) {
		// Add the text before the match
		if (match.index > currentIndex) {
			parts.push(description.substring(currentIndex, match.index));
		}

		// Extract the skill value
		if (match[1]) {
			// %skill(Some value) - extract "Some value" from the parentheses
			const value = match[1].substring(1, match[1].length - 1);
			parts.push({ value });
		} else {
			// %skill - use the skillName
			parts.push({ value: skillName });
		}

		currentIndex = match.index + match[0].length;
	}

	// Add any remaining text after the last match
	if (currentIndex < description.length) {
		parts.push(description.substring(currentIndex));
	}

	return parts;
}
