import { createContext, JSX, ReactNode, useState } from "react";

// Define the structure for search results
interface SearchResult {
    id: string;
    type: "product" | "category" | "transaction";
    title: string;
    description: string;
    url: string;
}

// Define the context interface
interface SearchContextType {
    query: string;
    results: SearchResult[];
    isLoading: boolean;
    setQuery: (query: string) => void;
    search: () => Promise<void>;
    clearResults: () => void;
}

// Create the context with a default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
}

// Create a provider component that will wrap your application
const SearchProvider = ({ children }: SearchProviderProps): JSX.Element => {
    // State declarations
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handler to perform the search across all data types
    const search = async (): Promise<void> => {
        // Return early if query is empty
        if (!query) {
            setResults([]);
            return;
        }

        // Set loading state
        setIsLoading(true);

        try {
            // Fetch all data in parallel
            const [productsRes, categoriesRes, transactionsRes] = await Promise.all(
                [],
            );

            // Process and filter each data type
            const searchResults: SearchResult[] = [
                // Filter and map products
                ...products
                    .filter((product) =>
                        product.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    .map((product) => ({
                        id: product._id,
                        type: "product" as const,
                        title: product.name,
                        description: `${product.category?.name || "Uncategorized"} - ${product.quantity
                            } in stock`,
                        url: `/products/${product._id}`,
                    })),

                // Filter and map categories
                ...categories
                    .filter((category) =>
                        category.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    .map((category) => ({
                        id: category._id,
                        type: "category" as const,
                        title: category.name,
                        description: `${category.description || "No description"}`,
                        url: `/categories/${category._id}`,
                    })),

                // Filter and map transactions
                ...transactions
                    .filter((transaction) =>
                        transaction.product?.name
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                    )
                    .map((transaction) => ({
                        id: transaction._id,
                        type: "transaction" as const,
                        title: transaction.product?.name || "Unknown Product",
                        description: `${transaction.type} - ${transaction.quantity} units`,
                        url: `/transactions/${transaction._id}`,
                    })),
            ];

            // Update state with search results
            setResults(searchResults);
        } catch (error) {
            // Handle errors
            console.error("Error searching:", error);
            setResults([]);
        } finally {
            // Reset loading state
            setIsLoading(false);
        }
    };

    // Clear search results
    const clearResults = () => {
        setResults([]);
    };

    // Create the context value object
    const contextValue: SearchContextType = {
        query,
        results,
        isLoading,
        setQuery,
        search,
        clearResults,
    };

    // Return the provider with the context value
    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
