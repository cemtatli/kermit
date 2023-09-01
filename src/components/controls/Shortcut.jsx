/* eslint-disable react/prop-types */

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { KeyboardIcon } from '@radix-ui/react-icons';

const ShortcutItem = ({ label, shortcut }) => {
	return (
		<div className='flex items-center justify-between pb-2 cursor-pointer group gap-x-2.5 border-b last:border-none last:pb-0'>
			{label}
			<span
				className={
					'bg-neutral-600 ring-1 ring-neutral-500 shadow-inner w-1/4 transition ease-in group-hover:shadow-neutral-400 flex text-center justify-center text-xs items-center p-1 rounded-md text-white'
				}>
				{shortcut}
			</span>
		</div>
	);
};

const Shortcut = () => {
	return (
		<div className='absolute top-12 left-12'>
			<Popover>
				<PopoverTrigger className='text-sm font-medium flex items-center gap-x-2.5'>
					<KeyboardIcon className='w-6 h-6' />
					Keyboard Shortcuts
				</PopoverTrigger>
				<PopoverContent className='dark w-52 text-sm font-medium mt-2 transition'>
					<div className='flex flex-col gap-4'>
						<ShortcutItem label={'Copy Image'} shortcut={'⌘C'} />
						<ShortcutItem label={'Copy Link'} shortcut={'⇧⌘C'} />
						<ShortcutItem label={'Save as PNG'} shortcut={'⌘S'} />
						<ShortcutItem label={'Save as SVG'} shortcut={'⇧⌘S'} />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Shortcut;
