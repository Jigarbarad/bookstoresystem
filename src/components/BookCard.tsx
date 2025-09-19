import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Edit, Trash2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  rating?: number;
  isbn: string;
}

interface BookCardProps {
  book: Book;
  userRole?: 'customer' | 'admin' | null;
  onAddToCart?: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
}

const BookCard = ({ 
  book, 
  userRole = null, 
  onAddToCart,
  onEdit,
  onDelete 
}: BookCardProps) => {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-book hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-bookstore-cream to-secondary">
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Badge variant="secondary" className="text-xs">
              {book.genre}
            </Badge>
            {book.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-bookstore-gold text-bookstore-gold" />
                <span className="text-xs text-muted-foreground">{book.rating}</span>
              </div>
            )}
          </div>
          
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-bookstore-warm transition-colors">
            {book.title}
          </h3>
          
          <p className="text-xs text-muted-foreground">by {book.author}</p>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-bookstore-warm">
              ${book.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {userRole === 'admin' ? (
          <div className="flex w-full space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(book.id)}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              onClick={() => onDelete?.(book.id)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-gradient-warm hover:opacity-90"
            size="sm"
            disabled={book.stock === 0}
            onClick={() => onAddToCart?.(book.id)}
          >
            <ShoppingCart className="h-3 w-3 mr-2" />
            {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;