import React, { useState } from "react";
import { styles } from "./styles";
import stylex from "@stylexjs/stylex";
import { util_styles } from "@src/utils/styles";
import CustomSelect from "@src/components/commons/select";

export default function Settings() {
	const shikiThemes = [
		{ value: "Andromeeda", label: "andromeeda" },
		{ value: "Aurora X", label: "aurora-x" },
		{ value: "Ayu Dark", label: "ayu-dark" },
		{ value: "Catppuccin Frappé", label: "catppuccin-frappe" },
		{ value: "Catppuccin Latte", label: "catppuccin-latte" },
		{ value: "Catppuccin Macchiato", label: "catppuccin-macchiato" },
		{ value: "Catppuccin Mocha", label: "catppuccin-mocha" },
		{ value: "Dark Plus", label: "dark-plus" },
		{ value: "Dracula", label: "dracula" },
		{ value: "Dracula Soft", label: "dracula-soft" },
		{ value: "GitHub Dark", label: "github-dark" },
		{ value: "GitHub Dark Default", label: "github-dark-default" },
		{ value: "GitHub Dark Dimmed", label: "github-dark-dimmed" },
		{ value: "GitHub Light", label: "github-light" },
		{ value: "GitHub Light Default", label: "github-light-default" },
		{ value: "Houston", label: "houston" },
		{ value: "LaserWave", label: "laserwave" },
		{ value: "Light Plus", label: "light-plus" },
		{ value: "Material Theme", label: "material-theme" },
		{ value: "Material Theme Darker", label: "material-theme-darker" },
		{ value: "Material Theme Lighter", label: "material-theme-lighter" },
		{ value: "Material Theme Ocean", label: "material-theme-ocean" },
		{ value: "Material Theme Palenight", label: "material-theme-palenight" },
		{ value: "Min Dark", label: "min-dark" },
		{ value: "Min Light", label: "min-light" },
		{ value: "Monokai", label: "monokai" },
		{ value: "Night Owl", label: "night-owl" },
		{ value: "Nord", label: "nord" },
		{ value: "One Dark Pro", label: "one-dark-pro" },
		{ value: "One Light", label: "one-light" },
		{ value: "Poimandres", label: "poimandres" },
		{ value: "Red", label: "red" },
		{ value: "Rosé Pine", label: "rose-pine" },
		{ value: "Rosé Pine Dawn", label: "rose-pine-dawn" },
		{ value: "Rosé Pine Moon", label: "rose-pine-moon" },
		{ value: "Slack Dark", label: "slack-dark" },
		{ value: "Slack Ochin", label: "slack-ochin" },
		{ value: "Snazzy Light", label: "snazzy-light" },
		{ value: "Solarized Dark", label: "solarized-dark" },
		{ value: "Solarized Light", label: "solarized-light" },
		{ value: "Synthwave '84", label: "synthwave-84" },
		{ value: "Tokyo Night", label: "tokyo-night" },
		{ value: "Vesper", label: "vesper" },
		{ value: "Vitesse Black", label: "vitesse-black" },
		{ value: "Vitesse Dark", label: "vitesse-dark" },
		{ value: "Vitesse Light", label: "vitesse-light" },
	];

	const monacoThemes = [
		{ value: "Andromeeda", label: "andromeeda" },
		{ value: "Aurora X", label: "aurora-x" },
		{ value: "Ayu Dark", label: "ayu-dark" },
		{ value: "Catppuccin Frappé", label: "catppuccin-frappe" },
		{ value: "Catppuccin Latte", label: "catppuccin-latte" },
		{ value: "Catppuccin Macchiato", label: "catppuccin-macchiato" },
		{ value: "Catppuccin Mocha", label: "catppuccin-mocha" },
		{ value: "Dark Plus", label: "dark-plus" },
		{ value: "Dracula", label: "dracula" },
		{ value: "Dracula Soft", label: "dracula-soft" },
		{ value: "GitHub Dark", label: "github-dark" },
		{ value: "GitHub Dark Default", label: "github-dark-default" },
		{ value: "GitHub Dark Dimmed", label: "github-dark-dimmed" },
		{ value: "GitHub Light", label: "github-light" },
		{ value: "GitHub Light Default", label: "github-light-default" },
		{ value: "Houston", label: "houston" },
		{ value: "LaserWave", label: "laserwave" },
		{ value: "Light Plus", label: "light-plus" },
		{ value: "Material Theme", label: "material-theme" },
		{ value: "Material Theme Darker", label: "material-theme-darker" },
		{ value: "Material Theme Lighter", label: "material-theme-lighter" },
		{ value: "Material Theme Ocean", label: "material-theme-ocean" },
		{ value: "Material Theme Palenight", label: "material-theme-palenight" },
		{ value: "Min Dark", label: "min-dark" },
		{ value: "Min Light", label: "min-light" },
		{ value: "Monokai", label: "monokai" },
		{ value: "Night Owl", label: "night-owl" },
		{ value: "Nord", label: "nord" },
		{ value: "One Dark Pro", label: "one-dark-pro" },
		{ value: "One Light", label: "one-light" },
		{ value: "Poimandres", label: "poimandres" },
		{ value: "Red", label: "red" },
		{ value: "Rosé Pine", label: "rose-pine" },
		{ value: "Rosé Pine Dawn", label: "rose-pine-dawn" },
		{ value: "Rosé Pine Moon", label: "rose-pine-moon" },
		{ value: "Slack Dark", label: "slack-dark" },
		{ value: "Slack Ochin", label: "slack-ochin" },
		{ value: "Snazzy Light", label: "snazzy-light" },
		{ value: "Solarized Dark", label: "solarized-dark" },
		{ value: "Solarized Light", label: "solarized-light" },
		{ value: "Synthwave '84", label: "synthwave-84" },
		{ value: "Tokyo Night", label: "tokyo-night" },
		{ value: "Vesper", label: "vesper" },
		{ value: "Vitesse Black", label: "vitesse-black" },
		{ value: "Vitesse Dark", label: "vitesse-dark" },
		{ value: "Vitesse Light", label: "vitesse-light" },
	];

	const [shikiTheme, setShikiTheme] = useState(shikiThemes[0]);
	const [monacoTheme, setMonacoTheme] = useState(monacoThemes[0]);
	return (
		<div {...stylex.props(styles.wrapper)}>
			<h1 {...stylex.props(styles.title)}>Settings</h1>
			<div
				{...stylex.props(util_styles.display_block_base, styles.settingsBlock)}
			>
				<div {...stylex.props(styles.labelSetting)}>
					<p>Shiki Editor Theme</p>
					<CustomSelect
						options={shikiThemes}
						onChange={setShikiTheme}
						value={shikiTheme}
					/>
				</div>

				<div {...stylex.props(styles.labelSetting)}>
					<p>Monaco Editor Theme</p>
					<CustomSelect
						options={monacoThemes}
						onChange={setMonacoTheme}
						value={monacoTheme}
					/>
				</div>
			</div>
		</div>
	);
}
