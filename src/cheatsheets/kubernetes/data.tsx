interface Item {
	title: string;
	cmd: string;
}

interface Data {
	title: string;
	items: Item[];
}

export const viewingAndFindingResources: Data = {
	title: "Viewing and finding resources",
	items: [
		{
			title: "Nodes",
			cmd: `kubectl get no # Display all node information
kubectl get no -o wide # Show more information about all nodes
kubectl describe no # Display node details
kubectl get no -o yaml # Display node details in yaml format
kubectl get node --selector=[label_name] # Filter the node with the specified label
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type="ExternalIP")].address}'
# Output the field information defined by the jsonpath expression
kubectl top node [node_name] # Display node (CPU/memory/storage) usage

Resource name: nodes, abbreviation: no
`,
		},

		{
			title: "Pods",
			cmd: `kubectl get po # Display all container group information
kubectl get po -o wide
kubectl describe po
kubectl get po --show-labels # View the labels of the container group
kubectl get po -l app=nginx
kubectl get po -o yaml
kubectl get pod [pod_name] -o yaml --export
kubectl get pod [pod_name] -o yaml --export > nameoffile.yaml
# Export container group information to yaml file in yaml format
kubectl get pods --field-selector status.phase=Running
# Use the field selector to filter out container group information

Resource name: nodes, abbreviation: no
`,
		},

		{
			title: "Namespaces",
			cmd: `kubectl get ns
kubectl get ns -o yaml
kubectl describe ns

Resource name: namespaces, abbreviation: ns
`,
		},

		{
			title: "Deployments",
			cmd: `kubectl get deploy
kubectl describe deploy
kubectl get deploy -o wide
kubectl get deploy -o yaml

Resource name: deployments, abbreviation: deploy
`,
		},

		{
			title: "Services",
			cmd: `kubectl get svc
kubectl describe svc
kubectl get svc -o wide
kubectl get svc -o yaml
kubectl get svc --show-labels

Resource name: services, abbreviation: svc
`,
		},

		{
			title: "Daemon Sets",
			cmd: `kubectl get ds
kubectl describe ds --all-namespaces
kubectl describe ds [daemonset_name] -n [namespace_name]
kubectl get ds [ds_name] -n [ns_name] -o yaml

Resource name: daemonsets, abbreviation: ds
`,
		},

		{
			title: "Events",
			cmd: `kubectl get events
kubectl get events -n kube-system
kubectl get events -w

Resource name: events, abbreviation: ev
`,
		},

		{
			title: "Logs",
			cmd: `kubectl logs [pod_name]
kubectl logs --since=1h [pod_name]
kubectl logs --tail=20 [pod_name]
kubectl logs -f -c [container_name] [pod_name]
kubectl logs [pod_name] > pod.log
`,
		},

		{
			title: "Service Accounts",
			cmd: `kubectl get sa
kubectl get sa -o yaml
kubectl get serviceaccounts default -o yaml >./sa.yaml
kubectl replace serviceaccount default -f ./sa.yaml

Resource name: serviceaccounts, abbreviation: ev
`,
		},

		{
			title: "Replica Sets",
			cmd: `kubectl get rs
kubectl describe rs
kubectl get rs -o wide
kubectl get rs -o yaml

Resource name: replicasets, abbreviation: rs
`,
		},

		{
			title: "Roles",
			cmd: `kubectl get roles --all-namespaces
kubectl get roles --all-namespaces -o yaml
`,
		},

		{
			title: "Secrets",
			cmd: `kubectl get secrets
kubectl get secrets --all-namespaces
kubectl get secrets -o yaml
`,
		},

		{
			title: "Config maps",
			cmd: `kubectl get cm
kubectl get cm --all-namespaces
kubectl get cm --all-namespaces -o yaml

Resource name: configmaps, abbreviation: cm
`,
		},

		{
			title: "Ingresses",
			cmd: `kubectl get ing
kubectl get ing --all-namespaces

Resource name: ingresses, abbreviation: ing
`,
		},

		{
			title: "Persistent volumes",
			cmd: `kubectl get pv
kubectl describe pv

Resource name: persistentvolumes, abbreviation: pv
`,
		},

		{
			title: "Persistent volume declaration",
			cmd: `kubectl get pvc
kubectl describe pvc

Resource name: persistentvolumeclaims, abbreviation: pvc
`,
		},

		{
			title: "Storage class",
			cmd: `kubectl get sc
kubectl get sc -o yaml

Resource name: storageclasses, Abbreviation: sc
`,
		},

		{
			title: "Multiple resources",
			cmd: `kubectl get svc, po
kubectl get deploy, no
kubectl get all
kubectl get all --all-namespaces
`,
		},
	],
};

