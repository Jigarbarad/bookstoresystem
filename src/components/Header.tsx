import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  Settings
} from "lucide-react";

interface HeaderProps {
  userRole?: 'customer' | 'admin' | null;
  cartItemsCount?: number;
}

const Header = ({ userRole = null, cartItemsCount = 0 }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-bookstore-warm" />
            <span className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              BookHaven
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            {userRole === 'admin' && (
              <Button variant="ghost" size="sm" className="text-bookstore-warm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            
            {userRole ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                {userRole === 'customer' && (
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-warm">
                  Sign Up
                </Button>
              </div>
            )}

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;