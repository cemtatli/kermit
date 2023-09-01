/* eslint-disable react/prop-types */

import useStore from '@/store';

import { toBlob, toPng, toSvg } from 'html-to-image';
import { toast } from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';

import { DownloadIcon, CopyIcon, Link1Icon, Share2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ExportOptions({ targetRef }) {
	const title = useStore((state) => state.title);

	const copyImage = async () => {
		const loading = toast.loading(`${title} Copying...`);

		try {
			const imgBlob = await toBlob(targetRef.current, {
				pixelRatio: 2,
			});
			const img = new ClipboardItem({ 'image/png': imgBlob });
			navigator.clipboard.write([img]);
			toast.remove(loading);
			toast.success('Image copied to clipboard!');
		} catch (error) {
			toast.remove(loading);
			toast.error('Something went wrong!');
		}
	};

	const copyLink = () => {
		try {
			const state = useStore.getState();
			const queryParams = new URLSearchParams({
				...state,
				code: btoa(state.code),
			}).toString();
			navigator.clipboard.writeText(`${location.href}?${queryParams}`);

			toast.success('Link copied to clipboard!');
		} catch (error) {
			toast.error('Something went wrong!');
		}
	};

	const saveImage = async (name, format) => {
		const loading = toast.loading(`Exporting ${format} image`);

		try {
			let imgUrl, filename;
			switch (format) {
				case 'PNG':
					imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
					filename = `${name}.png`;
					break;
				case 'SVG':
					imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
					filename = `${name}.svg`;
					break;

				default:
					return;
			}

			const a = document.createElement('a');
			a.href = imgUrl;
			a.download = filename;
			a.click();

			toast.remove(loading);
			toast.success('Exported successfully!');
		} catch (error) {
			toast.remove(loading);
			toast.error('Something went wrong!');
		}
	};

	useHotkeys('ctrl+c', copyImage);
	useHotkeys('shift+ctrl+c', copyLink);
	useHotkeys('ctrl+s', () => saveImage(title, 'PNG'));
	useHotkeys('shift+ctrl+s', () => saveImage(title, 'SVG'));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='gap-x-2.5'>
					<Share2Icon />
					Export
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='dark backdrop-blur'>
				<DropdownMenuItem className='gap-2.5 cursor-pointer' onClick={copyImage}>
					<CopyIcon />
					Copy Image
				</DropdownMenuItem>
				<DropdownMenuItem className='gap-2.5 cursor-pointer' onClick={copyLink}>
					<Link1Icon />
					Copy Link
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='gap-2.5 cursor-pointer'
					onClick={() => saveImage(title, 'PNG')}>
					<DownloadIcon />
					Save as PNG
				</DropdownMenuItem>
				<DropdownMenuItem
					className='gap-2.5 cursor-pointer'
					onClick={() => saveImage(title, 'SVG')}>
					<DownloadIcon />
					Save as SVG
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