export const updatingResources: Data = {
	title: "Updating resources",
	items: [
		{
			title: "Taint",
			cmd: `kubectl taint [node_name] [taint_name]
`,
		},

		{
			title: "Label",
			cmd: `kubectl label [node_name] disktype=ssd
kubectl label [pod_name] env=prod`,
		},

		{
			title: "Maintain/Schedulable",
			cmd: `kubectl cordon [node_name] # node maintenance
kubectl uncordon [node_name] # node is schedulable
`,
		},

		{
			title: "Clear",
			cmd: `kubectl drain [node_name] # empty the node

`,
		},

		{
			title: "Node/Pod",
			cmd: `kubectl delete node [node_name]
kubectl delete pod [pod_name]
kubectl edit node [node_name]
kubectl edit pod [pod_name]`,
		},

		{
			title: "Stateless/Namespaced",
			cmd: `kubectl edit deploy [deploy_name]
kubectl delete deploy [deploy_name]
kubectl expose deploy [deploy_name] --port=80 --type=NodePort
kubectl scale deploy [deploy_name] --replicas=5
kubectl delete ns
kubectl edit ns [ns_name]
`,
		},

		{
			title: "Daemon set",
			cmd: `kubectl edit ds [ds_name] -n kube-system
kubectl delete ds [ds_name]`,
		},

		{
			title: "Service account",
			cmd: `kubectl edit sa [sa_name]
kubectl delete sa [sa_name]
`,
		},

		{
			title: "Notes",
			cmd: `kubectl annotate po [pod_name] [annotation]
kubectl annotateno [node_name]
`,
		},
	],
};

export const creatingResources: Data = {
	title: "Creating resources",
	items: [
		{
			title: "Create pod",
			cmd: `kubectl create -f [name_of_file]
kubectl apply -f [name_of_file]
kubectl run [pod_name] --image=nginx --restart=Never
kubectl run [pod_name] --generator=run-pod/v1 --image=nginx
kubectl run [pod_name] --image=nginx --restart=Never
`,
		},

		{
			title: "Create service",
			cmd: `kubectl create svc nodeport [svc_name] --tcp=8080:80
`,
		},

		{
			title: "Create a stateless application",
			cmd: `kubectl create -f [name_of_file] 
kubectl apply -f [name_of_file]
kubectl create deploy [deploy_name] --image=nginx
`,
		},

		{
			title: "Interaction",
			cmd: `kubectl run [pod_name] --image=busybox --rm -it --restart=Never --sh
`,
		},

		{
			title: "Output YAML",
			cmd: `kubectl create deploy [deploy_name] --image=nginx --dry-run -o yaml > deploy.yaml
kubectl get po [pod_name] -o yaml --export > pod.yaml
`,
		},

		{
			title: "Help",
			cmd: `kubectl -h
kubectl create -h
kubectl run -h
kubectl explain deploy.spec
`,
		},
	],
};

export const misc: Data = {
	title: "Misc",
	items: [
		{
			title: "APIs",
			cmd: `kubectl get --raw /apis/metrics.k8s.io/
`,
		},

		{
			title: "Information",
			cmd: `kubectl config
kubectl cluster-info
kubectl get componentstatus
`,
		},
	],
};
