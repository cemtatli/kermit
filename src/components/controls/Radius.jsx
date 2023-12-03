import useStore from "@/store";

import { Button } from "@/components/ui/button";

export default function Radius() {
  const radiusSizes = [
    { value: "rounded-md", label: 4 },
    { value: "rounded-xl", label: 8 },
    { value: "rounded-2xl", label: 16 },
  ];

  const updateRadius = (newRadius) => {
    useStore.setState({ radius: newRadius });
  };

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-zinc-400">Radius (px)</label>
      <div className="flex items-center gap-1">
        {radiusSizes.map((size) => (
          <Button size={"sm"} variant={"ghost"} key={size.value} onClick={() => updateRadius(size.value)}>
            {size.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
