import { createContext, useContext, useState, useCallback } from 'react';
import { users, listings as initialListings, communityPosts as initialPosts, notifications as initialNotifications } from '../data/mockData';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [currentUser] = useState(users[0]);
  const [allListings, setAllListings] = useState(initialListings);

  // Communities the user has joined (default: join first 3)
  const [joinedCommunities, setJoinedCommunities] = useState(new Set(['c1', 'c2', 'c3']));

  // Posts
  const [posts, setPosts] = useState(initialPosts);

  // Liked posts
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Registered events
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  // Notifications
  const [notifs, setNotifs] = useState(initialNotifications);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addListing = (listing) => {
    setAllListings(prev => [{
      ...listing,
      id: 'l' + (prev.length + 1),
      ownerId: currentUser.id,
      status: 'available',
      rating: currentUser.rating,
    }, ...prev]);
  };

  const toggleJoinCommunity = useCallback((communityId) => {
    setJoinedCommunities(prev => {
      const next = new Set(prev);
      if (next.has(communityId)) {
        next.delete(communityId);
        showToast('Left community', 'info');
      } else {
        next.add(communityId);
        showToast('Joined community!', 'success');
      }
      return next;
    });
  }, []);

  const toggleLikePost = useCallback((postId) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = likedPosts.has(postId);
        return { ...p, likes: liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  }, [likedPosts]);

  const addPost = useCallback((communityId, text) => {
    const newPost = {
      id: 'p' + Date.now(),
      communityId,
      authorId: currentUser.id,
      text,
      image: null,
      likes: 0,
      commentCount: 0,
      comments: [],
      time: 'Just now',
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('Post published!', 'success');
  }, [currentUser.id]);

  const addComment = useCallback((postId, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentCount: p.commentCount + 1,
          comments: [...p.comments, {
            id: 'cm' + Date.now(),
            authorId: currentUser.id,
            text,
            time: 'Just now',
            likes: 0,
            replies: [],
          }],
        };
      }
      return p;
    }));
  }, [currentUser.id]);

  const registerEvent = useCallback((eventId) => {
    setRegisteredEvents(prev => {
      const next = new Set(prev);
      next.add(eventId);
      return next;
    });
    showToast('Registered for event!', 'success');
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const markAllNotifsRead = useCallback(() => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  return (
    <SessionContext.Provider value={{
      currentUser,
      allListings, addListing,
      joinedCommunities, toggleJoinCommunity,
      posts, addPost,
      likedPosts, toggleLikePost,
      addComment,
      registeredEvents, registerEvent,
      notifs, markAllNotifsRead,
      toasts, showToast,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
