import React from "react";
import { GroupBlock } from "../commons";
import common_styles from "../common_styles";
import stylex from "@stylexjs/stylex";
import {
	components,
	conditionalRendering,
	jsx,
	renderingLists,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "./data";

export default function CheatSheetReact() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				<GroupBlock data={components} lang="jsx" />
				<GroupBlock data={jsx} lang="jsx" />
				<GroupBlock data={useState} lang="jsx" />
				<GroupBlock data={useEffect} lang="jsx" />
				<GroupBlock data={useContext} lang="jsx" />
				<GroupBlock data={useReducer} lang="jsx" />
				<GroupBlock data={useCallback} lang="jsx" />
				<GroupBlock data={useMemo} lang="jsx" />
				<GroupBlock data={useRef} lang="jsx" />
				<GroupBlock data={renderingLists} lang="jsx" />
				<GroupBlock data={conditionalRendering} lang="jsx" />
			</div>
		</div>
	);
}
