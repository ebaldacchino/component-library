import { spawn, type SpawnOptions } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

function runCommand(command: string, args: string[], cwd: string): void {
	const options: SpawnOptions = { cwd };
	const child = spawn(command, args, options);
	if (!child.stdout || !child.stderr) {
		throw Error("child properties are null");
	}
	child.stdout.on("data", (data: Buffer) => {
		console.log(`stdout: ${data.toString()}`);
	});
	child.stderr.on("data", (data: Buffer) => {
		console.error(`stderr: ${data.toString()}`);
	});
	child.on("close", (code: number) => {
		console.log(`child process exited with code ${code}`);
	});
	child.on("error", (err: Error) => {
		console.error(`Failed to start process: ${err}`);
	});
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PNPM_PATH = "C:\\Users\\edwar\\AppData\\Local\\pnpm\\pnpm.cmd";

runCommand(PNPM_PATH, ["run", "dev:base"], __dirname);
runCommand(PNPM_PATH, ["run", "dev:styled"], __dirname);
runCommand(PNPM_PATH, ["run", "storybook"], __dirname);
