import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { MoreHorizontal, Search, Plus, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';

// Sample data
const events = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    organizer: 'Tech Solutions Inc.',
    category: 'Technology',
    date: '2025-05-15',
    status: 'Upcoming',
    attendees: 350,
  },
  {
    id: '2',
    title: 'Annual Music Festival',
    organizer: 'Sound Productions',
    category: 'Music',
    date: '2025-06-12',
    status: 'Upcoming',
    attendees: 1200,
  },
  {
    id: '3',
    title: 'Marketing Workshop',
    organizer: 'Business Growth Academy',
    category: 'Business',
    date: '2025-04-30',
    status: 'Ongoing',
    attendees: 85,
  },
  {
    id: '4',
    title: 'Charity Fundraiser',
    organizer: 'Hope Foundation',
    category: 'Charity',
    date: '2025-05-02',
    status: 'Upcoming',
    attendees: 520,
  },
  {
    id: '5',
    title: 'Art Exhibition',
    organizer: 'Creative Arts Gallery',
    category: 'Arts',
    date: '2025-03-15',
    status: 'Completed',
    attendees: 230,
  },
];

export default function EventsManagement() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events Management</h2>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Manage all events in the platform.</CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="w-full pl-8"
                  />
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{event.title}</div>
                          <div className="text-sm text-muted-foreground">by {event.organizer}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            event.status === 'Upcoming' 
                            ? 'default' 
                            : event.status === 'Ongoing' 
                            ? 'outline' 
                            : 'secondary'
                          }
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.attendees}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit event</DropdownMenuItem>
                            <DropdownMenuItem>Manage attendees</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancel event</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Manage upcoming events in the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">Filter showing only upcoming events will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ongoing">
          <Card>
            <CardHeader>
              <CardTitle>Ongoing Events</CardTitle>
              <CardDescription>Manage ongoing events in the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">Filter showing only ongoing events will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Events</CardTitle>
              <CardDescription>Manage completed events in the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">Filter showing only completed events will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}