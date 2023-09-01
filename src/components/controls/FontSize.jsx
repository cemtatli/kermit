import useStore from '@/store';
import { Input } from '@/components/ui/input';

export default function FontSize() {
	const fontSize = useStore((state) => state.fontSize);

	return (
		<div className='flex flex-col gap-2'>
			<label className='block text-xs font-medium text-neutral-400'>Font Size</label>
			<Input
				type='number'
				className='dark w-16 bg-transparent'
				min={12}
				value={fontSize}
				onChange={(e) => useStore.setState({ fontSize: Number(e.target.value) })}
			/>
		</div>
	);
}
