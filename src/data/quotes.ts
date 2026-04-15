export type QuoteTone = "insight" | "funny";

export type QuoteItem = {
	text: string;
	author: string;
	tags: string[];
	tone: QuoteTone;
	isGenerated?: boolean;
};

const QUOTE_SESSION_KEY = "footer_last_quote_text";

const QUOTE_LIBRARY: QuoteItem[] = [
	{
		text: "Truth can only be found in one place: the code.",
		author: "Robert C. Martin",
		tags: ["clean-code", "software-engineering"],
		tone: "insight",
	},
	{
		text: "Indeed, the ratio of time spent reading versus writing is well over 10 to 1.",
		author: "Robert C. Martin",
		tags: ["clean-code", "readability"],
		tone: "insight",
	},
	{
		text: "It is not enough for code to work.",
		author: "Robert C. Martin",
		tags: ["craftsmanship", "quality"],
		tone: "insight",
	},
	{
		text: "If you want to go fast, make it easy to read.",
		author: "Robert C. Martin",
		tags: ["clean-code", "readability"],
		tone: "insight",
	},
	{
		text: "You should name a variable using the same care with which you name a first-born child.",
		author: "Robert C. Martin",
		tags: ["naming", "clean-code"],
		tone: "insight",
	},
	{
		text: "A long descriptive name is better than a short enigmatic name.",
		author: "Robert C. Martin",
		tags: ["naming", "clarity"],
		tone: "insight",
	},
	{
		text: "Clean code always looks like it was written by someone who cares.",
		author: "Robert C. Martin",
		tags: ["clean-code", "professionalism"],
		tone: "insight",
	},
	{
		text: "Of course bad code can be cleaned up. But it's very expensive.",
		author: "Robert C. Martin",
		tags: ["maintenance", "software-engineering"],
		tone: "insight",
	},
	{
		text: "Clean code is not written by following a set of rules. Craftsmanship comes from values and discipline.",
		author: "Robert C. Martin",
		tags: ["craftsmanship", "discipline"],
		tone: "insight",
	},
	{
		text: "It is not the language that makes programs appear simple. It is the programmer.",
		author: "Robert C. Martin",
		tags: ["programming", "simplicity"],
		tone: "insight",
	},
	{
		text: "Redundant comments are just places to collect lies and misinformation.",
		author: "Robert C. Martin",
		tags: ["comments", "clean-code"],
		tone: "insight",
	},
	{
		text: "There are two parts to learning craftsmanship: knowledge and work.",
		author: "Robert C. Martin",
		tags: ["learning", "craftsmanship"],
		tone: "insight",
	},
	{
		text: "Clarity is king.",
		author: "Robert C. Martin",
		tags: ["clarity", "professionalism"],
		tone: "insight",
	},
	{
		text: "Don't use a comment when you can use a function or a variable.",
		author: "Robert C. Martin",
		tags: ["comments", "refactoring"],
		tone: "insight",
	},
	{
		text: "Programmers must avoid leaving false clues that obscure the meaning of code.",
		author: "Robert C. Martin",
		tags: ["clarity", "code-smells"],
		tone: "insight",
	},
	{
		text: "The readability of your code has a profound effect on all changes that will ever be made.",
		author: "Robert C. Martin",
		tags: ["maintenance", "readability"],
		tone: "insight",
	},
	{
		text: "The proper use of comments is to compensate for our failure to express ourselves in code.",
		author: "Robert C. Martin",
		tags: ["comments", "clean-code"],
		tone: "insight",
	},
	{
		text: "The first rule of functions is that they should be small. The second rule is they should be smaller than that.",
		author: "Robert C. Martin",
		tags: ["functions", "clean-code"],
		tone: "insight",
	},
	{
		text: "When you see commented-out code, delete it.",
		author: "Robert C. Martin",
		tags: ["cleanup", "discipline"],
		tone: "insight",
	},
	{
		text: "Functions should do one thing. They should do it well. They should do it only.",
		author: "Robert C. Martin",
		tags: ["functions", "srp"],
		tone: "insight",
	},
	{
		text: "Duplication is the primary enemy of a well-designed system.",
		author: "Robert C. Martin",
		tags: ["design", "duplication"],
		tone: "insight",
	},
	{
		text: "Whatever else a TODO might be, it is not an excuse to leave bad code in the system.",
		author: "Robert C. Martin",
		tags: ["todo", "quality"],
		tone: "insight",
	},
	{
		text: "Building a project should be a single trivial operation.",
		author: "Robert C. Martin",
		tags: ["build", "automation"],
		tone: "insight",
	},
	{
		text: "Error handling is important, but if it obscures logic, it's wrong.",
		author: "Robert C. Martin",
		tags: ["error-handling", "clarity"],
		tone: "insight",
	},
	{
		text: "If we all checked in our code a little cleaner than when we checked it out, the code simply could not rot.",
		author: "Robert C. Martin",
		tags: ["boy-scout-rule", "quality"],
		tone: "insight",
	},
	{
		text: "It is unit tests that keep our code flexible, maintainable, and reusable.",
		author: "Robert C. Martin",
		tags: ["testing", "clean-code"],
		tone: "insight",
	},
	{
		text: "If names are too clever, they will only be memorable to people who remember the joke.",
		author: "Robert C. Martin",
		tags: ["naming", "clarity"],
		tone: "insight",
	},
	{
		text: "Code should clearly express the intent of its author.",
		author: "Robert C. Martin",
		tags: ["intent", "maintainability"],
		tone: "insight",
	},
	{
		text: "What makes a clean test? Readability, readability, and readability.",
		author: "Robert C. Martin",
		tags: ["testing", "readability"],
		tone: "insight",
	},
	{
		text: "A machine that turns coffee into code.",
		author: "Programming Proverb",
		tags: ["funny", "programming-life"],
		tone: "funny",
	},
	{
		text: "Computers are fast; programmers keep it slow.",
		author: "Anonymous",
		tags: ["funny", "engineering"],
		tone: "funny",
	},
	{
		text: "When I wrote this code, only God and I understood what I did. Now only God knows.",
		author: "Anonymous",
		tags: ["funny", "legacy-code"],
		tone: "funny",
	},
	{
		text: "It works, don't touch.",
		author: "Programmer Dad",
		tags: ["funny", "stability"],
		tone: "funny",
	},
	{
		text: "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
		author: "Classic Joke",
		tags: ["funny", "hardware"],
		tone: "funny",
	},
	{
		text: "Copy-and-paste was programmed by programmers for programmers.",
		author: "Anonymous",
		tags: ["funny", "workflow"],
		tone: "funny",
	},
	{
		text: "Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.",
		author: "John Woods",
		tags: ["funny", "maintainability"],
		tone: "funny",
	},
	{
		text: "Debugging is twice as hard as writing the code in the first place.",
		author: "Brian W. Kernighan",
		tags: ["debugging", "funny"],
		tone: "funny",
	},
	{
		text: "Algorithm: A word used by programmers when they don't want to explain what they did.",
		author: "Anonymous",
		tags: ["funny", "algorithms"],
		tone: "funny",
	},
	{
		text: "There are two ways to write error-free programs; only the third works.",
		author: "Alan J. Perlis",
		tags: ["funny", "programming"],
		tone: "funny",
	},
	{
		text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
		author: "Edsger W. Dijkstra",
		tags: ["funny", "debugging"],
		tone: "funny",
	},
	{
		text: "99 little bugs in the code. Take one down, patch it around, 127 little bugs in the code.",
		author: "Developer Folklore",
		tags: ["funny", "bugs"],
		tone: "funny",
	},
	{
		text: "Remember that there is no code faster than no code.",
		author: "Anonymous",
		tags: ["performance", "funny"],
		tone: "funny",
	},
	{
		text: "One man's crappy software is another man's full-time job.",
		author: "Jessica Gaston",
		tags: ["funny", "maintenance"],
		tone: "funny",
	},
	{
		text: "Deleted code is debugged code.",
		author: "Jeff Sickel",
		tags: ["funny", "refactoring"],
		tone: "funny",
	},
	{
		text: "It's not a bug, it's an undocumented feature.",
		author: "Developer Joke",
		tags: ["funny", "bugs"],
		tone: "funny",
	},
	{
		text: "It works on my machine.",
		author: "Every Team Ever",
		tags: ["funny", "deployment"],
		tone: "funny",
	},
	{
		text: "It compiles; ship it.",
		author: "Build Culture",
		tags: ["funny", "release"],
		tone: "funny",
	},
	{
		text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
		author: "Bill Gates",
		tags: ["funny", "metrics"],
		tone: "funny",
	},
	{
		text: "A program is never less than 90% complete and never more than 95% complete.",
		author: "Project Wisdom",
		tags: ["funny", "project-management"],
		tone: "funny",
	},
	{
		text: "I've finally learned what upward compatible means: we get to keep all our old mistakes.",
		author: "Dennie van Tassel",
		tags: ["funny", "compatibility"],
		tone: "funny",
	},
	{
		text: "Walking on water and developing software from a specification are easy if both are frozen.",
		author: "Edward V. Berard",
		tags: ["funny", "requirements"],
		tone: "funny",
	},
	{
		text: "There are only two kinds of programming languages: the ones people complain about and the ones no one uses.",
		author: "Bjarne Stroustrup",
		tags: ["funny", "languages"],
		tone: "funny",
	},
	{
		text: "Some people, when confronted with a problem, think: 'I know, I'll use regular expressions.' Now they have two problems.",
		author: "Jamie Zawinski",
		tags: ["funny", "regex"],
		tone: "funny",
	},
	{
		text: "A SQL query goes into a bar, walks up to two tables, and asks: 'Can I join you?'",
		author: "SQL Joke",
		tags: ["funny", "sql"],
		tone: "funny",
	},
	{
		text: "To understand recursion, you must first understand recursion.",
		author: "Programming Joke",
		tags: ["funny", "recursion"],
		tone: "funny",
	},
	{
		text: "The best thing about a boolean is that even if you are wrong, you are only off by a bit.",
		author: "Anonymous",
		tags: ["funny", "booleans"],
		tone: "funny",
	},
	{
		text: "There are 10 kinds of people in the world: those who know binary and those who don't.",
		author: "Classic Joke",
		tags: ["funny", "binary"],
		tone: "funny",
	},
	{
		text: "There are only two hard things in computer science: cache invalidation and naming things.",
		author: "Phil Karlton",
		tags: ["funny", "computer-science"],
		tone: "funny",
	},
	{
		text: "UNIX is simple. It just takes a genius to understand its simplicity.",
		author: "Dennis Ritchie",
		tags: ["funny", "unix"],
		tone: "funny",
	},
	{
		text: "UNIX is user friendly. It's just very particular about who its friends are.",
		author: "Anonymous",
		tags: ["funny", "unix"],
		tone: "funny",
	},
	{
		text: "There's no place like 127.0.0.1.",
		author: "Network Joke",
		tags: ["funny", "networking"],
		tone: "funny",
	},
	{
		text: "There is no Ctrl-Z in life.",
		author: "Life Advice",
		tags: ["funny", "general"],
		tone: "funny",
	},
	{
		text: "In theory, there ought to be no difference between theory and practice. In practice, there is.",
		author: "Yogi Berra",
		tags: ["funny", "engineering"],
		tone: "funny",
	},
	{
		text: "When all else fails... reboot.",
		author: "Ops Wisdom",
		tags: ["funny", "operations"],
		tone: "funny",
	},
	{
		text: "It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.",
		author: "Steve C. McConnell",
		tags: ["funny", "readability"],
		tone: "funny",
	},
	{
		text: "You never finish a program, you just stop working on it.",
		author: "Anonymous",
		tags: ["funny", "programming-life"],
		tone: "funny",
	},
	{
		text: "If the code doesn't bother you, don't bother it.",
		author: "Anonymous",
		tags: ["funny", "legacy-code"],
		tone: "funny",
	},
	{
		text: "That's the thing about people who think they hate computers. What they really hate is lousy programmers.",
		author: "Larry Niven",
		tags: ["funny", "programmers"],
		tone: "funny",
	},
	{
		text: "If you can read this, thank a software developer.",
		author: "Joseph M. Abou Nader",
		tags: ["funny", "developer"],
		tone: "funny",
	},
	{
		text: "Fast, good, cheap: pick any two.",
		author: "Engineering Proverb",
		tags: ["funny", "trade-offs"],
		tone: "funny",
	},
	{
		text: "Pasting code from the internet into production is like chewing gum found in the street.",
		author: "Mike Johnson",
		tags: ["funny", "code-quality"],
		tone: "funny",
	},
	{
		text: "Programmers are tools for converting caffeine into code.",
		author: "Anonymous",
		tags: ["funny", "coffee"],
		tone: "funny",
	},
	{
		text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
		author: "Christopher Thompson",
		tags: ["funny", "debugging"],
		tone: "funny",
	},
	{
		text: "I don't care if it works on your machine. We are not shipping your machine.",
		author: "Vidiu Platon",
		tags: ["funny", "deployment"],
		tone: "funny",
	},
	{
		text: "Treat your password like your toothbrush: don't share it, and replace it regularly.",
		author: "Clifford Stoll",
		tags: ["funny", "security"],
		tone: "funny",
	},
	{
		text: "Operating systems are like underwear - nobody really wants to look at them.",
		author: "Bill Joy",
		tags: ["funny", "os"],
		tone: "funny",
	},
	{
		text: "Commenting your code is like cleaning your bathroom: you never want to do it, but everyone benefits.",
		author: "Ryan Campbell",
		tags: ["funny", "comments"],
		tone: "funny",
	},
	{
		text: "Magic. Do not touch.",
		author: "Anonymous Commenter",
		tags: ["funny", "code-comments"],
		tone: "funny",
	},
	{
		text: "This code sucks, you know it and I know it. Move on and call me an idiot later.",
		author: "Anonymous Commenter",
		tags: ["funny", "code-comments"],
		tone: "funny",
	},
	{
		text: "Autogenerated, do not edit. All changes will be undone.",
		author: "Every Generated File",
		tags: ["funny", "codegen"],
		tone: "funny",
	},
	{
		text: "Please work.",
		author: "Every Developer",
		tags: ["funny", "debugging"],
		tone: "funny",
	},
	{
		text: "This was clearly written under duress.",
		author: "Anonymous Commenter",
		tags: ["funny", "legacy-code"],
		tone: "funny",
	},
];

