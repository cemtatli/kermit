import useStore from '@/store';
import { Switch } from '@/components/ui/switch';

export default function Background() {
	const showBg = useStore((state) => state.showBackground);

	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-zinc-400'>Background</label>
			<Switch
				checked={showBg}
				onCheckedChange={(checked) => useStore.setState({ showBackground: checked })}
				className='my-1.5'
			/>
		</div>
	);
}
