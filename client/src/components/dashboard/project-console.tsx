"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { PROJECT_API_BASE } from '@/lib/api';

type Source = {
	sourceId: string;
	sourceName: string;
	sourceType: 'WEB' | 'ANDROID' | 'IOS';
	identifier: string;
};

type Project = {
	id: string;
	projectName: string;
	createdAt: string;
	updatedAt: string;
	sources: Source[];
};

function getCookieValue(name: string) {
	if (typeof document === 'undefined') {
		return null;
	}

	const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(`${name}=`));
	return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null;
}

function getAuthHeaders() {
	const token = getCookieValue('token');

	if (!token) {
		throw new Error('No auth token found. Please log in again.');
	}

	return {
		Authorization: `Bearer ${token}`,
	};
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(value));
}

function CopyButton({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
		>
			{copied ? 'Copied' : 'Copy snippet'}
		</button>
	);
}

export function ProjectConsole() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProjectId, setSelectedProjectId] = useState<string>('');
	const [projectName, setProjectName] = useState('');
	const [sourceName, setSourceName] = useState('Website');
	const [sourceType, setSourceType] = useState<'WEB' | 'ANDROID' | 'IOS'>('WEB');
	const [identifier, setIdentifier] = useState('');
	const [loadingProjects, setLoadingProjects] = useState(true);
	const [savingProject, setSavingProject] = useState(false);
	const [savingSource, setSavingSource] = useState(false);
	const [error, setError] = useState('');
	const [notice, setNotice] = useState('');

	const selectedProject = useMemo(
		() => projects.find((project) => project.id === selectedProjectId) ?? null,
		[projects, selectedProjectId],
	);

	const selectedSource = selectedProject?.sources?.[0] ?? null;

	const trackerSnippet = useMemo(() => {
		if (!selectedSource) {
			return '';
		}

		return `<script src="../tracker/tl-tracker.js"></script>\n<script>\n  Thatlytics.init({\n    sourceId: "${selectedSource.sourceId}",\n    sourceIdentifier: "${selectedSource.identifier}"\n  });\n</script>`;
	}, [selectedSource]);

	const loadProjects = async () => {
		setLoadingProjects(true);
		setError('');

		try {
			const response = await fetch(`${PROJECT_API_BASE}/projects`, {
				headers: {
					...getAuthHeaders(),
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || data.message || 'Failed to load projects');
			}

			const nextProjects: Project[] = data.projects ?? [];
			setProjects(nextProjects);

			if (!selectedProjectId && nextProjects.length > 0) {
				setSelectedProjectId(nextProjects[0].id);
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoadingProjects(false);
		}
	};

	useEffect(() => {
		loadProjects();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refreshProjects = async (preferredProjectId?: string) => {
		await loadProjects();
		if (preferredProjectId) {
			setSelectedProjectId(preferredProjectId);
		}
	};

	const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSavingProject(true);
		setError('');
		setNotice('');

		try {
			const response = await fetch(`${PROJECT_API_BASE}/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...getAuthHeaders(),
				},
				body: JSON.stringify({ projectName }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || data.message || 'Failed to create project');
			}

			setProjectName('');
			setNotice(`Created project ${data.project.projectName}. Add a source to start tracking.`);
			await refreshProjects(data.project.id);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setSavingProject(false);
		}
	};

	const handleAddSource = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSavingSource(true);
		setError('');
		setNotice('');

		if (!selectedProject) {
			setError('Select a project first.');
			setSavingSource(false);
			return;
		}

		try {
			const response = await fetch(`${PROJECT_API_BASE}/${selectedProject.id}/sources`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...getAuthHeaders(),
				},
				body: JSON.stringify({
					sourceName,
					sourceType,
					identifier,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || data.message || 'Failed to add source');
			}

			setNotice(`Added source ${data.source.sourceName} to ${selectedProject.projectName}.`);
			await loadProjects();
		} catch (error: any) {
			setError(error.message);
		} finally {
			setSavingSource(false);
		}
	};

	const projectHealth = selectedProject
		? `${selectedProject.sources.length} source${selectedProject.sources.length === 1 ? '' : 's'}`
		: 'No project selected';

	return (
		<div className="flex flex-col lg:flex-row items-start gap-6">
			<aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<div className="border-b border-zinc-200 p-5 dark:border-zinc-800">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Projects</p>
					<h2 className="mt-2 text-xl font-semibold tracking-tight">Manage multiple sites</h2>
					<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Choose a project, add sources, and copy the tracker snippet.</p>
				</div>

				<div className="max-h-[28rem] overflow-auto p-3">
					{loadingProjects ? (
						<div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">Loading projects...</div>
					) : projects.length === 0 ? (
						<div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">No projects yet. Create your first one below.</div>
					) : (
						<div className="space-y-2">
							{projects.map((project) => {
								const isActive = project.id === selectedProjectId;
								return (
									<button
										key={project.id}
										type="button"
										onClick={() => setSelectedProjectId(project.id)}
										className={`w-full rounded-xl border p-4 text-left transition-colors ${isActive ? 'border-zinc-900 bg-zinc-950 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950' : 'border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-950'}`}
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<div className="font-medium">{project.projectName}</div>
												<div className={`mt-1 text-xs ${isActive ? 'text-zinc-200 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'}`}>{project.sources.length} source{project.sources.length === 1 ? '' : 's'}</div>
											</div>
											<div className={`rounded-full px-2 py-1 text-[11px] font-medium ${isActive ? 'bg-white/10 text-white dark:bg-zinc-200 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}>
												{formatDate(project.updatedAt)}
											</div>
										</div>
									</button>
								);
							})}
						</div>
					)}
				</div>
			</aside>

			<section className="flex-1 min-w-0 w-full space-y-6">
				{error ? (
					<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">{error}</div>
				) : null}
				{notice ? (
					<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">{notice}</div>
				) : null}

				<div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
					<div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Overview</p>
						<h3 className="mt-2 text-2xl font-semibold tracking-tight">{selectedProject ? selectedProject.projectName : 'No project selected'}</h3>
						<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{selectedProject ? 'Use this project to organize source identifiers and tracker installs.' : 'Pick a project from the list or create a new one.'}</p>

						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							<div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-950">
								<div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Sources</div>
								<div className="mt-1 text-xl font-semibold">{selectedProject?.sources.length ?? 0}</div>
							</div>
							<div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-950">
								<div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</div>
								<div className="mt-1 text-xl font-semibold">{selectedProject ? 'Active' : 'Idle'}</div>
							</div>
							<div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-950">
								<div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Setup</div>
								<div className="mt-1 text-xl font-semibold">{projectHealth}</div>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Create project</p>
						<h3 className="mt-2 text-lg font-semibold">Start a new workspace</h3>
						<form onSubmit={handleCreateProject} className="mt-4 space-y-4">
							<input
								value={projectName}
								onChange={(event) => setProjectName(event.target.value)}
								required
								placeholder="Marketing site"
								className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:focus:ring-zinc-300"
							/>
							<button type="submit" disabled={savingProject} className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
								{savingProject ? 'Creating project...' : 'Create project'}
							</button>
						</form>
					</div>
				</div>

				<div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
					<div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Sources</p>
						<h3 className="mt-2 text-lg font-semibold">Add a source to the selected project</h3>
						<form onSubmit={handleAddSource} className="mt-4 space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-2 block text-sm font-medium">Source name</label>
									<input value={sourceName} onChange={(event) => setSourceName(event.target.value)} required className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:focus:ring-zinc-300" />
								</div>
								<div>
									<label className="mb-2 block text-sm font-medium">Source type</label>
									<select value={sourceType} onChange={(event) => setSourceType(event.target.value as 'WEB' | 'ANDROID' | 'IOS')} className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:focus:ring-zinc-300">
										<option value="WEB">WEB</option>
										<option value="ANDROID">ANDROID</option>
										<option value="IOS">IOS</option>
									</select>
								</div>
							</div>
							<div>
								<label className="mb-2 block text-sm font-medium">Identifier</label>
								<input value={identifier} onChange={(event) => setIdentifier(event.target.value)} required placeholder="acme.com" className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:focus:ring-zinc-300" />
							</div>
							<button type="submit" disabled={savingSource || !selectedProject} className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
								{savingSource ? 'Adding source...' : 'Add source'}
							</button>
						</form>
					</div>

					<div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-zinc-50 shadow-sm dark:border-zinc-800">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Install</p>
						<h3 className="mt-2 text-lg font-semibold">Tracker snippet for this source</h3>
						<p className="mt-2 text-sm text-zinc-400">Copy this into your site after the source is created.</p>

						<div className="mt-4 rounded-xl border border-zinc-800 bg-black/40 p-4 text-xs text-zinc-200">
							<pre className="whitespace-pre-wrap break-words font-mono leading-6">{trackerSnippet || 'Select a project with at least one source to generate the snippet.'}</pre>
						</div>

						{trackerSnippet ? (
							<div className="mt-4 flex items-center gap-3">
								<CopyButton value={trackerSnippet} />
								<span className="text-xs text-zinc-400">Uses the active sourceId and identifier.</span>
							</div>
						) : null}
					</div>
				</div>

				<div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Sources in project</p>
					<h3 className="mt-2 text-lg font-semibold">{selectedProject ? selectedProject.projectName : 'Pick a project'}</h3>
					<div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
						{selectedProject?.sources?.length ? selectedProject.sources.map((source) => (
							<div key={source.sourceId} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
								<div className="flex items-start justify-between gap-3">
									<div>
										<div className="font-medium">{source.sourceName}</div>
										<div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{source.sourceType}</div>
									</div>
									<span className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{source.sourceId.slice(0, 8)}</span>
								</div>
								<div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 break-all">{source.identifier}</div>
							</div>
						)) : (
							<div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">No sources yet for this project.</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
