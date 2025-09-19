import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import heroImage from "@/assets/bookstore-hero.jpg";
import { Search, Filter, Plus } from "lucide-react";

// Mock data for demonstration
const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Literature",
    price: 12.99,
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    stock: 15,
    imageUrl: "/placeholder.svg",
    rating: 4.2,
    isbn: "978-0-7432-7356-5"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    price: 14.99,
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    stock: 8,
    imageUrl: "/placeholder.svg",
    rating: 4.5,
    isbn: "978-0-06-112008-4"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    price: 13.99,
    description: "A dystopian social science fiction novel exploring surveillance, truth, and individuality.",
    stock: 22,
    imageUrl: "/placeholder.svg",
    rating: 4.4,
    isbn: "978-0-452-28423-4"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    price: 11.99,
    description: "A witty and romantic novel about love, class, and social expectations in 19th-century England.",
    stock: 12,
    imageUrl: "/placeholder.svg",
    rating: 4.3,
    isbn: "978-0-14-143951-8"
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming of Age",
    price: 13.49,
    description: "A controversial novel about teenage rebellion and alienation in post-war America.",
    stock: 0,
    imageUrl: "/placeholder.svg",
    rating: 3.8,
    isbn: "978-0-316-76948-0"
  },
  {
    id: "6",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    price: 15.99,
    description: "The magical beginning of Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry.",
    stock: 25,
    imageUrl: "/placeholder.svg",
    rating: 4.7,
    isbn: "978-0-439-70818-8"
  }
];

const Bookstore = () => {
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>('customer');
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  const genres = ["all", ...Array.from(new Set(mockBooks.map(book => book.genre)))];

  const filteredBooks = mockBooks
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(book => selectedGenre === "all" || book.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const handleAddToCart = (bookId: string) => {
    setCartItems(prev => prev + 1);
    // Here you would typically make an API call to add the book to the cart
  };

  const handleRoleSwitch = (role: 'customer' | 'admin') => {
    setUserRole(role);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} cartItemsCount={cartItems} />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Bookstore interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome to BookHaven
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Discover your next favorite book from our carefully curated collection
              </p>
              <Button size="lg" className="bg-bookstore-gold hover:bg-bookstore-gold/90 text-bookstore-leather">
                Browse Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Role Switcher */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-2 p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">Demo Mode:</span>
          <Button 
            variant={userRole === 'customer' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleRoleSwitch('customer')}
          >
            Customer View
          </Button>
          <Button 
            variant={userRole === 'admin' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleRoleSwitch('admin')}
          >
            Admin View
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Books</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            {userRole === 'admin' && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg shadow-sm">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search books or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  userRole={userRole}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No books found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Orders</h2>
              <div className="p-8 text-center bg-card rounded-lg">
                <p className="text-muted-foreground">No orders yet. Start shopping to see your orders here!</p>
              </div>
            </div>
          </TabsContent>

          {userRole === 'admin' && (
            <TabsContent value="admin">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Admin Panel</h2>
                  <Button className="bg-gradient-warm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Book
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-card rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Total Books</h3>
                    <p className="text-3xl font-bold text-bookstore-warm">{mockBooks.length}</p>
                  </div>
                  <div className="p-6 bg-card rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Low Stock Items</h3>
                    <p className="text-3xl font-bold text-destructive">
                      {mockBooks.filter(book => book.stock < 10).length}
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">Out of Stock</h3>
                    <p className="text-3xl font-bold text-muted-foreground">
                      {mockBooks.filter(book => book.stock === 0).length}
                    </p>
                  </div>
                </div>

                {/* Admin Book Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockBooks.map(book => (
                    <BookCard
                      key={book.id}
                      book={book}
                      userRole="admin"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Bookstore;