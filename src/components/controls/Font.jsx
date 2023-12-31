import useStore from '@/store'
import { fonts } from '@/options'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FontSelect() {
  const fontStyle = useStore(state => state.fontStyle)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-zinc-400">Font</label>
      <Select value={fontStyle} onValueChange={fontStyle => useStore.setState({ fontStyle })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-80 overflow-y-auto">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
