import React, { useEffect } from 'react'
import { Copy, Globe, Loader2, Share2, ExternalLink, ClipboardCopy, Check, Trash2 } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { Input } from 'src/components/ui/input'
import { Badge } from 'src/components/ui/badge'
import { useViewMore } from './useViewMore'
import { Skeleton } from 'src/components/ui/skeleton'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'src/components/ui/alert-dialog'

const ViewMore = () => {
  const {
    event,
    customUrl,
    setCustomUrl,
    currentSlug,
    isCloning,
    isUpdatingUrl,
    isDeleting,
    isLoading,
    showDeleteConfirm,
    setShowDeleteConfirm,
    getShareableUrl,
    handleCloneEvent,
    handleUpdateUrl,
    handleDeleteEvent
  } = useViewMore()
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    const url = getShareableUrl()
    if (url) {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleVisitEvent = () => {
    const url = getShareableUrl()
    if (url) {
      window.open(url, '_blank')
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Clone Event Section */}
      <div className='flex flex-col'>
        <div className='mb-3'>
          <p className='font-medium text-2xl'>Clone Event</p>
          <p className='text-muted-foreground'>Create a new event with the same information as this one.</p>
        </div>
        {isLoading ? (
          <Card className='p-4'>
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-10 w-32" />
          </Card>
        ) : (
          <Card className='p-4 flex flex-col gap-4'>
            <div className='flex items-start gap-4'>
              <Badge className='p-2 h-max' variant='secondary'>
                <Copy size={24} />
              </Badge>
              <div>
                <p className='font-medium'>Clone this event</p>
                <p className='text-sm text-muted-foreground'>
                  Create a new event with the same information as this one. Everything
                  except the guest list and event blasts will be copied over.
                </p>
                {event && (
                  <p className='text-sm mt-2 font-medium'>
                    Cloning: <span className='text-primary'>{event.title}</span>
                  </p>
                )}
              </div>
            </div>
            <Button 
              onClick={handleCloneEvent} 
              className='self-start'
              disabled={isCloning || !event}
            >
              {isCloning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cloning...
                </>
              ) : (
                'Clone Event'
              )}
            </Button>
          </Card>
        )}
      </div>

      <Separator className='my-2' />

      {/* Event Page/URL Section */}
      <div className='flex flex-col'>
        <div className='mb-3'>
          <p className='font-medium text-2xl'>Event Page</p>
          <p className='text-muted-foreground'>Customize your event page URL and access your public event page.</p>
        </div>
        {isLoading ? (
          <Card className='p-4'>
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </Card>
        ) : (
          <>
            <Card className='p-4 flex flex-col gap-4'>
              <div className='flex items-start gap-4'>
                <Badge className='p-2 h-max' variant='secondary'>
                  <Globe size={24} />
                </Badge>
                <div>
                  <p className='font-medium'>Set a custom URL for this event</p>
                  <p className='text-sm text-muted-foreground'>
                    When you choose a new URL, the current one will no longer work.
                    Do not change your URL if you have already shared the event.
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex-1'>
                  <Input
                    className='glass'
                    placeholder='your-custom-url'
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    disabled={isUpdatingUrl}
                  />
                </div>
                <Button 
                  onClick={handleUpdateUrl}
                  className='self-end gradient-btn'
                  disabled={isUpdatingUrl || !customUrl || customUrl === currentSlug}
                >
                  {isUpdatingUrl ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update'
                  )}
                </Button>
              </div>
            </Card>

            {currentSlug && (
              <Card className='p-4 mt-4 flex flex-col gap-4'>
                <div className='flex items-start gap-4'>
                  <Badge className='p-2 h-max' variant='secondary'>
                    <Share2 size={24} />
                  </Badge>
                  <div>
                    <p className='font-medium'>Your event page URL</p>
                    <p className='text-sm text-muted-foreground'>
                      Share this URL with your guests to access the public event page.
                    </p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2 p-2 bg-muted/30 rounded-md overflow-hidden'>
                    <p className='text-sm font-medium truncate flex-1'>{getShareableUrl()}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleCopyUrl}
                            className='h-8 w-8'
                          >
                            {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? 'Copied!' : 'Copy URL'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className='self-start'
                    onClick={handleVisitEvent}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Visit Event Page
                  </Button>
                </div>
              </Card>
            )}
          </>
        )}
      </div>

      <Separator className='my-2' />

      {/* Event Deletion Section */}
      <div className='flex flex-col'>
        <div className='mb-3'>
          <p className='font-medium text-2xl'>Danger Zone</p>
          <p className='text-muted-foreground'>Actions that cannot be undone.</p>
        </div>
        <Card className='p-4 border border-destructive/20 flex flex-col gap-4'>
          <div className='flex items-start gap-4'>
            <Badge className='p-2 h-max bg-destructive/10 hover:bg-destructive/10'>
              <Trash2 size={24} className='text-destructive' />
            </Badge>
            <div>
              <p className='font-medium'>Delete this event</p>
              <p className='text-sm text-muted-foreground'>
                This action cannot be undone. This will permanently delete the event and remove all associated data.
              </p>
              {event && (
                <p className='text-sm mt-2 font-medium text-destructive'>
                  Event to delete: {event.title}
                </p>
              )}
            </div>
          </div>
          <Button 
            variant="destructive" 
            className='self-start'
            disabled={isLoading || !event}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Event
          </Button>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              {event?.title} and remove all associated data including registrations,
              guest lists, and all event communications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Yes, delete event'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ViewMore