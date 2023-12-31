import useStore from '@/store'
import { themes } from '@/options'
import { cn } from '@/lib/utils'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ThemeSelect() {
  const theme = useStore(state => state.theme)

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-zinc-400">Theme</label>
      <Select value={theme} onValueChange={theme => useStore.setState({ theme })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark max-h-80 overflow-y-auto">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem aria-label={name} key={name} value={name}>
              <div className="flex gap-2 items-center">
                <div className={cn('h-4 w-4 rounded-full', theme.background)} />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
