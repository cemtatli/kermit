import useStore from '@/store';
import { languages } from '@/options';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ShadowIcon } from '@radix-ui/react-icons';

export default function LanguageSelect() {
	const language = useStore((state) => state.language);
	const autoDetectLanguage = useStore((state) => state.autoDetectLanguage);

	const handleChange = (language) => {
		if (language === 'auto-detect') {
			useStore.setState({ autoDetectLanguage: true, language: 'plaintext' });
		} else {
			useStore.setState({ autoDetectLanguage: false, language });
		}
	};
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-zinc-400'>Language</label>
			<Select value={language} onValueChange={handleChange}>
				<SelectTrigger className='w-44'>
					{autoDetectLanguage && <ShadowIcon className='animate-spin mr-1' />}
					<SelectValue placeholder='Select Language' />
				</SelectTrigger>
				<SelectContent className='dark max-h-80 overflow-y-auto'>
					<SelectItem value='auto-detect'>Auto Detect</SelectItem>
					{Object.entries(languages).map(([lang, name]) => (
						<SelectItem key={lang} value={lang} className={'truncate'}>
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
