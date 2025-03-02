import stylex from "@stylexjs/stylex";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import FooterHelp from "../footer_help";
import ToolbarHelp from "../toolbar_help";
import AlarmSound from "../../assets/sounds/electronic-alarm-clock-151927.mp3";
import DeleteIcon from "../../assets/close-x.svg";
// import { Checkbox } from "@controlkit/ui";
import Input from "@src/components/commons/input";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import { Slider } from "@src/components/commons/range";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: {
			default: "column",
			"@media (min-width: 1200px)": "row",
		},
		height: "100%",
		width: "100%",
		gap: "1rem",
	},

	innerWrapper: {
		display: "flex",
		flexDirection: "column",
		border: "1px solid var(--color-border)",
		padding: "1rem",
		width: "100%",
		height: "100%",
		minHeight: "26rem",
		boxSizing: "border-box",
		borderRadius: "0.25rem",
		gap: "2rem",
		transition: "background-color 1s ease-in-out",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",

		marginVertical: "auto",
	},
	footerWrapper: {
		display: "flex",
		flexDirection: "column",
		padding: "1rem",
	},

	button: {
		width: "fit-content",
	},

	buttonsWrapper: {
		display: "flex",
		gap: "1rem",
		width: "100%",
	},

	timer: {
		fontSize: "6rem",
		lineHeight: "1",
		padding: "0",
		margin: "0",
	},

	workMode: {
		fontSize: "4rem",

		padding: "0",
		margin: "0",
		lineHeight: "1",
	},

	working: {
		backgroundColor: "#123e12",
	},

	break: {
		backgroundColor: "#0b79b4",
	},

	task: {
		display: "flex",
		alignItems: "center",
		padding: "0.25rem 0.5rem",
		boxSizing: "border-box",
		borderRadius: "0.25rem",
		border: "1px solid var(--color-border)",
		width: "100%",
		backgroundColor: "var(--color-bg)",
	},

	toolbarHelp: {
		display: "flex",
		flexDirection: "column",
		padding: "1rem 0.75rem",
		boxSizing: "border-box",
		gap: "2rem",
	},

	deleteButton: {
		backgroundColor: "transparent",
		outline: "unset",
		border: "unset",
		borderRadius: "0.25rem",
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		color: "var(--color-icon)",
	},

	taskName: {
		flexGrow: 1,
		boxSizing: "border-box",
		textOverflow: "ellipsis",
		overflow: "hidden",
		padding: "0rem 0.5rem",
		maxWidth: "100%",
	},

	tasksList: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		overflow: "auto",
		maxHeight: "15rem",
	},
	taskDone: {
		opacity: "0.5",
	},
	tasksControl: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		marginTop: "1rem",
	},
	deleteIcon: {
		color: "var(--color-icon)",
	},

	textReset: {
		padding: 0,
		margin: 0,
	},

	pomodoroControls: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},

	input: {
		boxSizing: "border-box",
		padding: "0.25rem 0.5rem",
		backgroundColor: "var(--color-bg)",
		outline: "none",
		border: "1px solid var(--color-border)",
		borderRadius: "0.25rem",
		color: "var(--color-text)",
	},

	controls: {
		display: "flex",
		flexDirection: "column",
		flexShrink: "3",
		gap: "2rem",
		height: "100%",
		maxWidth: {
			default: "100%",
			"@media (min-width: 1200px)": "20rem",
		},
	},

	sessionDisplay: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
	},

	alarmVolume: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},

	labelInput: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},
});

interface Task {
	id: string;
	name: string;
}

interface I_TaskProps {
	name: string;
	onDelete: any;
}