const funNouns = [
	"compiler",
	"linter",
	"debugger",
	"rubber duck",
	"build server",
	"merge conflict",
	"unit test",
	"stack trace",
	"code reviewer",
	"production log",
];

const funVerbs = [
	"whispers",
	"screams",
	"politely requests",
	"rage-quits",
	"silently judges",
	"speed-runs",
	"refactors",
	"panic-commits",
	"autocorrects",
	"time-travels through",
];

const funObjects = [
	"your TODO list",
	"Friday deploys",
	"that one legacy function",
	"the mysterious null pointer",
	"the CSS cascade",
	"your hotfix plan",
	"the demo environment",
	"the broken migration",
	"the staging database",
	"Monday morning standup",
];

const randomFrom = <T,>(items: readonly T[]): T =>
	items[Math.floor(Math.random() * items.length)];

const generateFunnyQuote = (): QuoteItem => ({
	text: `When your ${randomFrom(funNouns)} ${randomFrom(funVerbs)} at ${randomFrom(funObjects)}, it's probably time for coffee and smaller functions.`,
	author: "Surya Quote Bot",
	tags: ["funny", "generated", "programming"],
	tone: "funny",
	isGenerated: true,
});

const pickRandomQuote = (pool: readonly QuoteItem[], lastQuoteText: string | null): QuoteItem => {
	if (pool.length === 0) {
		return {
			text: "Write code that your future self will thank you for.",
			author: "Surya Quote Bot",
			tags: ["fallback", "clean-code"],
			tone: "insight",
		};
	}

	let selected = randomFrom(pool);
	if (pool.length === 1 || !lastQuoteText) {
		return selected;
	}

	for (let attempts = 0; attempts < 8 && selected.text === lastQuoteText; attempts += 1) {
		selected = randomFrom(pool);
	}

	return selected;
};

export const getRandomQuoteForReload = (): QuoteItem => {
	const pool = [...QUOTE_LIBRARY, generateFunnyQuote(), generateFunnyQuote()];

	if (typeof window === "undefined") {
		return pool[0];
	}

	let lastQuoteText: string | null = null;
	try {
		lastQuoteText = window.sessionStorage.getItem(QUOTE_SESSION_KEY);
	} catch {
		lastQuoteText = null;
	}

	const nextQuote = pickRandomQuote(pool, lastQuoteText);

	try {
		window.sessionStorage.setItem(QUOTE_SESSION_KEY, nextQuote.text);
	} catch {
		// Ignore storage issues in restricted contexts.
	}

	return nextQuote;
};
