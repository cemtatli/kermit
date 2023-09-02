import useStore from '@/store';

import { Button } from '@/components/ui/button';

export default function Padding() {
	const paddingSizes = [{ value: 16 }, { value: 32 }, { value: 48 }, { value: 64 }];

  const updatePadding = (newPadding) => {
    useStore.setState({ padding: newPadding });
  };

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">Padding (px)</label>
      <div className="flex items-center gap-1">
        {paddingSizes.map((size) => (
          <Button size={"sm"} variant={"ghost"} key={size.value} onClick={() => updatePadding(size.value)}>
            {size.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
