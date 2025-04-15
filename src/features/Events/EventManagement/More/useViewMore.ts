import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useToast } from 'src/hooks/use-toast'
import { EventDetail } from 'src/@types/events.type'

export const useViewMore = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { eventId } = useParams<{ eventId: string }>()
  
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [customUrl, setCustomUrl] = useState('')
  const [currentSlug, setCurrentSlug] = useState('')
  const [isCloning, setIsCloning] = useState(false)
  const [isUpdatingUrl, setIsUpdatingUrl] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return
      
      try {
        setIsLoading(false)
        // Simulate API call to get event details
        // In production, replace with actual API call: const eventData = await eventApi.getEventById(eventId)
        
        // Mock data for development
        const mockEventData: EventDetail = {
          id: eventId,
          calendarId: "cal-123",
          title: "FPT's Showcase Expo",
          description: "Annual technology showcase event",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 86400000).toISOString(), // 1 day later
          isOnline: false,
          isFree: true,
          price: 0,
          capacity: 200,
          location: {
            id: "loc-123",
            name: "FPT University",
            address: "Hòa Lạc, Thạch Thất, Hà Nội",
            latitude: 21.013715,
            longitude: 105.527058
          },
          profilePicture: "https://blog.spoongraphics.co.uk/wp-content/uploads/2011/05/vibrant.jpg",
          requiresApproval: false,
          visibility: "public",
          slug: "fpt-showcase-expo",
          organizerId: {
            id: "org-123"
          },
          insDate: new Date().toISOString(),
          updDate: new Date().toISOString(),
          delFlg: false,
          createdAt: new Date().toISOString()
        };
        
        setEvent(mockEventData);
        
        // Set the current slug if it exists
        if (mockEventData.slug) {
          setCurrentSlug(mockEventData.slug);
          setCustomUrl(mockEventData.slug);
        }
      } catch (error) {
        toast({
          title: "Failed to load event details",
          description: "Please refresh the page and try again.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchEventDetails()
  }, [eventId, toast])

  // Validate custom URL (slug)
  const validateCustomUrl = (url: string): boolean => {
    // URL shouldn't be empty
    if (!url.trim()) return false
    
    // URL should only contain alphanumeric characters, hyphens, and underscores
    const slugRegex = /^[a-zA-Z0-9_-]+$/
    return slugRegex.test(url)
  }

  const handleCloneEvent = async () => {
    if (!eventId) return
    
    try {
      setIsCloning(true)
      
      // Simulate API call to clone event
      // In production, replace with actual API call: const result = await eventApi.cloneEvent(eventId)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      toast({
        title: "Event cloned successfully",
        description: "You will be redirected to the new event page shortly.",
      })
      
      // Simulate successful response and redirect
      setTimeout(() => {
        navigate(`/events/${eventId}-clone/manage`)
      }, 1500)
    } catch (error) {
      toast({
        title: "Failed to clone event",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsCloning(false)
    }
  }

  const handleUpdateUrl = async () => {
    if (!eventId) return
    
    // Check URL is different from current
    if (customUrl === currentSlug) {
      toast({
        title: "No changes detected",
        description: "Please enter a different URL than the current one.",
      })
      return
    }
    
    // Validate URL format
    if (!validateCustomUrl(customUrl)) {
      toast({
        title: "Invalid URL format",
        description: "URL can only contain letters, numbers, hyphens, and underscores.",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsUpdatingUrl(true)
      
      // Simulate checking if slug is available
      // In production, replace with actual API call: const isSlugAvailable = await eventApi.checkSlugAvailability(customUrl)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const isSlugAvailable = true; // Mock response
      
      if (!isSlugAvailable) {
        toast({
          title: "URL is already taken",
          description: "Please choose a different URL.",
          variant: "destructive"
        })
        setIsUpdatingUrl(false)
        return
      }
      
      // Simulate updating the event slug
      // In production, replace with actual API call: await eventApi.updateEventSlug(eventId, customUrl)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      toast({
        title: "URL updated successfully",
        description: `Your event URL has been updated to: ${customUrl}`,
      })
      
      // Update current slug
      setCurrentSlug(customUrl)
    } catch (error) {
      toast({
        title: "Failed to update URL",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsUpdatingUrl(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!eventId) return
    
    try {
      setIsDeleting(true)
      
      // Simulate deleting the event
      // In production, replace with actual API call: await eventApi.deleteEvent(eventId)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      toast({
        title: "Event deleted successfully",
        description: "You will be redirected to your events list.",
      })
      
      // Redirect to the events list page after successful deletion
      setTimeout(() => {
        navigate('/events')
      }, 1500)
    } catch (error) {
      toast({
        title: "Failed to delete event",
        description: "Please try again later.",
        variant: "destructive"
      })
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const getShareableUrl = () => {
    if (!currentSlug) return ''
    // Return the full URL that can be shared
    return `${window.location.origin}/events/${currentSlug}`
  }

  return {
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
  }
}