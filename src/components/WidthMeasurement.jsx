import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

export default function WidthMeasurement({ showWidth, width }) {
  return (
    <div className={cn('w-full flex gap-2 items-center text-white transition-opacity', showWidth ? 'visible opacity-100' : 'invisible opacity-0')}>
      <div className="flex-1 flex items-center">
        <div className="h-4 w-px bg-zinc-50/50" />
        <div className="h-px w-full bg-zinc-50/50" />
      </div>
      <span className="text-zinc-400 text-sm">{width} px</span>
      <div className="flex-1 flex items-center">
        <div className="h-px w-full bg-zinc-50/50" />
        <div className="h-4 w-px bg-zinc-50/50" />
      </div>
    </div>
  )
}

WidthMeasurement.propTypes = {
  showWidth: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
}
