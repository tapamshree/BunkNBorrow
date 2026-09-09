import { createContext, useContext, useState } from 'react';
import { users, listings as initialListings } from '../data/mockData';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [currentUser] = useState(users[0]);
  const [allListings, setAllListings] = useState(initialListings);

  const addListing = (listing) => {
    setAllListings(prev => [{
      ...listing,
      id: 'l' + (prev.length + 1),
      ownerId: currentUser.id,
      status: 'available',
      rating: currentUser.rating,
    }, ...prev]);
  };

  return (
    <SessionContext.Provider value={{ currentUser, allListings, addListing }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
