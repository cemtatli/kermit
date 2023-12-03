import PropTypes from 'prop-types'

import useStore from '@/store'

import { toBlob, toPng, toSvg } from 'html-to-image'
import { toast } from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

import { DownloadIcon, ClipboardCopyIcon, Link1Icon, Share2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function ExportOptions({ targetRef }) {
  const title = useStore(state => state.title)

  const copyImage = async () => {
    const loading = toast.loading(`${title} Copying...`, {
      style: {
        borderRadius: '10px',
        background: '#222',
        color: '#fff',
      },
    })
    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      })
      const img = new ClipboardItem({ 'image/png': imgBlob })
      navigator.clipboard.write([img])
      toast.remove(loading)
      toast('Image copied to clipboard!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    } catch (error) {
      toast.remove(loading)
      toast.error('Something went wrong!', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    }
  }

  const copyLink = () => {
    try {
      const state = useStore.getState()
      const queryParams = new URLSearchParams({
        ...state,
        code: btoa(state.code),
      }).toString()
      navigator.clipboard.writeText(`${location.href}?${queryParams}`)

      toast.success('Link copied to clipboard!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    } catch (error) {
      toast.error('Something went wrong!', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    }
  }

  const saveImage = async (name, format) => {
    const loading = toast.loading(`Exporting ${format} image`, {
      style: {
        borderRadius: '10px',
        background: '#222',
        color: '#fff',
      },
    })

    try {
      let imgUrl, filename
      switch (format) {
        case 'PNG':
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 })
          filename = `${name}.png`
          break
        case 'SVG':
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 })
          filename = `${name}.svg`
          break

        default:
          return
      }

      const a = document.createElement('a')
      a.href = imgUrl
      a.download = filename
      a.click()

      toast.remove(loading)
      toast.success('Exported successfully!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    } catch (error) {
      toast.remove(loading)
      toast.error('Something went wrong!', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      })
    }
  }

  useHotkeys('ctrl+c', copyImage)
  useHotkeys('shift+ctrl+c', copyLink)
  useHotkeys('ctrl+s', () => saveImage(title, 'PNG'))
  useHotkeys('shift+ctrl+s', () => saveImage(title, 'SVG'))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-x-3">
          <Share2Icon />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark backdrop-blur mb-2">
        <DropdownMenuItem className="gap-2.5 cursor-pointer" onClick={copyImage}>
          <ClipboardCopyIcon />
          Copy Image
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2.5 cursor-pointer" onClick={copyLink}>
          <Link1Icon />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 cursor-pointer" onClick={() => saveImage(title, 'PNG')}>
          <DownloadIcon />
          Save PNG
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2.5 cursor-pointer" onClick={() => saveImage(title, 'SVG')}>
          <DownloadIcon />
          Save SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

ExportOptions.propTypes = {
  targetRef: PropTypes.object,
}
