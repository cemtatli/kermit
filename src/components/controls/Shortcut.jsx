import PropTypes from 'prop-types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { KeyboardIcon } from '@radix-ui/react-icons';

const ShortcutItem = ({ label, shortcut }) => {
	return (
		<div className='flex items-center justify-between pb-2 cursor-pointer group gap-x-2.5 border-b last:border-none transition-colors last:pb-0'>
			{label}
			<span
				className={
					'px-2 py-1.5 text-xs font-semibold text-neutral-800 shadow-inner group-hover:shadow-neutral-500 transition-colors bg-neutral-100 border border-neutral-200 rounded-lg dark:bg-neutral-600 dark:text-neutral-100 dark:border-neutral-500'
				}>
				{shortcut.join(' + ')}
			</span>
		</div>
	);
};

ShortcutItem.propTypes = {
	label: PropTypes.string.isRequired,
	shortcut: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const shortcutsData = [
	{ label: 'Copy Image', shortcut: ['⌘', 'C'] },
	{ label: 'Copy Link', shortcut: ['⇧', '⌘', 'C'] },
	{ label: 'Save as PNG', shortcut: ['⌘', 'S'] },
	{ label: 'Save as SVG', shortcut: ['⇧', '⌘', 'S'] },
];

const Shortcut = () => {
	return (
		<div className='absolute top-12 right-12'>
			<Popover>
				<PopoverTrigger className='text-sm font-medium flex items-center gap-x-2.5'>
					<KeyboardIcon className='w-5 h-5' />
					Keyboard Shortcuts
				</PopoverTrigger>
				<PopoverContent className='dark w-52 text-sm font-medium mt-2 transition'>
					<div className='flex flex-col gap-4'>
						{shortcutsData.map((shortcut, index) => (
							<ShortcutItem key={index} label={shortcut.label} shortcut={shortcut.shortcut} />
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Shortcut;
