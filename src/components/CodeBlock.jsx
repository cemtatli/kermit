import { useEffect } from 'react';

import useStore from '@/store';
import { codeSnippets, fonts } from '@/options';
import { cn } from '@/lib/utils';

import hljs from 'highlight.js';
import Editor from 'react-simple-code-editor';
import flourite from 'flourite';

const CodeBlock = () => {
	const store = useStore();

	useEffect(() => {
		const randomCodeSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
		useStore.setState(randomCodeSnippet);
	}, []);

	useEffect(() => {
		if (store.autoDetectLanguage) {
			const { language } = flourite(store.code, { noUnknown: true });
			useStore.setState({
				language: language.toLowerCase() || 'plaintext',
			});
		}
	}, [store.autoDetectLanguage, store.code]);

	return (
		<section
			className={cn(
				'dark min-w-[500px]  rounded-lg border shadow-2xl shadow-neutral-900',
				store.darkMode ? 'bg-black/80 border-gray-500/40' : 'bg-white/80 border-gray-200/20'
			)}>
			<nav className='grid grid-cols-6 gap-2 items-center px-4 py-2'>
				<div className='flex gap-1.5'>
					<div className='bg-red-500 w-2.5 h-2.5 rounded-full' />
					<div className='bg-yellow-500 w-2.5 h-2.5 rounded-full' />
					<div className='bg-green-500 w-2.5 h-2.5 rounded-full' />
				</div>
				<div className='col-span-4 flex justify-center'>
					<input
						type='text'
						value={store.title}
						onClick={(e) => e.target.select()}
						onChange={(e) => useStore.setState({ title: e.target.value })}
						spellCheck={false}
						className={cn(
							'bg-transparent focus:outline-none text-sm text-center font-medium text-neutral-400'
						)}
					/>
				</div>
			</nav>
			<div
				className={cn(
					'px-4 pb-4 pt-2',
					store.darkMode
						? 'brightness-110'
						: 'text-neutral-800 brightness-50 saturate-150 contrast-150'
				)}>
				<Editor
					value={store.code}
					onValueChange={(code) => useStore.setState({ code })}
					highlight={(code) =>
						hljs.highlight(code, { language: store.language || 'plaintext' }).value
					}
					style={{
						fontFamily: fonts[store.fontStyle].name,
						fontSize: store.fontSize,
					}}
					textareaClassName='focus:outline-none'
					onClick={(e) => e.target.select()}
				/>
			</div>
		</section>
	);
};

export default CodeBlock;