const Task = ({ name, onDelete }: I_TaskProps) => {
	const [isDone, setIsDone] = useState(false);

	return (
		<div {...stylex.props(styles.task, isDone && styles.taskDone)}>
			<p {...stylex.props(styles.taskName)}>{name}</p>
			{/* <Checkbox
				size="SMALL"
				isChecked={isDone}
				onClick={() => setIsDone(!isDone)}
			/> */}
			<button
				{...stylex.props(styles.deleteButton)}
				onClick={() => onDelete(name)}
			>
				<img
					height="16"
					width="16"
					src={DeleteIcon}
					{...stylex.props(styles.deleteIcon)}
				/>
			</button>
		</div>
	);
};
export default function PomodoroTimer() {
	//TODO Redo Task with proper id's so im not deleting based on string name (could be same names)
	const [sessionLength, setSessionLength] = useState<number>(25 * 60); // 25 minutes in seconds
	const [breakLength, setBreakLength] = useState<number>(5 * 60); // 5 minutes in seconds
	const [timeLeft, setTimeLeft] = useState(sessionLength);
	const [isPaused, setIsPaused] = useState(true);
	const [volume, setVolume] = useState(25);
	const [mode, setMode] = useState<"Work" | "Break">("Work");
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskName, setNewTaskName] = useState("");
	const startTimer = () => {
		setIsPaused(false);
	};

	const pauseTimer = () => {
		setIsPaused(true);
	};

	useEffect(() => {
		if (!isPaused && timeLeft > 0) {
			const timerId = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);

			return () => clearInterval(timerId);
		}

		if (timeLeft === 0) {
			const audio = new Audio(AlarmSound);
			audio.volume = volume / 100;
			audio.play();

			resetTimer();
		}
	}, [isPaused, timeLeft, volume]);

	const resetTimer = () => {
		setTimeLeft(mode === "Work" ? breakLength : sessionLength);
		setMode(mode === "Work" ? "Break" : "Work");
		setIsPaused(true);
	};

	function handleDelete(id: string) {
		const newTasks = tasks.filter((task) => task.id !== id);
		setTasks(newTasks);
	}

	function handleNewTask() {
		const newTask: Task = {
			id: newTaskName,
			name: newTaskName,
		};
		setTasks([...tasks, newTask]);
		setNewTaskName("");
	}

	function freshReset() {
		setTimeLeft(sessionLength);
		setMode("Work");
		setIsPaused(true);
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(util_styles.display_block_base, styles.controls)}>
				<div {...stylex.props(styles.pomodoroControls)}>
					<h2>Controls</h2>

					<div {...stylex.props(styles.labelInput)}>
						<label>Session Minutes</label>
						<Input
							value={sessionLength / 60}
							type="number"
							onChange={(e) => setSessionLength(Number(e.target.value) * 60)}
						/>
					</div>

					<div {...stylex.props(styles.labelInput)}>
						<label>Break Minutes</label>
						<Input
							value={breakLength / 60}
							type="number"
							onChange={(e) => setBreakLength(Number(e.target.value) * 60)}
						/>
					</div>

					<div {...stylex.props(styles.buttonsWrapper)}>
						<button onClick={startTimer} {...stylex.props(util_styles.button)}>
							Start
						</button>
						<button onClick={pauseTimer} {...stylex.props(util_styles.button)}>
							Pause
						</button>
						<button onClick={resetTimer} {...stylex.props(util_styles.button)}>
							Next
						</button>

						<button onClick={freshReset} {...stylex.props(util_styles.button)}>
							Reset
						</button>
					</div>
					<div {...stylex.props(styles.alarmVolume)}>
						<label>Alarm volume: {volume}</label>
						<Slider
							defaultValue={[volume]}
							onValueChange={(e) => {
								setVolume(e[0]);
							}}
							min={0}
							max={100}
							step={1}
						/>
					</div>
				</div>

				<div {...stylex.props(styles.tasksControl)}>
					<h2>Tasks</h2>
					<Input
						placeholder="New Task"
						value={newTaskName}
						onChange={(e) => setNewTaskName(e.target.value)}
					/>
					<button
						{...stylex.props(util_styles.button, styles.button)}
						onClick={() => handleNewTask()}
					>
						Add Task
					</button>
				</div>

				<div {...stylex.props(styles.tasksList)}>
					{tasks.map((task, index) => {
						return (
							<Task name={task.name} key={index} onDelete={handleDelete} />
						);
					})}
				</div>
			</div>
			<div
				{...stylex.props(util_styles.display_block_base, styles.sessionDisplay)}
			>
				<div
					{...stylex.props(
						styles.innerWrapper,
						mode === "Work" ? styles.working : styles.break,
					)}
				>
					<h2 {...stylex.props(styles.workMode)}>{mode} Session</h2>
					<h1 {...stylex.props(styles.timer)}>
						{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
					</h1>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Pomodoro Technique?</h2>
						<p>
							The Pomodoro Technique is created by Francesco Cirillo for a more
							productive way to work and study. The technique uses a timer to
							break down work into intervals, traditionally 25 minutes in
							length, separated by short breaks. Each interval is known as a
							pomodoro, from the Italian word for 'tomato', after the
							tomato-shaped kitchen timer that Cirillo used as a university
							student.
						</p>

						<br />
						<h2>How to use the Pomodoro Timer?</h2>
						<ol>
							<li>Add tasks to work on today</li>
							<li>Set estimate pomodoros (1 = 25min of work) for each tasks</li>
							<li>Select a task to work on</li>
							<li>Start timer and focus on the task for 25 minutes</li>
							<li>Take a break for 5 minutes when the alarm ring</li>
							<li>Iterate 3-5 until you finish the tasks</li>
						</ol>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<div {...stylex.props(styles.toolbarHelp)}>
					<div {...stylex.props(styles.pomodoroControls)}>
						<h2 {...stylex.props(styles.textReset)}>Pomodoro Timer</h2>
						<div {...stylex.props(styles.buttonsWrapper)}>
							<button onClick={startTimer} {...stylex.props(styles.button)}>
								Start
							</button>
							<button onClick={pauseTimer} {...stylex.props(styles.button)}>
								Pause
							</button>
							<button onClick={resetTimer} {...stylex.props(styles.button)}>
								Next
							</button>

							<button onClick={resetTimer} {...stylex.props(styles.button)}>
								Next
							</button>
						</div>
					</div>

					<div {...stylex.props(styles.tasksControl)}>
						<h2 {...stylex.props(styles.textReset)}>Tasks</h2>
						<Input
							placeholder="New Task"
							value={newTaskName}
							onChange={(e) => setNewTaskName(e.target.value)}
						/>
						<button
							{...stylex.props(styles.button)}
							onClick={() => handleNewTask()}
						>
							Add Task
						</button>
					</div>

					<div {...stylex.props(styles.tasksList)}>
						{tasks.map((task, index) => {
							return (
								<Task name={task.name} key={index} onDelete={handleDelete} />
							);
						})}
					</div>
				</div>
			</ToolbarHelp>
		</div>
	);
}
