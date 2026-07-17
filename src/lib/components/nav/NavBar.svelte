<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let activePath = $state(typeof window !== 'undefined' ? window.location.pathname : '/');

	type Tab = {
		path: string;
		label: string;
		icon: string;
	};

	const tabs: Tab[] = [
		{ path: '/', label: 'Picker', icon: 'fa-chess-knight' },
		{ path: '/games', label: 'Games', icon: 'fa-list' },
		{ path: '/prizes', label: 'Prizes', icon: 'fa-trophy' },
		{ path: '/prizes/edit', label: 'Editor', icon: 'fa-gear' }
	];

	function handleTabClick(path: string) {
		goto(path);
	}

	onMount(() => {
		const updatePath = () => {
			activePath = window.location.pathname;
		};
		window.addEventListener('popstate', updatePath);
		window.addEventListener('hashchange', updatePath);
	});

	function getTabClasses(path: string): Record<string, boolean> {
		const isActive = activePath === path || (path === '/' && activePath === '');
		const base = [
			'flex',
			'flex-col',
			'items-center',
			'justify-center',
			'transition-colors',
			'py-2'
		];
		if (isActive) {
			return Object.fromEntries([...base, 'bg-indigo-50', 'text-indigo-600'].map((c) => [c, true]));
		}
		return Object.fromEntries(
			[...base, 'text-gray-400', 'hover:text-gray-600'].map((c) => [c, true])
		);
	}
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
	aria-label="Main navigation"
>
	<div class="flex h-[60px] w-full items-center justify-evenly md:w-1/3 md:mx-auto">
		{#each tabs as tab, i (i)}
			<a
				href={tab.path}
				onclick={(e) => {
					e.preventDefault();
					handleTabClick(tab.path);
				}}
				class:list={getTabClasses(tab.path)}
				aria-label={tab.label}
			>
				<span class="text-xl mb-0.5 flex items-center justify-center"
					><i class="fas {tab.icon} fa-fw"></i></span
				>
				<span class="text-xs font-medium">{tab.label}</span>
			</a>
		{/each}
	</div>
</nav>
