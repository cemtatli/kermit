import { languages } from '@/options';
import useStore from '@/store';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { LightningBoltIcon } from '@radix-ui/react-icons';

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
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Language</label>
			<Select value={language} onValueChange={handleChange}>
				<SelectTrigger className='w-40'>
					{autoDetectLanguage && <LightningBoltIcon />}
					<SelectValue placeholder='Select Language' />
				</SelectTrigger>
				<SelectContent className='dark max-h-60 overflow-y-auto'>
					<SelectItem value='auto-detect'>Auto Detect</SelectItem>
					{Object.entries(languages).map(([lang, name]) => (
						<SelectItem key={lang} value={lang}>
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
