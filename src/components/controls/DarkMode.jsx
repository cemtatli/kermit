import useStore from '@/store';
import { Switch } from '@/components/ui/switch';

export default function DarkMode() {
	const darkMode = useStore((state) => state.darkMode);

	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Dark Mode</label>
			<Switch
				checked={darkMode}
				onCheckedChange={(checked) => useStore.setState({ darkMode: checked })}
				className='my-1.5'
			/>
		</div>
	);
}
