import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const reviewsData = [
  {
    id: 'REV-001',
    customer: 'John Doe',
    equipment: '4-Person Tent',
    rating: 5,
    comment: 'Excellent quality tent! Very spacious and easy to set up. Perfect for our family camping trip.',
    date: '2024-01-18',
    helpful: 12,
    status: 'published'
  },
  {
    id: 'REV-002',
    customer: 'Sarah Smith',
    equipment: 'Sleeping Bag (Winter)',
    rating: 4,
    comment: 'Great sleeping bag, kept me warm during cold nights. Only minor issue was the zipper was a bit sticky.',
    date: '2024-01-16',
    helpful: 8,
    status: 'published'
  },
  {
    id: 'REV-003',
    customer: 'Mike Johnson',
    equipment: 'Camping Backpack (65L)',
    rating: 5,
    comment: 'Best backpack I\'ve rented! Comfortable straps, lots of compartments. Highly recommend!',
    date: '2024-01-15',
    helpful: 15,
    status: 'published'
  },
  {
    id: 'REV-004',
    customer: 'Emily Davis',
    equipment: 'Portable Camp Stove',
    rating: 3,
    comment: 'Decent stove but took a while to heat up. Works well once it gets going.',
    date: '2024-01-14',
    helpful: 5,
    status: 'published'
  },
  {
    id: 'REV-005',
    customer: 'David Wilson',
    equipment: 'LED Camping Lantern',
    rating: 5,
    comment: 'Bright and long-lasting battery. Perfect for our camping nights!',
    date: '2024-01-12',
    helpful: 10,
    status: 'published'
  },
  {
    id: 'REV-006',
    customer: 'Lisa Anderson',
    equipment: 'Camping Chair',
    rating: 4,
    comment: 'Comfortable chair, would be perfect if it had a cup holder.',
    date: '2024-01-10',
    helpful: 6,
    status: 'published'
  },
  {
    id: 'REV-007',
    customer: 'Tom White',
    equipment: '4-Person Tent',
    rating: 2,
    comment: 'Tent had some tears in the fabric. Needs maintenance.',
    date: '2024-01-20',
    helpful: 3,
    status: 'pending'
  },
];

const ratingDistribution = [
  { stars: 5, count: 45, percentage: 56 },
  { stars: 4, count: 25, percentage: 31 },
  { stars: 3, count: 7, percentage: 9 },
  { stars: 2, count: 2, percentage: 3 },
  { stars: 1, count: 1, percentage: 1 },
];

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReviews = reviewsData.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.equipment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const averageRating = 4.5;
  const totalReviews = 80;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
        <p className="text-muted-foreground mt-1">Manage and respond to customer feedback</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rating Summary */}
        <Card className="shadow-sm hover:shadow-elegant transition-all">
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
            <CardDescription>Based on {totalReviews} reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-foreground">{averageRating}</div>
              <div className="flex-1">
                {renderStars(Math.round(averageRating))}
                <p className="text-sm text-muted-foreground mt-1">
                  {totalReviews} total reviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-2 shadow-sm hover:shadow-elegant transition-all">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-foreground">{item.stars}</span>
                    <Star className="h-4 w-4 fill-accent text-accent" />
                  </div>
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-16 text-right">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by customer or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-elegant transition-all">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 bg-gradient-primary">
                      <AvatarFallback className="bg-transparent text-primary-foreground font-semibold">
                        {review.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{review.customer}</p>
                      <p className="text-sm text-muted-foreground">{review.equipment}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={review.status === 'published' 
                      ? 'bg-success/10 text-success border-success/20'
                      : 'bg-warning/10 text-warning border-warning/20'
                    }
                    variant="outline"
                  >
                    {review.status}
                  </Badge>
                </div>

                {/* Comment */}
                <div className="pl-16">
                  <p className="text-foreground">{review.comment}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pl-16 pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful} helpful</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                  {review.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Star className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-foreground">No reviews found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
