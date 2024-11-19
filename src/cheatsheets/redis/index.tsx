import common_styles from "../common_styles";
import { GroupBlock } from "../commons";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	base: {
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
	},

	innerFlex: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: "1rem",
	},
});

const GettingStarted = {
	title: "Getting Started",
	items: [
		{
			title: "Start Redis",
			cmd: "$ redis-server",
		},

		{
			title: "Connect to redis (Redis CLI client)",
			cmd: "$ redis-cli",
		},

		{
			title: "Connect to redis (telnet)",
			cmd: "$ telnet 127.0.0.1 6379",
		},

		{
			title: "Ping",
			cmd: "redis> PING\nPONG",
		},

		{
			title: "Set/Get Key",
			cmd: "redis> SET mykey \"Hello world\"\nOK\nredis> GET mykey\n\"Hello world\"",
		},
	],
};

const Generics = {
	title: "Generic Commands",
	items: [
		{
			title: "Delete a key",
			cmd: "redis> SET key1 \"Hello\"\n\"OK\"\nredis> SET key2 \"World\"\n\"OK\"\nredis> DEL key1 key2 key3\n(integer) 2",
		},

		{
			title: "Check if key exists",
			cmd: "redis> SET key1 \"Hello\"\n\"OK\"\nredis> SET key2 \"World\"\n\"OK\"\nredis> EXISTS key1\n(integer) 1\nredis> EXISTS nosuchkey\n(integer) 0",
		},

		{
			title: "Set a key's time to live in seconds",
			cmd: "redis> SET key1 \"Hello\"\n\"OK\"redis> EXPIRE mkey 10\n(integer) 1\nredis> TTL mkey\n(integer) 10",
		},

		{
			title: "Find all keys matching the given pattern",
			cmd: "redis> MSET firstname Jack lastname Stuntman age 35\n\"OK\"\nredis> KEYS *name*\n1) \"firstname\"\n2) \"lastname\"\nredis> KEYS a??\n1) \"age\"\nredis> KEYS *\n1) \"firstname\"\n2) \"age\"\n3) \"lastname\"",
		},

		{
			title: "Remove the expiration from a key",
			cmd: "redis> SET key1 \"Hello\"\n\"OK\"redis> EXPIRE mkey 10\n(integer) 1\nredis> TTL mkey\n(integer) 10\nredis> PERSIST mykey\n(integer) 1\nredis> TIL mkey\n(integer) -1",
		},

		{
			title: "Determine the type stored at key",
			cmd: "redis> SET key1 \"value\"\n\"OK\"\nredis> LPUSH key2 \"value\"\n(integer) 1\nredis> SADD key3 \"value\"\n(integer) 1\nredis> TYPE key1\n\"string\"\nredis> TYPE key2\n\"list\"\nredis> TYPE key3\n\"set\"",
		},
	],
};

const StringCmd = {
	title: "String/Number Commands",
	items: [
		{
			title: "Exists/Append",
			cmd: "redis> EXISTS mykey\n(integer) 0\nredis> APPEND mykey \"Hello\"\n(integer) 5\nredis> APPEND mykey \" World\"\n(integer) 11\nredis> GET mykey\n\"Hello World\"",
		},

		{
			title: "Decrement",
			cmd: "redis> SET mykey \"10\"\n\"OK\"\nredis> DECR mkey\n(integer) 9\nredis> DECR mkey\nERR ERR value is not an integer or out of range",
		},

		{
			title: "Decrement By",
			cmd: "redis> SET mykey \"10\"\n\"OK\"redis> DECRBY mkey 3\n(integer) 7",
		},

		{
			title: "Increment",
			cmd: "redis> SET mykey \"10\"\nINCR mkykey\n(integer) 11\nredis> GET mykey\n\"11\"",
		},

		{
			title:	"Increment by",
			cmd: "redis> SET mykey \"10\"\nINCRBY mkykey 5\n(integer) 15\n",
		},

		{
			title: "Increment by Float",
			cmd: "redis> SET mykey 10.50\n\"OK\"\nredis> INCRBYFLOAT mykey 0.1\n\"10.6\"\nredis> INCRBYFLOAT mykey -5\n\"5.6\"\nredis> SET mykey 5.0e3\n\"OK\"\nredis> INCRBYFLOAT mykey 2.0e2\n\"5200\"\n",
		},
	],
};

const Sets = {
	title: "Sets Commands",
	items: [
		{
			title: "Add member to Set",
			cmd: "redis> SADD myset \"Hello\"\n(integer) 1\nredis> SADD myset \"World\"\n(integer) 1\nredis> SMEMBERS myset\n1) \"Hello\"\n2) \"World\"",
		},
		{
			title: "Get the number of memebers in a set",
			cmd: "redis> SADD myset \"Hello\"\n(integer) 1\nredis> SADD myset \"World\"\n(integer) 1\nredis> SCARD myset\n(integer) 2",
		},
		{
			title: "Check if given value is in a set",
			cmd: "redis> SADD myset \"one\"\n(integer) 1\nredis> SADD myset \"one\"\n(integer) 0\n",
		},
		{
			title: "Remove member from a set",
			cmd: "redis> SADD myset \"one\"\n(integer) 1\nredis> SADD myset \"two\"\n(integer) 1\nredis> SADD myset \"three\"\n(integer) 1\nredis> SREM myset \"one\"\n(integer) 1\nredis> SREM myset \"four\"\n(integer) 0\nredis> SMEMBERS myset\n1) \"two\"\n2) \"three\"",
		},
	],
};

const Lists = {
	title: "List Commands",
	items: [
		{
			title: "Get an element from a list by its index",
			cmd: "redis> LPUSH mylist \"World\"\n(integer) 1\nredis> LPUSH mylist \"Hello\"\n(integer) 2\nredis> LINDEX mylist 0\n\"Hello\"\nredis> LINDEX mylist -1\n\"World\"\nredis> LINDEX mylist 3\n\"(nil)\"",
		},

		{
			title: "Insert element before or after another element",
			cmd: "redis> LPUSH mylist \"World\"\n(integer) 1\nredis> LPUSH mylist \"Hello\"\n(integer) 2\nredis> LINSERT mylist BEFORE \"World\" \"There\"\n(integer) 3\nredis> LRANGE mylist 0 -1\n1) \"Hello\"\n2) \"There\"\n3) \"World\"",
		},

		{
			title: "Get List Length",
			cmd: "redis> LPUSH mylist \"World\"\n(integer) 1\nredis> LPUSH mylist \"Hello\"\n(integer) 2\nredis> LLEN mylist\n(integer) 2",
		},

		{
			title: "Remove and return the first element from a list",
			cmd: "redis> RPUSH mylist \"one\"\n(integer) 1\nredis> RPUSH mylist \"two\"\n(integer) 2\nredis> RPUSH mylist \"three\"\n(integer) 3\nredis> LPOP mylist\n\"one\"\nredis> LRANGE mylist 0 -1\n1) \"two\"\n2) \"three\"",
		},
	],
};

function CheatsheetRedis() {
	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				<GroupBlock data={GettingStarted} lang="bash" />
				<GroupBlock data={StringCmd} lang="bash" />
				<GroupBlock data={Generics} lang="bash" />
				<GroupBlock data={Sets} lang="bash" />
				<GroupBlock data={Lists} lang="bash" />
			</div>
		</div>
	);
}

export default CheatsheetRedis;
