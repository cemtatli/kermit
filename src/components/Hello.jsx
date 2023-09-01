const CardPulseBorder = ({ children }) => {
	return (
		<div className='relative h-full w-full'>
			<div className='absolute top-0 flex w-full justify-center'>
				<div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
			</div>
			<div className='flex h-full items-center justify-center rounded-md border border-slate-800 bg-black px-3 py-2'>
				{children}
			</div>
		</div>
	);
};

export default CardPulseBorder;
