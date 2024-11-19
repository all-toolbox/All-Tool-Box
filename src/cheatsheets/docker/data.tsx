import type { Data } from "../commons";

export const basicCommandsData: Data = {
	title: "Basic Commands",
	items: [
		{
			title: "Run a container in interactive mode",
			cmd: "docker run -it <image_name>",
		},
		{
			title: "List running containers",
			cmd: "docker ps",
		},
		{
			title: "List all containers (including stopped ones)",
			cmd: "docker ps -a",
		},
		{
			title: "Pull an image from Docker Hub",
			cmd: "docker pull <image_name>",
		},
		{
			title: "Build an image from a Dockerfile",
			cmd: "docker build -t <image_name> .",
		},
	],
};

export const containerLifecycleData: Data = {
	title: "Container Lifecycle",
	items: [
		{
			title: "Start a stopped container",
			cmd: "docker start <container_id>",
		},
		{
			title: "Stop a running container",
			cmd: "docker stop <container_id>",
		},
		{
			title: "Restart a container",
			cmd: "docker restart <container_id>",
		},
		{
			title: "Remove a stopped container",
			cmd: "docker rm <container_id>",
		},
		{
			title: "Remove a running container (force)",
			cmd: "docker rm -f <container_id>",
		},
	],
};

export const imageManagementData: Data = {
	title: "Image Management",
	items: [
		{
			title: "List downloaded images",
			cmd: "docker images",
		},
		{
			title: "Remove an image",
			cmd: "docker rmi <image_id>",
		},
		{
			title: "Remove all unused images",
			cmd: "docker image prune",
		},
		{
			title: "Tag an image",
			cmd: "docker tag <source_image> <target_image>:<tag>",
		},
		{
			title: "Push an image to Docker Hub",
			cmd: "docker push <image_name>",
		},
	],
};

export const networkCommandsData: Data = {
	title: "Networking",
	items: [
		{
			title: "List networks",
			cmd: "docker network ls",
		},
		{
			title: "Inspect a network",
			cmd: "docker network inspect <network_name>",
		},
		{
			title: "Create a network",
			cmd: "docker network create <network_name>",
		},
		{
			title: "Connect a container to a network",
			cmd: "docker network connect <network_name> <container_id>",
		},
		{
			title: "Disconnect a container from a network",
			cmd: "docker network disconnect <network_name> <container_id>",
		},
	],
};
